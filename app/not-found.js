export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[clamp(72px,14vw,140px)] font-medium leading-none tracking-[-0.03em] text-spore">
        404
      </p>
      <h1 className="mt-6 font-display text-[clamp(26px,4vw,40px)] font-medium tracking-[-0.02em]">
        This page wandered off.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[16.5px] leading-[1.65] text-mist-200">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to solid ground.
      </p>
      <a
        href="/"
        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-spore px-6 py-[15px] text-[15px] font-semibold text-ink-950 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cta"
      >
        Return home
      </a>
    </section>
  );
}
