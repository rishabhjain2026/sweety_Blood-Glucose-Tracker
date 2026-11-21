import app from './app.js';
import env from './config/env.js';
import { checkDatabaseConnection, closeDatabasePool } from './config/db.js';

async function startServer() {
  try {
    const dbStatus = await checkDatabaseConnection();
    console.log(
      `[db] Connected to PostgreSQL database "${dbStatus.database}" at ${dbStatus.serverTime}`,
    );
  } catch (error) {
    console.warn(
      `[db] Could not connect to PostgreSQL yet: ${error.message}`,
    );
    console.warn(
      '[db] Start Docker Desktop, then run: docker compose up -d',
    );
  }

  const server = app.listen(env.port, () => {
    console.log(`[server] Sweety API listening on http://localhost:${env.port}`);
    console.log(`[server] Environment: ${env.nodeEnv}`);
  });

  const shutdown = async (signal) => {
    console.log(`[server] Received ${signal}. Shutting down...`);
    server.close(async () => {
      try {
        await closeDatabasePool();
      } catch (error) {
        console.error('[db] Error while closing pool:', error.message);
      }
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer();
