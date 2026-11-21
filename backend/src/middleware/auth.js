import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) return res.status(401).json({ success: false, message: 'Please sign in to continue.' });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.userId = payload.sub;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Your session has expired. Please sign in again.' });
  }
}

export function signToken(userId) {
  return jwt.sign({}, env.jwtSecret, { subject: userId, expiresIn: env.jwtExpiresIn });
}
