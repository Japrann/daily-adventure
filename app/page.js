"use client";

import dynamic from "next/dynamic";

// Daily Adventure depends on the browser clock, Math.random, and
// localStorage, so it's rendered client-side only — this avoids any
// server/client hydration mismatches from those inherently dynamic values.
const DailyAdventureApp = dynamic(() => import("@/components/DailyAdventureApp"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-cream" />,
});

export default function Page() {
  return <DailyAdventureApp />;
}
