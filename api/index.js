// Vercel serverless function wrapper for Express app
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Get the Vercel deployment URL dynamically
const getFrontendUrl = () => {
  // In Vercel, use the deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback to environment variable or localhost
  return process.env.FRONTEND_URL || 'http://localhost:5173';
};

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from Vercel deployment or configured frontend URL
    const allowedOrigins = [
      getFrontendUrl(),
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'https://localhost:5173',
    ].filter(Boolean);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      // For Vercel preview deployments, allow any vercel.app domain
      if (origin.includes('.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use(express.json());
app.use(cookieParser());

// Logging middleware for debugging - log ALL requests
app.use((req, res, next) => {
  console.log(`[Vercel API] ${req.method} ${req.path}`, {
    url: req.url,
    originalUrl: req.originalUrl,
    query: req.query,
    cookies: Object.keys(req.cookies || {}),
    hasCookieHeader: !!req.headers.cookie,
    origin: req.headers.origin,
    referer: req.headers.referer,
  });
  next();
});

// Import routes
import githubLoginRoute from '../server/api/auth/github/login.js';
import githubCallbackRoute from '../server/api/auth/github/callback.js';
import slackLoginRoute from '../server/api/auth/slack/login.js';
import slackCallbackRoute from '../server/api/auth/slack/callback.js';
import authMeRoute from '../server/api/auth/me.js';
import githubInsightsRoute from '../server/api/github/insights.js';
import chatRoute from '../server/api/chat.js';

// Auth routes - GitHub
app.get('/api/auth/github/login', githubLoginRoute);
app.get('/api/auth/github/callback', githubCallbackRoute);

// Auth routes - Slack
app.get('/api/auth/slack/login', slackLoginRoute);
app.get('/api/auth/slack/callback', slackCallbackRoute);

// User info
app.get('/api/auth/me', authMeRoute);

// GitHub insights
app.get('/api/github/insights', githubInsightsRoute);

// Chat endpoint
app.post('/api/chat', chatRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running', vercel: !!process.env.VERCEL });
});

// Debug route to check cookies
app.get('/api/debug/cookies', (req, res) => {
  res.json({
    hasOAuthState: !!req.cookies?.oauth_state,
    allCookies: req.cookies || {},
    cookieHeader: req.headers.cookie || null,
    timestamp: new Date().toISOString(),
    vercel: !!process.env.VERCEL,
    vercelUrl: process.env.VERCEL_URL,
  });
});

// Test route to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API is working',
    timestamp: new Date().toISOString(),
    vercel: !!process.env.VERCEL,
  });
});

// Debug route to check environment variables (without exposing secrets)
app.get('/api/debug/env', (req, res) => {
  res.json({
    hasGithubClientId: !!process.env.GITHUB_CLIENT_ID,
    hasGithubClientSecret: !!process.env.GITHUB_CLIENT_SECRET,
    hasGithubRedirectUrl: !!process.env.GITHUB_REDIRECT_URL,
    githubRedirectUrl: process.env.GITHUB_REDIRECT_URL || 'NOT SET',
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasFrontendUrl: !!process.env.FRONTEND_URL,
    frontendUrl: process.env.FRONTEND_URL || 'NOT SET',
    hasKv: !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
    vercel: !!process.env.VERCEL,
    vercelUrl: process.env.VERCEL_URL || 'NOT SET',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Vercel API Error]', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    path: req.path,
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  console.warn(`[Vercel API] 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// Export as Vercel serverless function
// For Vercel, we can export the Express app directly
// Vercel will automatically wrap it
export default app;

