import { Router } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../config/prisma.js';
import { authenticate, signToken } from '../middleware/auth.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const publicUser = ({ id, name, email }) => ({ id, name, email });

router.post('/register', async (req, res, next) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (name.length < 2 || name.length > 100) return res.status(400).json({ success: false, message: 'Please enter a name between 2 and 100 characters.' });
    if (!emailPattern.test(email) || email.length > 254) return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    if (password.length < 8 || password.length > 72) return res.status(400).json({ success: false, message: 'Password must be between 8 and 72 characters.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { name, email, passwordHash } });
    return res.status(201).json({ success: true, data: { user: publicUser(user), token: signToken(user.id) } });
  } catch (error) {
    if (error.code === 'P2002') return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ success: false, message: 'Email or password is incorrect.' });
    return res.json({ success: true, data: { user: publicUser(user), token: signToken(user.id) } });
  } catch (error) { return next(error); }
});

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true, name: true, email: true } });
    if (!user) return res.status(401).json({ success: false, message: 'Account not found.' });
    return res.json({ success: true, data: { user } });
  } catch (error) { return next(error); }
});

export default router;
