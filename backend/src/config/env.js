import dotenv from 'dotenv';

dotenv.config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  databaseUrl: required(
    'DATABASE_URL',
    'postgresql://sweety:sweety_dev_password@localhost:5432/sweety_db?schema=public',
  ),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
};

export default env;
