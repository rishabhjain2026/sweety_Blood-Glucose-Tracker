import { Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Sign In', to: '/login' },
  { label: 'Get Started', to: '/register' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mint-100 bg-navy text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-500/20 text-mint-300">
              <Droplets className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight">
              Sweety
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-sky-mid">
            A calm blood glucose tracker for patients who want clarity without
            complexity.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-mint-300">
            Navigate
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.label}>
                {link.to ? (
                  <Link
                    to={link.to}
                    className="text-sm text-sky-mid transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-sky-mid transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-sm text-sky-mid sm:px-6 lg:px-8">
          © {year} Sweety. Built for patient-friendly glucose monitoring.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
