const accentClasses = {
  'from-sky-500 to-cyan-500': 'from-sky-500 to-cyan-500 shadow-[0_22px_60px_rgba(56,189,248,0.18)]',
  'from-orange-500 to-amber-400': 'from-orange-500 to-amber-400 shadow-[0_22px_60px_rgba(249,115,22,0.18)]',
  'from-violet-500 to-fuchsia-500': 'from-violet-500 to-fuchsia-500 shadow-[0_22px_60px_rgba(139,92,246,0.18)]',
  'from-sky-500 to-blue-500': 'from-sky-500 to-blue-500 shadow-[0_22px_60px_rgba(58,123,253,0.18)]',
  'from-emerald-500 to-teal-500': 'from-emerald-500 to-teal-500 shadow-[0_22px_60px_rgba(34,197,94,0.18)]',
  'from-violet-500 to-indigo-500': 'from-violet-500 to-indigo-500 shadow-[0_22px_60px_rgba(124,58,237,0.18)]',
};

export default function ModuleCard({ title, description, icon, accent }) {
  return (
    <div className="rounded-[18px] border border-border bg-panel p-6 shadow-premium transition duration-300 hover:-translate-y-0.5 hover:bg-[#1a2539]">
      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${accentClasses[accent] || ''} text-white`}>
        {icon}
      </div>
      <div className="mt-5">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-500">{title}</p>
        <p className="mt-4 text-base leading-6 text-slate-300">{description}</p>
      </div>
      <button className="mt-6 inline-flex items-center gap-2 rounded-3xl border border-border bg-[#111c2e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-hover">
        Manage
      </button>
    </div>
  );
}
