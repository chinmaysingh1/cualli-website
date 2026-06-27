// Clean, minimal surface card. Despite the legacy name, this is now a simple
// white panel with gentle corners and a subtle shadow — no glass, blur, or
// liquid hover states.
export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-slate-100 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover ${className}`}
    >
      {children}
    </div>
  );
}
