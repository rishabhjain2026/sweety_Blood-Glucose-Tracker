import { motion } from 'framer-motion';
import { HeartHandshake, Lock, Smile } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const pillars = [
  {
    icon: Smile,
    title: 'Focus on simplicity',
    description:
      'Large buttons, readable type, and a clear layout so logging a reading never feels overwhelming.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-friendly experience',
    description:
      'Designed for elderly patients and caregivers—calm colors, gentle motion, and familiar language.',
  },
  {
    icon: Lock,
    title: 'Privacy-conscious design',
    description:
      'Personal health data stays behind authentication, with each account limited to its own readings.',
  },
];

function Trust() {
  return (
    <section id="trust" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Built for trust"
          title="Healthcare software that feels welcoming"
          description="Sweety is crafted to feel like a premium care companion—dependable, gentle, and easy to return to every day."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.title}
                className="rounded-2xl border border-lavender-mid/40 bg-gradient-to-b from-lavender-soft/70 to-white p-7"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-navy shadow-card">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-muted sm:text-base">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Trust;
