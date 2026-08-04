import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import { state } from '../data/store.js';
import UserActivity from "../models/UserActivity.js";

const router = express.Router();

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async(req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = state.users.find((item) => item.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {

    console.log("FAILED LOGIN DETECTED");

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const failedAttempts = await UserActivity.countDocuments({
        username: user ? user.name : email,
        activity: "Failed Login",
        timestamp: { $gte: fiveMinutesAgo }
    });

    let riskScore = (failedAttempts + 1) * 30;

    if (riskScore > 100) {
        riskScore = 100;
    }

    await UserActivity.create({
        username: user ? user.name : email,
        activity: "Failed Login",
        ip: req.ip,
        riskScore
    });

    return res.status(401).json({
        message: "Invalid credentials"
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'blue-teamer-secret', { expiresIn: '8h' });
  await UserActivity.create({
    username: user.name,
    activity: "User Login",
    ip: req.ip,
    riskScore: 0
});

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status } });
});

router.post('/forgot-password', [body('email').isEmail()], async(req, res) => {
  const { email } = req.body;
  const user = state.users.find((item) => item.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'Password reset instructions sent to your email.' });
});

router.post('/logout', (req, res) => res.json({ message: 'Logged out successfully' }));

export default router;
