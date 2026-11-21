import pg from 'pg';
import env from './env.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  // Local Docker Postgres uses a standard password login.
  ssl: false,
});

pool.on('error', (error) => {
  console.error('[db] Unexpected idle client error:', error.message);
});

export async function query(text, params) {
  return pool.query(text, params);
}

export async function checkDatabaseConnection() {
  const client = await pool.connect();

  try {
    const result = await client.query(
      'SELECT current_database() AS database, NOW() AS server_time',
    );
    return {
      ok: true,
      database: result.rows[0].database,
      serverTime: result.rows[0].server_time,
    };
  } finally {
    client.release();
  }
}

export async function closeDatabasePool() {
  await pool.end();
}

export default pool;
