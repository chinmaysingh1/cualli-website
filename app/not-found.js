import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold tracking-tight text-clay-600 sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        This page wandered off.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to solid ground.
      </p>
      <div className="mt-10">
        <CTAButton href="/">Return Home</CTAButton>
      </div>
    </section>
  );
}
