// Slow-moving bioluminescent gradient mesh that lives beneath the dark layer,
// simulating a microscopic fluid environment. Pure CSS animation (GPU-friendly).
export default function BackgroundMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Abyssal base wash */}
      <div className="absolute inset-0 bg-abyss-700/40" />

      {/* Drifting bioluminescent blobs (saturation kept low so the abyss stays deep) */}
      <div className="absolute -left-[12%] top-[-18%] h-[58vw] w-[58vw] animate-drift-a rounded-full bg-mesh-cyan opacity-70 blur-[120px]" />
      <div className="absolute right-[-16%] top-[6%] h-[52vw] w-[52vw] animate-drift-b rounded-full bg-mesh-emerald opacity-60 blur-[120px]" />
      <div className="absolute bottom-[-22%] left-[18%] h-[50vw] w-[50vw] animate-drift-c rounded-full bg-mesh-aqua opacity-50 blur-[120px]" />
      <div className="absolute bottom-[4%] right-[4%] h-[34vw] w-[34vw] animate-drift-a rounded-full bg-mesh-cyan opacity-50 blur-[100px]" />

      {/* Faint conic shimmer at the very top, like light entering water */}
      <div className="absolute -top-1/3 left-1/2 h-[60vh] w-[120vw] -translate-x-1/2 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(52,214,255,0.12),transparent_70%)]" />

      {/* Film grain for filmic depth */}
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-soft-light" />

      {/* Vignette to keep edges abyssal and focus the eye center-stage */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_-10%,transparent_38%,rgba(0,0,0,0.55)_78%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
