import { motion } from 'framer-motion';
import {
  ClipboardList,
  LineChart,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';

const features = [
  {
    icon: ClipboardList,
    title: 'Easy glucose tracking',
    description:
      'Log morning, breakfast, lunch, and dinner readings with large, clear controls that feel comfortable every day.',
  },
  {
    icon: LineChart,
    title: 'Daily health insights',
    description:
      'See highest, lowest, and average values for any day so you can understand patterns at a glance.',
  },
  {
    icon: CalendarDays,
    title: 'Monthly reports',
    description:
      'Review month-to-date and full monthly summaries that help you and your care team stay informed.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure personal records',
    description:
      'Your readings stay private to your account, with authentication designed to protect sensitive health data.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.08, duration: 0.45, ease: 'easeOut' },
  }),
};

function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need for steady glucose care"
          description="Simple tools that help you capture readings consistently and understand what they mean over time."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.title}
                className="group rounded-2xl border border-mint-100 bg-mint-50/60 p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-mint-300 hover:bg-white hover:shadow-soft"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-mint-600 shadow-card transition-colors group-hover:bg-mint-100">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-muted sm:text-base">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
