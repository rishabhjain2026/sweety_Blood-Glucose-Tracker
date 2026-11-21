import { motion } from 'framer-motion';
import { PenLine, Eye, TrendingUp } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const steps = [
  {
    number: '01',
    icon: PenLine,
    title: 'Record glucose readings',
    description:
      'Add a reading for the time of day that matches your routine—up to four slots per day.',
  },
  {
    number: '02',
    icon: Eye,
    title: 'Monitor daily progress',
    description:
      'Open your daily report to review highs, lows, averages, and each individual reading.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Understand health trends',
    description:
      'Use month-to-date and monthly reports to notice patterns and share clearer updates with caregivers.',
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-sky-soft/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Three calm steps to stay on track"
          description="A clear flow from logging a reading to understanding your longer-term picture."
        />

        <ol className="grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={step.title}
                className="relative rounded-2xl border border-white bg-white p-7 shadow-card"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.1, duration: 0.45 }}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-mint-300">
                    {step.number}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-100 text-mint-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-muted sm:text-base">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
