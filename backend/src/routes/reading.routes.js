import { Router } from 'express';
import prisma from '../config/prisma.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
const slots = new Set(['morning', 'after_breakfast', 'after_lunch', 'after_dinner']);
const slotLabels = { morning: 'Morning (fasting)', after_breakfast: 'After breakfast', after_lunch: 'After lunch', after_dinner: 'After dinner' };
const validDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
const dateUTC = (value) => new Date(`${value}T00:00:00.000Z`);
const todayUTC = () => new Date().toISOString().slice(0, 10);

function validate(body) {
  body = body && typeof body === 'object' ? body : {};
  if (body.value === '' || body.value === undefined || body.value === null) return 'Please enter a glucose value.';
  if (!Number.isInteger(Number(body.value)) || Number(body.value) < 40 || Number(body.value) > 600) return 'Value must be between 40 and 600 mg/dl.';
  if (!validDate(body.date)) return 'Please enter a valid date.';
  if (body.date > todayUTC()) return 'Date cannot be in the future.';
  if (!slots.has(body.slot)) return 'Please choose a valid time slot.';
  return null;
}

async function saveReading(req, res, next, id = null) {
  try {
    if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return res.status(404).json({ success: false, message: 'Reading not found.' });
    const issue = validate(req.body);
    if (issue) return res.status(400).json({ success: false, message: issue });
    const payload = { date: dateUTC(req.body.date), slot: req.body.slot, value: Number(req.body.value) };
    const existing = id ? await prisma.reading.findFirst({ where: { id, userId: req.userId } }) : null;
    if (id && !existing) return res.status(404).json({ success: false, message: 'Reading not found.' });
    try {
      const reading = await prisma.$transaction(async (tx) => {
        const duplicate = await tx.reading.findFirst({ where: { userId: req.userId, date: payload.date, slot: payload.slot, ...(id ? { id: { not: id } } : {}) } });
        if (duplicate) { const label = slotLabels[payload.slot]; const article = /^[aeiou]/i.test(label) ? 'an' : 'a'; const error = new Error(`You already have ${article} ${label} reading for this date.`); error.statusCode = 409; throw error; }
        const count = await tx.reading.count({ where: { userId: req.userId, date: payload.date, ...(id ? { id: { not: id } } : {}) } });
        if (count >= 4) { const error = new Error('You can add only 4 readings per day.'); error.statusCode = 400; throw error; }
        return id ? tx.reading.update({ where: { id }, data: payload }) : tx.reading.create({ data: { ...payload, userId: req.userId } });
      }, { isolationLevel: 'Serializable' });
      return res.status(id ? 200 : 201).json({ success: true, data: { reading } });
    } catch (error) {
      if (error.statusCode) return res.status(error.statusCode).json({ success: false, message: error.message });
      if (error.code === 'P2002') { const label = slotLabels[payload.slot]; const article = /^[aeiou]/i.test(label) ? 'an' : 'a'; return res.status(409).json({ success: false, message: `You already have ${article} ${label} reading for this date.` }); }
      if (error.code === 'P2034') return res.status(409).json({ success: false, message: 'Your readings changed at the same time. Please try again.' });
      throw error;
    }
  } catch (error) { return next(error); }
}

router.get('/', async (req, res, next) => {
  try {
    const pageParam = req.query.page ?? '1';
    const limitParam = req.query.limit ?? '20';
    if (!/^\d+$/.test(pageParam) || !Number.isSafeInteger(Number(pageParam)) || Number(pageParam) < 1) {
      return res.status(400).json({ success: false, message: 'Page must be a positive integer.' });
    }
    if (!/^\d+$/.test(limitParam) || Number(limitParam) < 1 || Number(limitParam) > 100) {
      return res.status(400).json({ success: false, message: 'Limit must be between 1 and 100.' });
    }
    const page = Number(pageParam);
    const limit = Number(limitParam);
    const where = { userId: req.userId };
    if (req.query.date) {
      if (!validDate(req.query.date)) return res.status(400).json({ success: false, message: 'Please enter a valid date.' });
      where.date = dateUTC(req.query.date);
    }
    const [total, readings] = await Promise.all([
      prisma.reading.count({ where }),
      prisma.reading.findMany({
        where,
        orderBy: [{ date: 'desc' }, { slot: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    const totalPages = Math.ceil(total / limit);
    return res.json({ success: true, data: {
      readings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
      },
    } });
  } catch (error) { return next(error); }
});
router.post('/', (req, res, next) => saveReading(req, res, next));
router.put('/:id', (req, res, next) => saveReading(req, res, next, req.params.id));
router.delete('/:id', async (req, res, next) => {
  try {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id)) return res.status(404).json({ success: false, message: 'Reading not found.' });
    const result = await prisma.reading.deleteMany({ where: { id: req.params.id, userId: req.userId } });
    if (!result.count) return res.status(404).json({ success: false, message: 'Reading not found.' });
    return res.json({ success: true, message: 'Reading deleted.' });
  } catch (error) { return next(error); }
});

export default router;
