"use client";

import dynamic from "next/dynamic";

// The product reel sits below the fold and pulls in framer-motion + a ~2.5MB
// video. Lazy-loading it (ssr: false) keeps that weight out of the initial
// bundle so it never blocks First Contentful Paint. A matching skeleton holds
// the layout in place to avoid cumulative layout shift while it streams in.
const VideoWindow = dynamic(() => import("@/components/VideoWindow"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto w-full max-w-5xl" aria-hidden="true">
      <div className="aspect-video w-full animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-card" />
    </div>
  ),
});

export default function LazyVideoWindow(props) {
  return <VideoWindow {...props} />;
}
