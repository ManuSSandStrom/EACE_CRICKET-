import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import publicRoutes from './routes/publicRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import assistantRoutes from './routes/assistantRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultOrigins = [
  'https://eacefrontend.netlify.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

const envOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const allowedOrigins = new Set([...defaultOrigins, ...envOrigins]);

export const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // Allow registered exact domains
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      // Allow any Netlify preview/branch domains and local dev URLs
      if (
        origin.endsWith('.netlify.app') ||
        (process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin))
      ) {
        return callback(null, true);
      }

      return callback(new Error('CORS origin not allowed'));
    },
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  '/api',
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
  }),
);

app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'), {
    maxAge: '30d',
    immutable: true,
  }),
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assistant', assistantRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
