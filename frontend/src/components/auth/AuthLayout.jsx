import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, Check, Droplets, HeartPulse, ShieldCheck } from 'lucide-react';

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-night-950 text-white">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-mint-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-teal-500/10 blur-3xl" />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <Link to="/" className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-mint-300/20 bg-mint-500/10 text-mint-300"><Droplets size={21} /></span>
          <span><span className="block font-display text-xl font-semibold tracking-tight text-white">Sweety</span><span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Personal glucose care</span></span>
        </Link>
        <Link to="/" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint-400"><ArrowLeft size={16} /> <span className="hidden sm:inline">Back to home</span></Link>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl items-center gap-10 px-5 pb-10 pt-3 sm:px-8 lg:grid-cols-[1fr_.92fr] lg:gap-16 lg:px-10 lg:pb-16">
        <motion.section className="hidden lg:block" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint-300/20 bg-mint-400/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-mint-200"><HeartPulse size={14} /> A calmer way to stay in tune</div>
          <h2 className="max-w-xl font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white xl:text-6xl">Small check-ins.<br /><span className="text-mint-300">A clearer picture.</span></h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">Keep your readings in one private place, notice your monthly patterns, and bring a clear history to your next care conversation.</p>

          <div className="relative mt-9 max-w-lg overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-night-800 to-night-900 p-5 shadow-soft">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint-400/10 blur-3xl" />
            <div className="relative flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-slate-500">Your personal dashboard</p><p className="mt-1 font-display text-xl font-semibold text-white">Care, made clearer</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-400/10 text-mint-300"><Activity size={19} /></span></div>
            <div className="relative mt-5 grid grid-cols-3 gap-3">
              {[['Daily log', '4 simple time slots'], ['Monthly view', 'Patterns at a glance'], ['Private by design', 'Only you can see']].map(([label, note]) => <div key={label} className="rounded-xl border border-white/5 bg-black/15 p-3"><p className="text-xs font-semibold text-slate-200">{label}</p><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>)}
            </div>
            <div className="relative mt-5 flex items-center gap-2 border-t border-white/5 pt-4 text-xs text-slate-400"><ShieldCheck size={15} className="text-mint-300" /> Your health records stay connected to your account.</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500"><span className="inline-flex items-center gap-2"><Check size={14} className="text-mint-300" /> Private records</span><span className="inline-flex items-center gap-2"><Check size={14} className="text-mint-300" /> Easy daily tracking</span><span className="inline-flex items-center gap-2"><Check size={14} className="text-mint-300" /> Monthly insights</span></div>
        </motion.section>

        <motion.section className="mx-auto w-full max-w-xl" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
          <div className="rounded-[1.75rem] border border-white/10 bg-night-900/90 p-6 shadow-soft backdrop-blur-xl sm:p-8 lg:p-9">
            <div className="mb-7">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint-300/15 bg-mint-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.16em] text-mint-200"><ShieldCheck size={13} /> Secure patient portal</span>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
              {subtitle && <p className="mt-2 max-w-md text-sm leading-6 text-slate-400 sm:text-base">{subtitle}</p>}
            </div>
            {children}
            {footer && <div className="mt-6 border-t border-white/8 pt-5 text-center text-sm text-slate-400">{footer}</div>}
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-slate-600">Your readings are personal health information. Keep your sign-in details private.</p>
        </motion.section>
      </main>
    </div>
  );
}

export default AuthLayout;
