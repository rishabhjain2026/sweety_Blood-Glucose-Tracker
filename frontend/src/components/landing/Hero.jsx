import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Droplets, HeartPulse } from 'lucide-react';
import Button from '../ui/Button.jsx';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function FloatingIcon({ children, className, delay = 0, reduceMotion }) {
  return (
    <motion.div
      className={`pointer-events-none absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-mint-600 shadow-card backdrop-blur-sm ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -10, 0],
              rotate: [0, 3, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 5.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay,
            }
      }
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}

function HeroIllustration({ reduceMotion }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
    >
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-mint-200/50 via-sky-soft/60 to-lavender-soft/50 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-soft backdrop-blur-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mint-600">
              Today
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-navy">
              Glucose overview
            </p>
          </div>
          <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700">
            4 slots
          </span>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Morning (fasting)', value: '98', tone: 'bg-mint-100 text-mint-700' },
            { label: 'After breakfast', value: '124', tone: 'bg-sky-soft text-sky-deep' },
            { label: 'After lunch', value: '118', tone: 'bg-lavender-soft text-navy-muted' },
            { label: 'After dinner', value: '—', tone: 'bg-mint-50 text-navy-soft' },
          ].map((row, index) => (
            <motion.div
              key={row.label}
              className="flex items-center justify-between rounded-2xl border border-mint-100 bg-white px-4 py-3"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.08, duration: 0.4 }}
            >
              <span className="text-sm font-medium text-navy-muted">{row.label}</span>
              <span className={`rounded-lg px-2.5 py-1 text-sm font-semibold ${row.tone}`}>
                {row.value}
                {row.value !== '—' ? (
                  <span className="ml-1 text-xs font-medium opacity-70">mg/dl</span>
                ) : null}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: 'Avg', value: '113.3' },
            { label: 'High', value: '124' },
            { label: 'Low', value: '98' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-mint-50 px-3 py-3 text-center"
            >
              <p className="text-xs font-medium text-navy-soft">{stat.label}</p>
              <p className="mt-1 font-display text-lg font-semibold text-navy">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <FloatingIcon className="-left-3 top-10 sm:-left-6" delay={0} reduceMotion={reduceMotion}>
        <Droplets className="h-5 w-5" />
      </FloatingIcon>
      <FloatingIcon
        className="-right-2 top-24 sm:-right-5"
        delay={1.2}
        reduceMotion={reduceMotion}
      >
        <HeartPulse className="h-5 w-5" />
      </FloatingIcon>
      <FloatingIcon
        className="bottom-16 -left-2 sm:-left-4"
        delay={2}
        reduceMotion={reduceMotion}
      >
        <Activity className="h-5 w-5" />
      </FloatingIcon>
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-hero-glow pb-20 pt-28 sm:pb-28 sm:pt-32"
    >
      <motion.div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-mint-200/40 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, 16, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
        }
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-sky-mid/30 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -20, 0], y: [0, -12, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: 'easeInOut' }
        }
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          className="flex flex-col items-start"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="font-display text-4xl font-semibold tracking-tight text-mint-600 sm:text-5xl lg:text-6xl"
          >
            Sweety
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-navy text-balance sm:text-4xl lg:text-[2.75rem]"
          >
            Track glucose with calm clarity—built for everyday care.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-base leading-relaxed text-navy-muted sm:text-lg"
          >
            Record up to four readings a day and see simple daily and monthly
            insights designed for patients who want confidence without complexity.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button to="/register" variant="primary" size="lg">
              Get Started
            </Button>
            <Button to="/login" variant="secondary" size="lg">
              Sign In
            </Button>
          </motion.div>
        </motion.div>

        <HeroIllustration reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

export default Hero;
