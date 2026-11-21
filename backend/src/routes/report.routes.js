import { Router } from 'express';
import prisma from '../config/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
const day = (date) => date.toISOString().slice(0, 10);
const parseDate = (v) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v || '')) return false;
  const parsed = new Date(`${v}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === v;
};
const labels = { morning: 'Morning (fasting)', after_breakfast: 'After breakfast', after_lunch: 'After lunch', after_dinner: 'After dinner' };

router.get('/summary', async (req, res, next) => {
  try {
    const readings = await prisma.reading.findMany({ where: { userId: req.userId }, select: { value: true } });
    const values = readings.map((r) => r.value);
    return res.json({ success: true, data: { total: values.length, highest: values.length ? Math.max(...values) : null, lowest: values.length ? Math.min(...values) : null, average: values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length * 10) / 10 : null } });
  } catch (error) { return next(error); }
});

router.get('/', async (req, res, next) => {
  try {
    const date = req.query.date || day(new Date());
    if (!parseDate(date)) return res.status(400).json({ success: false, message: 'Please enter a valid date.' });
    const selected = new Date(`${date}T00:00:00Z`);
    const start = new Date(Date.UTC(selected.getUTCFullYear(), selected.getUTCMonth(), 1));
    const prevStart = new Date(Date.UTC(selected.getUTCFullYear(), selected.getUTCMonth() - 1, 1));
    const prevEnd = start;
    const [daily, monthToDate, previousMonth] = await Promise.all([
      prisma.reading.findMany({ where: { userId: req.userId, date: selected }, orderBy: { slot: 'asc' } }),
      prisma.reading.findMany({ where: { userId: req.userId, date: { gte: start, lte: selected } }, orderBy: [{ date: 'asc' }, { slot: 'asc' }] }),
      prisma.reading.findMany({ where: { userId: req.userId, date: { gte: prevStart, lt: prevEnd } }, orderBy: [{ date: 'asc' }, { slot: 'asc' }] }),
    ]);
    const serialize = (rows) => rows.map((r) => ({ ...r, date: day(r.date), slotLabel: labels[r.slot] }));
    return res.json({ success: true, data: { selectedDate: date, daily: serialize(daily), monthToDate: serialize(monthToDate), previousMonth: serialize(previousMonth), previousMonthLabel: prevStart.toLocaleString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }) } });
  } catch (error) { return next(error); }
});
export default router;
