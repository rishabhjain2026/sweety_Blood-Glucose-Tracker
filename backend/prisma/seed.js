import bcrypt from 'bcrypt';
import prisma from '../src/config/prisma.js';

const today = new Date();
today.setUTCHours(0, 0, 0, 0);

try {
  const passwordHash = await bcrypt.hash('SweetyDemo2026!', 12);
  const user = await prisma.user.upsert({
    where: { email: 'demo@sweety.health' },
    update: { name: 'Sweety Demo', passwordHash },
    create: { name: 'Sweety Demo', email: 'demo@sweety.health', passwordHash },
  });
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  for (const [date, slot, value] of [
    [yesterday, 'morning', 106], [yesterday, 'after_lunch', 142],
    [today, 'morning', 98], [today, 'after_breakfast', 127],
  ]) {
    await prisma.reading.upsert({
      where: { userId_date_slot: { userId: user.id, date, slot } },
      update: { value },
      create: { userId: user.id, date, slot, value },
    });
  }
  console.log('Demo account ready: demo@sweety.health / SweetyDemo2026!');
} finally {
  await prisma.$disconnect();
}
