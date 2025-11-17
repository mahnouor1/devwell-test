import { optionalSessionMiddleware } from '../../middleware/session.js';
import { getAuthData } from '../../db/saveAuthData.js';

/**
 * Get current authenticated user route
 * Returns user profile and authentication status
 */
async function authMe(req, res) {
  try {
    // Check if user is authenticated (from session middleware)
    if (!req.user) {
      return res.json({
        authenticated: false,
        provider: null,
        profile: null,
      });
    }

    // Get full auth data from database
    const authData = await getAuthData(
      req.user.provider,
      req.user.user_id,
      req.user.team_id || null
    );

    if (!authData) {
      return res.json({
        authenticated: false,
        provider: null,
        profile: null,
        error: 'Auth data not found in database',
      });
    }

    // Return user info (don't expose tokens)
    const response = {
      authenticated: true,
      provider: req.user.provider,
      profile: {
        user_id: req.user.user_id,
        name: req.user.name || authData.profile?.name || null,
        email: req.user.email || authData.profile?.email || null,
        login: req.user.login || null,
        avatar_url: authData.profile?.avatar_url || authData.profile?.image || null,
        team_id: req.user.team_id || null,
        team_name: authData.profile?.team_name || null,
        scope: authData.scope || null,
        created_at: authData.created_at,
        updated_at: authData.updated_at,
      },
    };

    // Include GitHub data if available
    if (req.user.provider === 'github' && authData.profile?.github_data) {
      response.profile.github_data = {
        repos_count: authData.profile.github_data.repos?.length || 0,
        events_count: authData.profile.github_data.events?.length || 0,
        repos: authData.profile.github_data.repos || [],
        events: authData.profile.github_data.events || [],
        commits: authData.profile.github_data.commits || {},
      };
    }

    return res.json(response);
  } catch (error) {
    console.error('Auth me error:', error.message);
    return res.status(500).json({
      authenticated: false,
      error: 'Failed to fetch user data',
      message: error.message,
    });
  }
}

// Export with middleware
export default function authMeRoute(req, res) {
  optionalSessionMiddleware(req, res, () => {
    authMe(req, res);
  });
}

