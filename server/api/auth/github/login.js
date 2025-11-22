import { getGitHubAuthUrl } from '../../../lib/oauth/github.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

/**
 * GitHub OAuth login route
 * Generates state parameter and redirects to GitHub authorization
 */
export default async function githubLogin(req, res) {
  try {
    console.log('[GitHub Login] ========================================');
    console.log('[GitHub Login] Request received:', {
      method: req.method,
      path: req.path,
      url: req.url,
      origin: req.headers.origin,
      referer: req.headers.referer,
    });
    
    // Check environment variables first
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUrl = process.env.GITHUB_REDIRECT_URL || process.env.GITHUB_REDIRECT_URI;
    
    console.log('[GitHub Login] Environment check:', {
      hasClientId: !!clientId,
      hasRedirectUrl: !!redirectUrl,
      redirectUrl: redirectUrl,
      vercel: !!process.env.VERCEL,
    });
    
    if (!clientId) {
      console.error('[GitHub Login] GITHUB_CLIENT_ID is missing!');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'GITHUB_CLIENT_ID is not set in environment variables',
        details: 'Please set GITHUB_CLIENT_ID in Vercel environment variables',
      });
    }
    
    if (!redirectUrl) {
      console.error('[GitHub Login] GITHUB_REDIRECT_URL is missing!');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'GITHUB_REDIRECT_URL is not set in environment variables',
        details: 'Please set GITHUB_REDIRECT_URL in Vercel environment variables',
      });
    }
    
    // Generate CSRF state token
    const randomState = crypto.randomBytes(32).toString('hex');
    
    // Sign the state with JWT_SECRET so we can verify it without cookies
    // This solves the cookie persistence issue with OAuth redirects
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set in environment variables');
    }
    
    const signedState = jwt.sign(
      { state: randomState, timestamp: Date.now() },
      jwtSecret,
      { expiresIn: '10m' } // State expires in 10 minutes
    );
    
    console.log('[GitHub Login] Generated random state:', randomState.substring(0, 16) + '...');
    console.log('[GitHub Login] Signed state (JWT):', signedState.substring(0, 50) + '...');
    console.log('[GitHub Login] Using signed state approach (no cookie needed)');

    // Generate GitHub authorization URL with signed state
    let authUrl;
    try {
      // Use the signed state in the OAuth URL
      authUrl = getGitHubAuthUrl(signedState);
      console.log('[GitHub Login] Generated GitHub OAuth URL:', authUrl.substring(0, 100) + '...');
    } catch (urlError) {
      console.error('[GitHub Login] Error generating auth URL:', urlError);
      return res.status(500).json({
        error: 'Failed to generate OAuth URL',
        message: urlError.message,
      });
    }

    console.log('[GitHub Login] Redirecting to GitHub OAuth...');
    console.log('[GitHub Login] ========================================');

    // Redirect to GitHub
    res.redirect(302, authUrl);
  } catch (error) {
    console.error('[GitHub Login] ========================================');
    console.error('[GitHub Login] Unexpected error:', error);
    console.error('[GitHub Login] Error stack:', error.stack);
    console.error('[GitHub Login] ========================================');
    
    // Only send JSON if headers haven't been sent
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Failed to initiate GitHub OAuth',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      });
    }
  }
}

