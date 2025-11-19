import { getGitHubAuthUrl } from '../../../lib/oauth/github.js';
import crypto from 'crypto';

/**
 * GitHub OAuth login route
 * Generates state parameter and redirects to GitHub authorization
 */
export default async function githubLogin(req, res) {
  try {
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

    // Verify redirect URL is set
    const redirectUrl = process.env.GITHUB_REDIRECT_URL || process.env.GITHUB_REDIRECT_URI;
    if (!redirectUrl) {
      throw new Error('GITHUB_REDIRECT_URL is not set in environment variables');
    }
    
    console.log('[GitHub Login] Redirect URL configured:', redirectUrl);
    console.log('[GitHub Login] Expected: http://localhost:5173/api/auth/github/callback');
    
    // Generate GitHub authorization URL
    const authUrl = getGitHubAuthUrl(state);
    
    console.log('[GitHub Login] Redirecting to GitHub OAuth:', authUrl.substring(0, 80) + '...');

    // Redirect to GitHub
    res.redirect(authUrl);
  } catch (error) {
    console.error('[GitHub Login] Error:', error.message);
    res.status(500).json({
      error: 'Failed to initiate GitHub OAuth',
      message: error.message,
    });
  }
}

