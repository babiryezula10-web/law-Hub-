import path from 'path';
import fs from 'fs';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createApp } from './server/app';
import { CONFIG } from './server/config';

/**
 * LawHub Application Server Entry Point
 * 
 * Separates backend API architecture (modularized under ./server/)
 * from frontend development tooling and production static serving.
 */
async function startServer() {
  const app = createApp();
  const PORT = Number(CONFIG.PORT) || 3000;
  const distHtmlPath = path.join(process.cwd(), 'dist', 'index.html');
  const isProduction = CONFIG.NODE_ENV === 'production' && fs.existsSync(distHtmlPath);

  if (!isProduction) {
    // Development mode: Attach Vite HMR & middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
        } else {
          next();
        }
      } catch (e: any) {
        if (vite && vite.ssrFixStacktrace) {
          vite.ssrFixStacktrace(e);
        }
        next(e);
      }
    });
  } else {
    // Production mode: Serve compiled assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(distHtmlPath);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`  LawHub Uganda — Academic & Legal Research Platform  `);
    console.log(`======================================================`);
    console.log(`  ➜ Local:   http://localhost:${PORT}`);
    console.log(`  ➜ Network: http://127.0.0.1:${PORT}`);
    console.log(`  ➜ Mode:    ${isProduction ? 'Production' : 'Development (Vite HMR)'}`);
    console.log(`======================================================\n`);
  });
}

startServer();
