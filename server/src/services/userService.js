import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const ensureAdminUser = async () => {
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@eace.in').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'EACE@12345';

  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: 'EACE Admin',
    email: adminEmail,
    passwordHash,
    role: 'admin',
  });

  console.log(`Default admin user created: ${adminEmail}`);
};
