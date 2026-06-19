import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
      <p className="text-bio glow-soft text-7xl font-bold tracking-[-0.03em] sm:text-8xl">
        404
      </p>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        This strand led nowhere.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-gray-400">
        The page you&apos;re looking for has been filtered out. Let&apos;s get
        you back to solid ground.
      </p>
      <div className="mt-10">
        <CTAButton href="/">Return Home</CTAButton>
      </div>
    </section>
  );
}
