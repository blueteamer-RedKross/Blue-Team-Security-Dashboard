export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-3xl px-5 py-3 text-sm font-semibold transition';
  const variants = {
    primary: 'bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-[0_18px_60px_rgba(58,123,253,0.24)] hover:-translate-y-0.5',
    secondary: 'bg-[#0f1728] text-slate-200 hover:bg-[#18253b]',
    danger: 'bg-rose-500 text-white hover:bg-rose-400',
  };
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}
