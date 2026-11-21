import { Router } from 'express';
import { checkDatabaseConnection } from '../config/db.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Sweety API is running',
    service: 'sweety-backend',
    timestamp: new Date().toISOString(),
  });
});

router.get('/db', async (req, res, next) => {
  try {
    const result = await checkDatabaseConnection();

    res.status(200).json({
      success: true,
      message: 'PostgreSQL connection successful',
      data: result,
    });
  } catch (error) {
    error.statusCode = 503;
    error.message = `PostgreSQL connection failed: ${error.message}`;
    next(error);
  }
});

export default router;
