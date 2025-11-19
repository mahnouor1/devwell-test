/**
 * Slack OAuth helper functions
 */

/**
 * Generate Slack OAuth authorization URL
 * @param {string} state - CSRF state parameter
 * @returns {string} Authorization URL
 */
export function getSlackAuthUrl(state) {
  const clientId = process.env.SLACK_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.SLACK_REDIRECT_URL);
  const scope = encodeURIComponent('channels:read,chat:write,users:read');
  
  if (!clientId) {
    throw new Error('SLACK_CLIENT_ID is not set in environment variables');
  }

  return `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
}

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code from callback
 * @returns {Promise<Object>} Token response with bot_token, access_token, etc.
 */
export async function exchangeSlackCode(code) {
  const clientId = process.env.SLACK_CLIENT_ID;
  const clientSecret = process.env.SLACK_CLIENT_SECRET;
  const redirectUri = process.env.SLACK_REDIRECT_URL;

  if (!clientId || !clientSecret) {
    throw new Error('Slack OAuth credentials are not set');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri,
  });

  const response = await fetch('https://slack.com/api/oauth.v2.access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`Slack token exchange failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Slack OAuth error: ${data.error || 'Unknown error'}`);
  }

  return data;
}

/**
 * Get Slack user info
 * @param {string} accessToken - Slack user access token
 * @returns {Promise<Object>} User info
 */
export async function getSlackUser(accessToken) {
  const response = await fetch('https://slack.com/api/users.identity', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Slack user: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error || 'Unknown error'}`);
  }

  return data;
}

/**
 * Refresh Slack access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New token response
 */
export async function refreshSlackToken(refreshToken) {
  const clientId = process.env.SLACK_CLIENT_ID;
  const clientSecret = process.env.SLACK_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Slack OAuth credentials are not set');
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const response = await fetch('https://slack.com/api/oauth.v2.access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error(`Slack token refresh failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (!data.ok) {
    throw new Error(`Slack refresh error: ${data.error || 'Unknown error'}`);
  }

  return data;
}



