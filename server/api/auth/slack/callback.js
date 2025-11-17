import { exchangeSlackCode, getSlackUser } from '../../../lib/oauth/slack.js';
import { signToken } from '../../../../src/lib/jwt/sign.js';
import { saveAuthData } from '../../../db/saveAuthData.js';

/**
 * Slack OAuth callback route
 * Handles the OAuth callback, exchanges code for token, and creates session
 */
export default async function slackCallback(req, res) {
  try {
    const { code, state } = req.query;
    const storedState = req.cookies?.oauth_state;

    // Debug logging
    console.log('[Slack Callback] Received state from query:', state ? state.substring(0, 16) + '...' : 'MISSING');
    console.log('[Slack Callback] Stored state from cookie:', storedState ? storedState.substring(0, 16) + '...' : 'MISSING');
    console.log('[Slack Callback] All cookies:', Object.keys(req.cookies || {}));
    console.log('[Slack Callback] Request headers:', {
      cookie: req.headers.cookie ? 'present' : 'missing',
      referer: req.headers.referer,
    });

    // Validate state parameter (CSRF protection)
    if (!state) {
      console.error('[Slack Callback] State missing from query parameters');
      return res.status(400).json({
        error: 'Invalid state parameter',
        message: 'CSRF validation failed: state parameter missing',
      });
    }

    if (!storedState) {
      console.error('[Slack Callback] State cookie not found');
      return res.status(400).json({
        error: 'Invalid state parameter',
        message: 'CSRF validation failed: state cookie not found',
      });
    }

    if (state !== storedState) {
      console.error('[Slack Callback] State mismatch!');
      console.error('[Slack Callback] Query state:', state);
      console.error('[Slack Callback] Cookie state:', storedState);
      return res.status(400).json({
        error: 'Invalid state parameter',
        message: 'CSRF validation failed: state mismatch',
      });
    }

    console.log('[Slack Callback] State validation successful ✓');

    // Clear state cookie (must match the same options used when setting it)
    res.clearCookie('oauth_state', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    if (!code) {
      return res.status(400).json({
        error: 'Missing authorization code',
        message: 'Slack did not provide an authorization code',
      });
    }

    // Exchange code for access token
    const tokenData = await exchangeSlackCode(code);

    if (!tokenData.access_token && !tokenData.authed_user?.access_token) {
      throw new Error('No access token received from Slack');
    }

    // Get user info (use user token if available, otherwise bot token)
    const userToken = tokenData.authed_user?.access_token || tokenData.access_token;
    let userProfile = null;

    try {
      const userData = await getSlackUser(userToken);
      userProfile = userData.user || userData;
    } catch (error) {
      console.warn('Could not fetch Slack user profile:', error.message);
    }

    // Extract team info
    const teamInfo = tokenData.team || {};
    const userId = tokenData.authed_user?.id || userProfile?.id || 'unknown';
    const teamId = teamInfo.id || null;

    // Save auth data to database
    const authRecord = await saveAuthData({
      provider: 'slack',
      access_token: tokenData.authed_user?.access_token || tokenData.access_token,
      refresh_token: tokenData.authed_user?.refresh_token || tokenData.refresh_token || null,
      user_id: userId,
      team_id: teamId,
      scope: tokenData.scope || null,
      expires_in: tokenData.expires_in || null,
      profile: {
        name: userProfile?.name || null,
        email: userProfile?.email || null,
        image: userProfile?.image_512 || userProfile?.image_192 || null,
        team_name: teamInfo.name || null,
        team_id: teamId,
        bot_token: tokenData.access_token || null, // Bot token if available
      },
    });

    // Create JWT session token
    const sessionToken = signToken({
      provider: 'slack',
      user_id: userId,
      team_id: teamId,
      name: userProfile?.name || null,
      email: userProfile?.email || null,
      team_name: teamInfo.name || null,
    });

    // Set session cookie
    res.cookie('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Redirect to dashboard/frontend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/dashboard?auth=success`);
  } catch (error) {
    console.error('Slack callback error:', error.message);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/login?error=${encodeURIComponent(error.message)}`);
  }
}

