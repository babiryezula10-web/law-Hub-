import express from 'express';
import { authRouter } from './routes/authRoutes';
import { aiRouter } from './routes/aiRoutes';
import { documentRouter } from './routes/documentRoutes';
import { submissionRouter } from './routes/submissionRoutes';
import { adminRouter } from './routes/adminRoutes';

export function createApp(): express.Express {
  const app = express();

  // Standard middleware
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API Status & Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      platform: 'LawHub Uganda',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  });

  // Mount modular route handlers
  app.use('/api/auth', authRouter);
  app.use('/api/ai', aiRouter);
  app.use('/api', documentRouter);
  app.use('/api', submissionRouter);
  app.use('/api', adminRouter);

  return app;
}
