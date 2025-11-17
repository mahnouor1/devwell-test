import { getSlackAuthUrl } from '../../../lib/oauth/slack.js';
import crypto from 'crypto';

/**
 * Slack OAuth login route
 * Generates state parameter and redirects to Slack authorization
 */
export default async function slackLogin(req, res) {
  try {
    // Generate CSRF state token
    const state = crypto.randomBytes(32).toString('hex');
    
    console.log('[Slack Login] Generated state:', state.substring(0, 16) + '...');
    console.log('[Slack Login] Setting oauth_state cookie');
    
    // Store state in cookie for validation in callback
    // Important: path must be '/' to ensure cookie is sent with all requests
    res.cookie('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false for localhost
      sameSite: 'lax', // Allows cookie to be sent on cross-site redirects
      path: '/', // Important: cookie available for all paths
      maxAge: 600000, // 10 minutes
      domain: process.env.NODE_ENV === 'production' ? undefined : undefined, // undefined = current domain
    });

    // Generate Slack authorization URL
    const authUrl = getSlackAuthUrl(state);
    
    console.log('[Slack Login] Redirecting to:', authUrl.substring(0, 80) + '...');

    // Redirect to Slack
    res.redirect(authUrl);
  } catch (error) {
    console.error('[Slack Login] Error:', error.message);
    res.status(500).json({
      error: 'Failed to initiate Slack OAuth',
      message: error.message,
    });
  }
}

