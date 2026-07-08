"use client";

import { motion } from "framer-motion";
import { xpProgressPercent } from "@/lib/xp";

function StatPill({ label, children }) {
  return (
    <div className="glass flex-1 rounded-[18px] px-3 py-2.5 shadow-soft">
      <div className="text-[0.65rem] font-bold uppercase tracking-wide text-ink-soft dark:text-cream/50">
        {label}
      </div>
      {children}
    </div>
  );
}

export default function StatsBar({ level, xp, coins, streak }) {
  return (
    <div className="mt-4 flex gap-2.5">
      <StatPill label="Level">
        <div className="font-display text-lg font-semibold">{level}</div>
        <div className="mt-1.5 h-[7px] overflow-hidden rounded-md bg-black/[0.08] dark:bg-white/10">
          <motion.div
            className="h-full rounded-md bg-gradient-to-r from-coral to-gold"
            animate={{ width: `${xpProgressPercent(xp)}%` }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
          />
        </div>
      </StatPill>
      <StatPill label="Coins">
        <div className="font-display text-lg font-semibold">🪙 {coins}</div>
      </StatPill>
      <StatPill label="Streak">
        <div className="font-display text-lg font-semibold">🔥 {streak}</div>
      </StatPill>
    </div>
  );
}
