const colorClasses = {
  sky: 'bg-sky-950 text-sky-400',
  orange: 'bg-orange-950 text-orange-400',
  violet: 'bg-violet-950 text-violet-400',
  emerald: 'bg-emerald-950 text-emerald-400',
  cyan: 'bg-cyan-950 text-cyan-400',
};

export default function StatCard({ label, value, trend, color, icon }) {
  return (
    <div className="rounded-[18px] border border-border bg-panel p-5 shadow-premium transition duration-300 hover:-translate-y-0.5 hover:bg-[#1a2539]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${colorClasses[color] || 'bg-slate-900 text-slate-300'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 text-sm text-slate-400">
        <span>{trend}</span>
        <span className="text-slate-300">+7.6%</span>
      </div>
    </div>
  );
}
