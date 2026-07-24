export default function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-[18px] border border-border bg-panel p-6 shadow-premium ${className}`}>
      {(title || subtitle) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            {title && <h2 className="text-xl font-semibold text-white">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
