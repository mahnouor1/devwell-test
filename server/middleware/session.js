import { verifyToken } from '../../src/lib/jwt/verify.js';

/**
 * Session middleware to verify JWT and inject user into request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export function sessionMiddleware(req, res, next) {
  // Get token from cookie
  const token = req.cookies?.session_token || req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      authenticated: false,
      error: 'No session token found',
    });
  }

  // Verify token
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      authenticated: false,
      error: 'Invalid or expired session token',
    });
  }

  // Inject user data into request
  req.user = decoded;
  next();
}

/**
 * Optional session middleware - doesn't fail if no token
 * Use this for routes that work with or without authentication
 */
export function optionalSessionMiddleware(req, res, next) {
  const token = req.cookies?.session_token || req.cookies?.token;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
    }
  }

  next();
}

