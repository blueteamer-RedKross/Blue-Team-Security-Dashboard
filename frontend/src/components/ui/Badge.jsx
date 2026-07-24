export default function Badge({ children, color = 'slate' }) {
  const colorMap = {
    slate: 'bg-slate-800 text-slate-200',
    green: 'bg-emerald-500/15 text-emerald-300',
    red: 'bg-rose-500/15 text-rose-300',
    orange: 'bg-orange-500/15 text-orange-300',
    yellow: 'bg-amber-500/15 text-amber-300',
    blue: 'bg-sky-500/15 text-sky-300',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.2em] ${colorMap[color]}`}>
      {children}
    </span>
  );
}
