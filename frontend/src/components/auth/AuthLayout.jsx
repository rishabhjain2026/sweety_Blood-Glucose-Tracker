import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Droplets } from 'lucide-react';

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-hero-glow">
      <div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-mint-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-sky-mid/25 blur-3xl"
        aria-hidden="true"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-lg items-center justify-between px-4 py-5 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-navy-muted transition-colors hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint-100 text-mint-600">
            <Droplets className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold text-navy">Sweety</span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-12 pt-2 sm:px-6">
        <motion.div
          className="w-full max-w-md rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-soft backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="mb-7 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mint-100 text-mint-600">
              <Droplets className="h-6 w-6" aria-hidden="true" />
            </span>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm leading-relaxed text-navy-muted sm:text-base">
                {subtitle}
              </p>
            ) : null}
          </div>

          {children}

          {footer ? <div className="mt-6 text-center text-sm text-navy-muted">{footer}</div> : null}
        </motion.div>
      </main>
    </div>
  );
}

export default AuthLayout;
