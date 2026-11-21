import dotenv from 'dotenv';
import { randomBytes } from 'node:crypto';

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
  jwtSecret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'production'
    ? required('JWT_SECRET')
    : randomBytes(32).toString('hex')),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  isDev: (process.env.NODE_ENV || 'development') !== 'production',
};

export default env;
