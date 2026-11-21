import { useMemo } from 'react';

const slotName = {
  morning: 'Morning fasting',
  after_breakfast: 'After breakfast',
  after_lunch: 'After lunch',
  after_dinner: 'After dinner',
};

function GlucoseTrendChart({ readings = [], selectedDate }) {
  const chart = useMemo(() => {
    const [year, month] = selectedDate.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const ordered = [...readings].sort((a, b) => {
      const byDate = String(a.date).localeCompare(String(b.date));
      if (byDate) return byDate;
      return ['morning', 'after_breakfast', 'after_lunch', 'after_dinner'].indexOf(a.slot)
        - ['morning', 'after_breakfast', 'after_lunch', 'after_dinner'].indexOf(b.slot);
    });
    if (!ordered.length) return { points: [], ticks: [], dates: [] };

    const values = ordered.map((reading) => reading.value);
    const low = Math.max(40, Math.floor((Math.min(...values) - 20) / 20) * 20);
    const high = Math.min(600, Math.ceil((Math.max(...values) + 20) / 20) * 20);
    const yMin = high - low < 40 ? Math.max(40, high - 40) : low;
    const yMax = high - low < 40 ? Math.min(600, yMin + 40) : high;
    const plot = { left: 58, right: 782, top: 20, bottom: 238 };
    const points = ordered.map((reading) => {
      const date = String(reading.date).slice(0, 10);
      const day = Number(date.slice(8, 10));
      return {
        ...reading,
        date,
        x: plot.left + ((day - 1) / Math.max(daysInMonth - 1, 1)) * (plot.right - plot.left),
        y: plot.bottom - ((reading.value - yMin) / (yMax - yMin)) * (plot.bottom - plot.top),
      };
    });
    const ticks = Array.from({ length: 5 }, (_, index) => {
      const value = yMax - ((yMax - yMin) / 4) * index;
      return { value: Math.round(value), y: plot.top + ((plot.bottom - plot.top) / 4) * index };
    });
    const dates = Array.from(new Set([1, 8, 15, 22, daysInMonth].filter((d, i, all) => all.indexOf(d) === i)));
    return { points, ticks, dates, plot, daysInMonth };
  }, [readings, selectedDate]);

  if (!chart.points.length) {
    return (
      <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-night-700 bg-night-900/60 px-6 text-center">
        <div>
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-night-800 text-mint-300">
            <span aria-hidden="true" className="text-xl">↗</span>
          </div>
          <p className="font-semibold text-white">Your month will take shape here</p>
          <p className="mt-1 max-w-sm text-sm leading-relaxed text-slate-400">Add a glucose reading and Sweety will plot your values across the month.</p>
        </div>
      </div>
    );
  }

  const path = chart.points.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
  const monthLabel = new Date(`${selectedDate}T00:00:00`).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-400">Daily readings · {monthLabel}</p>
          <p className="mt-1 text-xs text-slate-500">Each point is one saved reading, in mg/dl.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-mint-500/20 bg-mint-500/10 px-3 py-1.5 text-xs font-semibold text-mint-300">
          <span className="h-2 w-2 rounded-full bg-mint-300" /> {chart.points.length} readings
        </span>
      </div>
      <div className="overflow-x-auto">
        <svg className="h-64 min-w-[620px] w-full" viewBox="0 0 800 280" role="img" aria-label={`Line chart showing ${chart.points.length} glucose readings in ${monthLabel}`}>
          <defs>
            <linearGradient id="glucose-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#76E7B3" stopOpacity=".22" />
              <stop offset="100%" stopColor="#76E7B3" stopOpacity="0" />
            </linearGradient>
          </defs>
          {chart.ticks.map((tick) => (
            <g key={tick.value}>
              <line x1={chart.plot.left} x2={chart.plot.right} y1={tick.y} y2={tick.y} stroke="#243a35" strokeDasharray="4 7" />
              <text x="46" y={tick.y + 4} fill="#80958e" fontSize="11" textAnchor="end">{tick.value}</text>
            </g>
          ))}
          {chart.dates.map((day) => {
            const x = chart.plot.left + ((day - 1) / Math.max(chart.daysInMonth - 1, 1)) * (chart.plot.right - chart.plot.left);
            return <text key={day} x={x} y="266" fill="#80958e" fontSize="11" textAnchor="middle">{day}</text>;
          })}
          <path d={`${path} L ${chart.points.at(-1).x} ${chart.plot.bottom} L ${chart.points[0].x} ${chart.plot.bottom} Z`} fill="url(#glucose-area)" />
          <path d={path} fill="none" stroke="#76E7B3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {chart.points.map((point, index) => (
            <g key={point.id || `${point.date}-${point.slot}-${index}`}>
              <circle cx={point.x} cy={point.y} r="9" fill="#76E7B3" opacity=".12" />
              <circle cx={point.x} cy={point.y} r="4" fill="#081411" stroke="#8AF0C0" strokeWidth="2.5">
                <title>{`${point.date} · ${slotName[point.slot] || point.slot} · ${point.value} mg/dl`}</title>
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export default GlucoseTrendChart;
