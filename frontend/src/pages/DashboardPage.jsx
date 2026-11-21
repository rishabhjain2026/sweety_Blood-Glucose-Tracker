import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, CalendarDays, ChartNoAxesCombined, Droplets, LayoutDashboard, LogOut, Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import GlucoseTrendChart from '../components/dashboard/GlucoseTrendChart.jsx';

const slots = [
  ['morning', 'Morning (fasting)'], ['after_breakfast', 'After breakfast'],
  ['after_lunch', 'After lunch'], ['after_dinner', 'After dinner'],
];
const today = () => new Date().toLocaleDateString('en-CA');
const blank = () => ({ date: today(), slot: 'morning', value: '' });
const prettyDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

function DashboardPage({ view = 'dashboard' }) {
  const { user, signOut, api } = useAuth();
  const [readings, setReadings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0, hasPreviousPage: false, hasNextPage: false });
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState(null);
  const [reports, setReports] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportDate, setReportDate] = useState(today());
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refresh = useCallback(async () => {
    setBusy(true); setError('');
    try {
      const [readingData, summaryData] = await Promise.all([api(`/readings?page=${page}&limit=20`), api('/reports/summary')]);
      setReadings(readingData.readings); setPagination(readingData.pagination); setSummary(summaryData);
      setPage((current) => readingData.pagination.totalPages ? Math.min(current, readingData.pagination.totalPages) : 1);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }, [api, page]);

  useEffect(() => { refresh(); }, [refresh]);
  const loadReports = useCallback(async () => {
    setReportsLoading(true);
    try { setError(''); setReports(await api(`/reports?date=${reportDate}`)); }
    catch (err) { setError(err.message); }
    finally { setReportsLoading(false); }
  }, [api, reportDate]);
  useEffect(() => { if (view === 'reports') loadReports(); }, [view, loadReports]);

  const stats = useMemo(() => [
    { label: 'Total readings', value: summary?.total ?? '—', icon: Activity, tone: 'bg-mint-50 text-mint-700' },
    { label: 'Highest', value: summary?.highest == null ? '—' : `${summary.highest} mg/dl`, icon: ChartNoAxesCombined, tone: 'bg-lavender-soft text-violet-700' },
    { label: 'Lowest', value: summary?.lowest == null ? '—' : `${summary.lowest} mg/dl`, icon: Droplets, tone: 'bg-sky-mid/20 text-sky-deep' },
    { label: 'Average', value: summary?.average == null ? '—' : `${summary.average} mg/dl`, icon: CalendarDays, tone: 'bg-amber-50 text-amber-700' },
  ], [summary]);

  const startEdit = (reading) => { setEditing(reading.id); setForm({ date: reading.date.slice(0, 10), slot: reading.slot, value: String(reading.value) }); setError(''); setNotice(''); };
  const resetForm = () => { setEditing(null); setForm(blank()); };
  const submit = async (event) => {
    event.preventDefault(); setError(''); setNotice('');
    if (form.value === '') { setError('Please enter a glucose value.'); return; }
    if (!/^\d+$/.test(String(form.value)) || Number(form.value) < 40 || Number(form.value) > 600) { setError('Value must be between 40 and 600 mg/dl.'); return; }
    if (form.date > today()) { setError('Date cannot be in the future.'); return; }
    setSaving(true);
    try {
      await api(editing ? `/readings/${editing}` : '/readings', { method: editing ? 'PUT' : 'POST', body: JSON.stringify({ ...form, value: Number(form.value) }) });
      resetForm(); setNotice(editing ? 'Reading updated.' : 'Reading saved.'); await refresh();
      if (view === 'reports') await loadReports();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  };
  const remove = async (reading) => {
    if (!window.confirm('Delete this reading? This cannot be undone.')) return;
    try { await api(`/readings/${reading.id}`, { method: 'DELETE' }); setNotice('Reading deleted.'); await refresh(); if (view === 'reports') await loadReports(); }
    catch (err) { setError(err.message); }
  };

  const nav = [
    ['/dashboard', 'Overview', LayoutDashboard], ['/readings', 'Reading history', Activity], ['/reports', 'Reports', ChartNoAxesCombined],
  ];
  const rows = (items) => items?.length ? <div className="divide-y divide-mint-100">{items.map((r) => <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
    <div><p className="font-semibold text-navy">{slots.find(([key]) => key === r.slot)?.[1] || r.slot}</p><p className="mt-1 text-sm text-navy-muted">{prettyDate(String(r.date).slice(0, 10))}</p></div>
    <div className="flex items-center gap-3"><span className="rounded-xl bg-mint-50 px-3 py-2 font-semibold text-navy">{r.value} <span className="text-xs font-medium text-navy-muted">mg/dl</span></span><button aria-label="Edit reading" onClick={() => startEdit(r)} className="rounded-lg p-2 text-navy-muted hover:bg-mint-50 hover:text-mint-700"><Pencil size={17} /></button><button aria-label="Delete reading" onClick={() => remove(r)} className="rounded-lg p-2 text-navy-muted hover:bg-red-50 hover:text-red-600"><Trash2 size={17} /></button></div>
  </div>)}</div> : <div className="rounded-2xl bg-mint-50/70 px-5 py-8 text-center"><p className="font-semibold text-navy">No readings in this period yet</p><p className="mt-1 text-sm text-navy-muted">Your saved glucose readings will appear here.</p></div>;

  return <div className="min-h-screen bg-mint-50/60">
    <header className="sticky top-0 z-20 border-b border-mint-100 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <Link to="/dashboard" className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-xl bg-mint-100 text-mint-700"><Droplets size={20}/></span><span className="font-display text-xl font-semibold text-navy">Sweety</span></Link>
      <div className="flex items-center gap-3"><span className="hidden text-sm text-navy-muted sm:inline">Hi, {user?.name?.split(' ')[0]}</span><button onClick={signOut} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-navy-muted hover:bg-mint-50"><LogOut size={17}/> <span className="hidden sm:inline">Sign out</span></button></div>
    </div></header>
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-10">
      <aside><nav aria-label="Dashboard" className="flex gap-2 overflow-x-auto lg:flex-col">{nav.map(([href, label, Icon]) => <Link key={href} to={href} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${view === (href === '/dashboard' ? 'dashboard' : href.slice(1)) ? 'bg-mint-600 text-night-950 shadow-glow' : 'text-navy-muted hover:bg-white'}`}><Icon size={18}/>{label}</Link>)}</nav></aside>
      <main className="min-w-0">
        <div className="mb-6"><p className="text-sm font-semibold uppercase tracking-[.12em] text-mint-700">Your health, at a glance</p><h1 className="mt-1 font-display text-3xl font-semibold text-navy">{view === 'reports' ? 'Reports' : view === 'readings' ? 'Reading history' : `Good ${new Date().getHours() < 12 ? 'morning' : 'day'}, ${user?.name?.split(' ')[0] || 'there'}`}</h1></div>
        {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="mb-4 rounded-xl border border-mint-200 bg-white px-4 py-3 text-sm text-mint-800">{notice}</p>}
        {view !== 'reports' && <>
          {view === 'dashboard' && <section aria-label="Glucose statistics" className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-white bg-white p-5 shadow-card"><span className={`mb-4 grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={20}/></span><p className="text-sm text-navy-muted">{label}</p><p className="mt-1 text-xl font-semibold text-navy">{value}</p></div>)}</section>}
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <section className="rounded-2xl border border-white bg-white p-5 shadow-card sm:p-6"><div className="mb-5"><h2 className="font-display text-xl font-semibold text-navy">{editing ? 'Edit a reading' : 'Add a reading'}</h2><p className="mt-1 text-sm text-navy-muted">Capture a reading to keep your history up to date.</p></div>
              <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-medium text-navy">Date<input aria-label="Reading date" type="date" max={today()} required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1.5 block w-full rounded-xl border border-mint-200 bg-white px-3 py-3 text-navy outline-none focus:border-mint-500 focus:ring-2 focus:ring-mint-100"/></label>
              <label className="block text-sm font-medium text-navy">Time slot<select value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} className="mt-1.5 block w-full rounded-xl border border-mint-200 bg-white px-3 py-3 text-navy outline-none focus:border-mint-500 focus:ring-2 focus:ring-mint-100">{slots.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
              <label className="block text-sm font-medium text-navy">Glucose value (mg/dl)<input aria-label="Glucose value in mg/dl" type="number" min="40" max="600" step="1" inputMode="numeric" placeholder="For example, 110" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="mt-1.5 block w-full rounded-xl border border-mint-200 bg-white px-3 py-3 text-navy outline-none placeholder:text-navy-muted/60 focus:border-mint-500 focus:ring-2 focus:ring-mint-100"/></label>
              <div className="flex gap-2"><button disabled={saving} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-mint-600 px-4 py-3 font-semibold text-night-950 hover:bg-mint-500 disabled:opacity-60"><Plus size={18}/>{saving ? 'Saving…' : editing ? 'Save changes' : 'Save reading'}</button>{editing && <button type="button" onClick={resetForm} className="rounded-xl border border-mint-200 px-4 py-3 font-semibold text-navy">Cancel</button>}</div></form>
            </section>
            <section className="rounded-2xl border border-white bg-white p-5 shadow-card sm:p-6">
              <div className="mb-5 flex items-center justify-between"><div><h2 className="font-display text-xl font-semibold text-navy">{view === 'readings' ? 'All readings' : 'Recent readings'}</h2><p className="mt-1 text-sm text-navy-muted">{view === 'readings' ? `${pagination.total} saved measurements` : 'Your latest saved measurements.'}</p></div>{view === 'dashboard' && <Link to="/readings" className="text-sm font-semibold text-mint-700 hover:text-mint-800">View all</Link>}</div>
              {busy ? <p className="py-6 text-center text-sm text-navy-muted" role="status">Loading readings…</p> : rows(view === 'readings' ? readings : readings.slice(0, 5))}
              {view === 'readings' && pagination.totalPages > 1 && <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-mint-100 pt-4">
                <p className="text-sm text-navy-muted">Page {pagination.page} of {pagination.totalPages}</p>
                <div className="flex gap-2">
                  <button type="button" disabled={!pagination.hasPreviousPage || busy} onClick={() => setPage((current) => Math.max(1, current - 1))} className="rounded-xl border border-mint-200 px-4 py-2 text-sm font-semibold text-navy transition hover:bg-mint-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                  <button type="button" disabled={!pagination.hasNextPage || busy} onClick={() => setPage((current) => current + 1)} className="rounded-xl border border-mint-200 px-4 py-2 text-sm font-semibold text-navy transition hover:bg-mint-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                </div>
              </div>}
            </section>
          </div>
        </>}
        {view === 'reports' && <><section className="mb-6 flex flex-wrap items-end gap-4 rounded-2xl border border-white bg-white p-5 shadow-card"><label className="text-sm font-medium text-navy">Report date<input type="date" max={today()} value={reportDate} onChange={(e) => setReportDate(e.target.value)} className="mt-1.5 block rounded-xl border border-mint-200 px-3 py-2.5 outline-none focus:border-mint-500"/></label><p className="pb-2 text-sm text-navy-muted">Monthly periods use the selected date.</p></section>
          <section className="mb-6 rounded-2xl border border-white bg-white p-5 shadow-card sm:p-6"><div className="mb-4"><h2 className="font-display text-xl font-semibold text-navy">Monthly glucose trend</h2><p className="mt-1 text-sm text-navy-muted">See how your saved readings move through the selected month.</p></div>{reportsLoading ? <p className="py-8 text-center text-sm text-navy-muted" role="status">Loading chart…</p> : reports && <GlucoseTrendChart readings={reports.monthToDate} selectedDate={reportDate} />}</section>
          {reportsLoading ? <p className="py-8 text-center text-sm text-navy-muted" role="status">Loading reports…</p> : <div className="grid gap-5 xl:grid-cols-3">{reports && [[`Daily · ${prettyDate(reportDate)}`, reports.daily], [`Month to date · ${prettyDate(reportDate)}`, reports.monthToDate], [`${reports.previousMonthLabel} · full month`, reports.previousMonth]].map(([title, data]) => <section key={title} className="rounded-2xl border border-white bg-white p-5 shadow-card"><h2 className="mb-5 font-display text-lg font-semibold text-navy">{title}</h2>{rows(data)}</section>)}</div>}</>}
      </main>
    </div>
  </div>;
}

export default DashboardPage;
