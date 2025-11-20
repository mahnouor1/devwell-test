import { getGitHubAuthUrl } from '../../../lib/oauth/github.js';
import crypto from 'crypto';

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
    const state = crypto.randomBytes(32).toString('hex');
    
    console.log('[GitHub Login] Generated state:', state.substring(0, 16) + '...');
    console.log('[GitHub Login] Setting oauth_state cookie');
    
    // Store state in cookie for validation in callback
    // CRITICAL: Cookie settings must allow cross-site redirects (GitHub → callback)
    // For OAuth flow: GitHub redirects back, so cookie must survive
    // Cookie settings - MUST match exactly for OAuth redirects to work
    const isVercel = !!process.env.VERCEL;
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60 * 1000, // 10 minutes exactly as specified
      // Domain: only set for localhost, not for Vercel (Vercel handles it automatically)
      ...(isVercel ? {} : { domain: 'localhost', secure: false }),
      // For Vercel (HTTPS), set secure flag
      ...(isVercel ? { secure: true } : {}),
    };
    
    console.log('[GitHub Login] ========================================');
    console.log('[GitHub Login] Generated state:', state);
    console.log('[GitHub Login] State (first 32 chars):', state.substring(0, 32));
    console.log('[GitHub Login] Cookie options:', JSON.stringify(cookieOptions, null, 2));
    
    // Set the cookie
    res.cookie('oauth_state', state, cookieOptions);
    
    // Verify cookie was set in response headers
    const setCookieHeader = res.getHeader('Set-Cookie');
    console.log('[GitHub Login] Set-Cookie header:', setCookieHeader ? 'Present' : 'Missing');
    if (setCookieHeader) {
      console.log('[GitHub Login] Set-Cookie value:', Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader);
    }
    console.log('[GitHub Login] ========================================');

    // Generate GitHub authorization URL
    let authUrl;
    try {
      authUrl = getGitHubAuthUrl(state);
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

