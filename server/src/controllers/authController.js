import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@eace.in').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'EACE@1234';
  const allowReset = String(process.env.ADMIN_FORCE_RESET || '').toLowerCase() === 'true';

  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    if (allowReset && normalizedEmail === adminEmail && password === adminPassword) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      user = await User.create({
        name: 'EACE Admin',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  let validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    if (allowReset && normalizedEmail === adminEmail && password === adminPassword) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      user.passwordHash = passwordHash;
      await user.save();
      validPassword = true;
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET || 'eace-dev-secret',
    { expiresIn: '12h' },
  );

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
