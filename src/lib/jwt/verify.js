import jwt from 'jsonwebtoken';

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded payload or null if invalid
 */
export function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

