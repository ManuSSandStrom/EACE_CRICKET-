import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import { ensureAdminUser } from './services/userService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  await ensureAdminUser();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
