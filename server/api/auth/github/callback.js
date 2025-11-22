import { 
  exchangeGitHubCode, 
  getGitHubUser, 
  getGitHubUserEmails,
  getGitHubRepos,
  getGitHubEvents,
  getRepoCommits
} from '../../../lib/oauth/github.js';
import { signToken } from '../../../../src/lib/jwt/sign.js';
import { saveAuthData } from '../../../db/saveAuthData.js';

/**
 * GitHub OAuth callback route
 * Handles the OAuth callback, exchanges code for token, and creates session
 */
export default async function githubCallback(req, res) {
  try {
    // Get frontend URL early (used in redirects and logging)
    // For Vercel, use the deployment URL
    const getFrontendUrl = () => {
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      return process.env.FRONTEND_URL || 'http://localhost:5173';
    };
    const frontendUrl = getFrontendUrl();
    const isVercel = !!process.env.VERCEL;
    
    const { code, state } = req.query;
    const storedState = req.cookies?.oauth_state;

    // Verify callback URL matches expected
    const expectedCallbackUrl = 'http://localhost:5173/api/auth/github/callback';
    const configuredRedirectUrl = process.env.GITHUB_REDIRECT_URL || process.env.GITHUB_REDIRECT_URI;
    
    console.log('[GitHub Callback] ========================================');
    console.log('[GitHub Callback] Callback route: /api/auth/github/callback');
    console.log('[GitHub Callback] Expected redirect URL:', expectedCallbackUrl);
    console.log('[GitHub Callback] Configured redirect URL:', configuredRedirectUrl);
    console.log('[GitHub Callback] Full request URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('[GitHub Callback] Query parameters:', { code: code ? 'present' : 'missing', state: state ? 'present' : 'missing' });
    console.log('[GitHub Callback] Received state from query:', state || 'MISSING');
    console.log('[GitHub Callback] Received state (first 32 chars):', state ? state.substring(0, 32) : 'MISSING');
    console.log('[GitHub Callback] Stored state from cookie:', storedState || 'MISSING');
    console.log('[GitHub Callback] Stored state (first 32 chars):', storedState ? storedState.substring(0, 32) : 'MISSING');
    console.log('[GitHub Callback] All cookies:', req.cookies || {});
    console.log('[GitHub Callback] Cookie keys:', Object.keys(req.cookies || {}));
    console.log('[GitHub Callback] Cookie header present:', !!req.headers.cookie);
    console.log('[GitHub Callback] Cookie header value:', req.headers.cookie ? req.headers.cookie.substring(0, 100) + '...' : 'MISSING');
    console.log('[GitHub Callback] Referer:', req.headers.referer);
    console.log('[GitHub Callback] Origin:', req.headers.origin);
    console.log('[GitHub Callback] ========================================');

    // Validate state parameter (CSRF protection)
    if (!state) {
      console.error('[GitHub Callback] State missing from query parameters');
      return res.status(400).json({
        error: 'Invalid state parameter',
        message: 'CSRF validation failed: state parameter missing',
      });
    }

    if (!storedState) {
      console.error('[GitHub Callback] State cookie not found');
      return res.status(400).json({
        error: 'Invalid state parameter',
        message: 'CSRF validation failed: state cookie not found',
      });
    }

    if (state !== storedState) {
      console.error('[GitHub Callback] State mismatch!');
      console.error('[GitHub Callback] Query state:', state);
      console.error('[GitHub Callback] Cookie state:', storedState);
      return res.status(400).json({
        error: 'Invalid state parameter',
        message: 'CSRF validation failed: state mismatch',
      });
    }

    console.log('[GitHub Callback] State validation successful ✓');

    // Clear state cookie (must match the same options used when setting it)
    const clearCookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      ...(isVercel ? { secure: true } : { domain: 'localhost', secure: false }),
    };
    res.clearCookie('oauth_state', clearCookieOptions);
    
    console.log('[GitHub Callback] State cookie cleared after successful validation');

    if (!code) {
      return res.status(400).json({
        error: 'Missing authorization code',
        message: 'GitHub did not provide an authorization code',
      });
    }

    // Exchange code for access token
    const tokenData = await exchangeGitHubCode(code);

    if (!tokenData.access_token) {
      throw new Error('No access token received from GitHub');
    }

    console.log('[GitHub Callback] Exchanging code for token...');
    
    // Fetch user profile (only with read:user scope)
    console.log('[GitHub Callback] Fetching user profile...');
    const userProfile = await getGitHubUser(tokenData.access_token);
    console.log('[GitHub Callback] User profile fetched:', userProfile.login);

    // Fetch user emails (with user:email scope)
    console.log('[GitHub Callback] Fetching user emails...');
    let userEmails = [];
    try {
      userEmails = await getGitHubUserEmails(tokenData.access_token);
      console.log('[GitHub Callback] User emails fetched:', userEmails.length);
    } catch (error) {
      console.warn('[GitHub Callback] Failed to fetch emails:', error.message);
    }

    // Get primary email
    const primaryEmail = userProfile.email || (userEmails.find(e => e.primary)?.email) || (userEmails[0]?.email);

    // Fetch repositories (with repo scope)
    console.log('[GitHub Callback] Fetching repositories...');
    let repos = [];
    try {
      repos = await getGitHubRepos(tokenData.access_token);
      console.log('[GitHub Callback] Repositories fetched:', repos.length);
    } catch (error) {
      console.warn('[GitHub Callback] Failed to fetch repos:', error.message);
    }

    // Fetch recent events
    console.log('[GitHub Callback] Fetching user events...');
    let events = [];
    try {
      events = await getGitHubEvents(userProfile.login, tokenData.access_token);
      console.log('[GitHub Callback] Events fetched:', events.length);
    } catch (error) {
      console.warn('[GitHub Callback] Failed to fetch events:', error.message);
    }

    // Fetch recent commits from top repos (limit to 5 most active repos)
    console.log('[GitHub Callback] Fetching commits from top repos...');
    const topRepos = repos.slice(0, 5);
    const commitsData = {};
    
    for (const repo of topRepos) {
      try {
        const commits = await getRepoCommits(
          repo.owner.login,
          repo.name,
          userProfile.login,
          tokenData.access_token,
          10 // Get last 10 commits per repo
        );
        commitsData[repo.full_name] = commits;
        console.log(`[GitHub Callback] Commits fetched for ${repo.full_name}:`, commits.length);
      } catch (error) {
        console.warn(`[GitHub Callback] Failed to fetch commits for ${repo.full_name}:`, error.message);
        commitsData[repo.full_name] = [];
      }
    }

    // Save auth data to database (BEFORE redirect) with all GitHub data
    console.log('[GitHub Callback] Saving auth data to database...');
    const authRecord = await saveAuthData({
      provider: 'github',
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token || null,
      user_id: userProfile.id.toString(),
      scope: tokenData.scope || null,
      expires_in: null, // GitHub tokens don't expire by default
      profile: {
        login: userProfile.login,
        name: userProfile.name || userProfile.login,
        email: primaryEmail,
        avatar_url: userProfile.avatar_url,
        bio: userProfile.bio,
        company: userProfile.company,
        location: userProfile.location,
        // Store all GitHub data
        github_data: {
          repos: repos.map(r => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            private: r.private,
            description: r.description,
            language: r.language,
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            updated_at: r.updated_at,
            pushed_at: r.pushed_at,
          })),
          events: events.slice(0, 50).map(e => ({
            id: e.id,
            type: e.type,
            repo: e.repo?.name,
            created_at: e.created_at,
            payload: e.payload ? {
              action: e.payload.action,
              ref: e.payload.ref,
              commits: e.payload.commits?.length || 0,
            } : null,
          })),
          commits: commitsData,
          emails: userEmails,
        },
      },
    });

    console.log('[GitHub Callback] Auth data saved to database ✓');

    // Create JWT session token
    const sessionToken = signToken({
      provider: 'github',
      user_id: userProfile.id.toString(),
      login: userProfile.login,
      email: userProfile.email,
      name: userProfile.name,
    });

    // Set session cookie (must match cookie settings)
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // Domain: only set for localhost, not for Vercel (Vercel handles it automatically)
      ...(isVercel ? {} : { domain: 'localhost', secure: false }),
      // For Vercel (HTTPS), set secure flag
      ...(isVercel ? { secure: true } : {}),
    };
    res.cookie('session_token', sessionToken, cookieOptions);
    
    // Verify cookie was set
    const setCookieHeader = res.getHeader('Set-Cookie');
    console.log('[GitHub Callback] ========================================');
    console.log('[GitHub Callback] Session token created and cookie set ✓');
    console.log('[GitHub Callback] Cookie options:', JSON.stringify(cookieOptions, null, 2));
    console.log('[GitHub Callback] Set-Cookie header:', setCookieHeader ? 'Present' : 'Missing');
    if (setCookieHeader) {
      console.log('[GitHub Callback] Set-Cookie value:', Array.isArray(setCookieHeader) ? setCookieHeader[0] : setCookieHeader);
    }
    console.log('[GitHub Callback] All data saved, redirecting to dashboard...');
    console.log('[GitHub Callback] Redirect URL:', `${frontendUrl}/dashboard?auth=success`);
    console.log('[GitHub Callback] ========================================');

    // Redirect to dashboard/frontend ONLY AFTER all data is saved
    res.redirect(`${frontendUrl}/dashboard?auth=success`);
  } catch (error) {
    console.error('[GitHub Callback] Error:', error.message);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message)}`);
  }
}

