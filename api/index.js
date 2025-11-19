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

// Logging middleware for debugging
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth') || req.path.startsWith('/api/chat')) {
    console.log(`[${req.method}] ${req.path}`, {
      query: req.query,
      cookies: Object.keys(req.cookies || {}),
      hasCookieHeader: !!req.headers.cookie,
    });
  }
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

// Export as Vercel serverless function
export default app;

