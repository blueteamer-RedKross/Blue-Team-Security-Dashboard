import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { state } from '../data/store.js';

const router = express.Router();

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = state.users.find((item) => item.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'blue-teamer-secret', { expiresIn: '8h' });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } });
});

router.post('/forgot-password', [body('email').isEmail()], (req, res) => {
  const { email } = req.body;
  const user = state.users.find((item) => item.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'Password reset instructions sent to your email.' });
});

router.post('/logout', (req, res) => res.json({ message: 'Logged out successfully' }));

export default router;
