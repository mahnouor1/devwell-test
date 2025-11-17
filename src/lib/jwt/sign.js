import jwt from 'jsonwebtoken';

/**
 * Sign a JWT token with user data
 * @param {Object} payload - User data to encode
 * @returns {string} JWT token
 */
export function signToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: '7d', // Token expires in 7 days
  });
}

