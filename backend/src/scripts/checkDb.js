import { checkDatabaseConnection, closeDatabasePool } from '../config/db.js';

async function main() {
  try {
    const result = await checkDatabaseConnection();
    console.log('PostgreSQL connection successful.');
    console.log(JSON.stringify(result, null, 2));
    await closeDatabasePool();
    process.exit(0);
  } catch (error) {
    console.error('PostgreSQL connection failed.');
    console.error(error.message);
    try {
      await closeDatabasePool();
    } catch {
      // ignore cleanup errors
    }
    process.exit(1);
  }
}

main();
