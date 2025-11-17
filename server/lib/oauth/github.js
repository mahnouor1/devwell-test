/**
 * GitHub OAuth helper functions
 */

/**
 * Generate GitHub OAuth authorization URL
 * @param {string} state - CSRF state parameter
 * @returns {string} Authorization URL
 */
export function getGitHubAuthUrl(state) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  // Use GITHUB_REDIRECT_URL or GITHUB_REDIRECT_URI (both supported)
  const redirectUrl = process.env.GITHUB_REDIRECT_URL || process.env.GITHUB_REDIRECT_URI;
  const redirectUri = encodeURIComponent(redirectUrl);
  // GitHub OAuth scopes
  const scopes = [
    "repo",
    "read:user",
    "user:email"
  ];
  const scope = encodeURIComponent(scopes.join(','));
  
  if (!clientId) {
    throw new Error('GITHUB_CLIENT_ID is not set in environment variables');
  }

  if (!redirectUrl) {
    throw new Error('GITHUB_REDIRECT_URL is not set in environment variables');
  }

  // Validate redirect URL format
  const expectedUrl = 'http://localhost:5173/api/auth/github/callback';
  if (redirectUrl !== expectedUrl) {
    console.warn(`[GitHub OAuth] Warning: Redirect URL is "${redirectUrl}", expected "${expectedUrl}"`);
  }

  console.log('[GitHub OAuth] Using redirect URI:', redirectUrl);
  
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
}

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code from callback
 * @returns {Promise<Object>} Token response with access_token
 */
export async function exchangeGitHubCode(code) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  // Use GITHUB_REDIRECT_URL or GITHUB_REDIRECT_URI (both supported)
  const redirectUri = process.env.GITHUB_REDIRECT_URL || process.env.GITHUB_REDIRECT_URI;

  if (!clientId || !clientSecret) {
    throw new Error('GitHub OAuth credentials are not set');
  }

  if (!redirectUri) {
    throw new Error('GITHUB_REDIRECT_URL is not set in environment variables');
  }

  console.log('[GitHub OAuth] Token exchange using redirect URI:', redirectUri);

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub token exchange failed: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.error) {
    throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
  }

  return data;
}

/**
 * Fetch GitHub user profile
 * @param {string} accessToken - GitHub access token
 * @returns {Promise<Object>} User profile
 */
export async function getGitHubUser(accessToken) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch user emails from GitHub
 * @param {string} accessToken - GitHub access token
 * @returns {Promise<Array>} Array of email objects
 */
export async function getGitHubUserEmails(accessToken) {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user emails: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch user repositories
 * @param {string} accessToken - GitHub access token
 * @param {number} perPage - Number of repos per page (max 100)
 * @returns {Promise<Array>} Array of repository objects
 */
export async function getGitHubRepos(accessToken, perPage = 100) {
  const repos = [];
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 10) { // Limit to 10 pages (1000 repos max)
    const response = await fetch(`https://api.github.com/user/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos: ${response.statusText}`);
    }

    const pageRepos = await response.json();
    repos.push(...pageRepos);

    // Check if there are more pages
    const linkHeader = response.headers.get('link');
    hasMore = linkHeader && linkHeader.includes('rel="next"');
    page++;
  }

  return repos;
}

/**
 * Fetch user events
 * @param {string} username - GitHub username
 * @param {string} accessToken - GitHub access token
 * @param {number} perPage - Number of events per page
 * @returns {Promise<Array>} Array of event objects
 */
export async function getGitHubEvents(username, accessToken, perPage = 30) {
  const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=${perPage}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub events: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Fetch recent commits for a repository
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} username - GitHub username (for filtering)
 * @param {string} accessToken - GitHub access token
 * @param {number} perPage - Number of commits per page
 * @returns {Promise<Array>} Array of commit objects
 */
export async function getRepoCommits(owner, repo, username, accessToken, perPage = 30) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?author=${username}&per_page=${perPage}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    // Some repos might be private or not accessible
    if (response.status === 404 || response.status === 403) {
      return [];
    }
    throw new Error(`Failed to fetch commits for ${owner}/${repo}: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Refresh GitHub access token (if refresh_token is available)
 * Note: GitHub doesn't provide refresh tokens by default, but this is here for future use
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New token response
 */
export async function refreshGitHubToken(refreshToken) {
  // GitHub OAuth doesn't provide refresh tokens by default
  // This would need to be implemented if using GitHub Apps
  throw new Error('GitHub refresh token not implemented');
}

