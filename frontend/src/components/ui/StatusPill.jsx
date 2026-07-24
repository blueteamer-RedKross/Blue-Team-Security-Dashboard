export default function StatusPill({ label, color = 'slate' }) {
  const palette = {
    slate: 'bg-slate-800 text-slate-200',
    green: 'bg-emerald-500/15 text-emerald-300',
    blue: 'bg-sky-500/15 text-sky-300',
    orange: 'bg-orange-500/15 text-orange-300',
    red: 'bg-rose-500/15 text-rose-300',
    yellow: 'bg-amber-500/15 text-amber-300',
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${palette[color]}`}>{label}</span>;
}
