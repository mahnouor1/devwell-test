import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000; // API server port (Vite proxies /api to this)

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true, // Important: allows cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express.json());
app.use(cookieParser());

// Logging middleware for debugging
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) {
    console.log(`[${req.method}] ${req.path}`, {
      query: req.query,
      cookies: Object.keys(req.cookies || {}),
      hasCookieHeader: !!req.headers.cookie,
    });
  }
  next();
});

// Import routes
import githubLoginRoute from './api/auth/github/login.js';
import githubCallbackRoute from './api/auth/github/callback.js';
import slackLoginRoute from './api/auth/slack/login.js';
import slackCallbackRoute from './api/auth/slack/callback.js';
import authMeRoute from './api/auth/me.js';
import githubInsightsRoute from './api/github/insights.js';

// Auth routes - GitHub
app.get('/api/auth/github/login', githubLoginRoute);
app.get('/api/auth/github/callback', githubCallbackRoute); // Must match GITHUB_REDIRECT_URL exactly

// Auth routes - Slack
app.get('/api/auth/slack/login', slackLoginRoute);
app.get('/api/auth/slack/callback', slackCallbackRoute);

// User info
app.get('/api/auth/me', authMeRoute);

// GitHub insights
app.get('/api/github/insights', githubInsightsRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Debug route to check cookies
app.get('/api/debug/cookies', (req, res) => {
  console.log('[Debug] ========================================');
  console.log('[Debug] Cookie check request');
  console.log('[Debug] Request URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
  console.log('[Debug] All cookies:', req.cookies);
  console.log('[Debug] Cookie header:', req.headers.cookie);
  console.log('[Debug] Request headers:', {
    cookie: req.headers.cookie ? 'present' : 'missing',
    referer: req.headers.referer,
    origin: req.headers.origin,
    host: req.headers.host,
  });
  console.log('[Debug] ========================================');
  
  res.json({
    hasOAuthState: !!req.cookies?.oauth_state,
    allCookies: req.cookies || {},
    cookieHeader: req.headers.cookie || null,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
  console.log(`📝 GitHub login: http://localhost:${PORT}/api/auth/github/login`);
  console.log(`📝 Slack login: http://localhost:${PORT}/api/auth/slack/login`);
});

