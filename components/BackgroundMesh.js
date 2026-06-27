// Static, warm, clean background. The previous animated bioluminescent fluid
// blobs are gone — this is now a quiet off-white wash with the faintest warm
// tint at the top so the page never feels flat.
export default function BackgroundMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-canvas"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(245,231,218,0.55),transparent_60%)]" />
    </div>
  );
}
