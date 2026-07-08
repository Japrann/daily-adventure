"use client";

import { motion } from "framer-motion";

export default function DashboardCard({ icon, title, description, badge, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className="glass relative flex min-h-[96px] flex-col gap-1.5 rounded-[20px] p-4 text-left shadow-soft"
    >
      {badge ? (
        <span className="absolute right-2.5 top-2.5 rounded-full bg-coral px-1.5 py-0.5 text-[0.62rem] font-bold text-white">
          {badge}
        </span>
      ) : null}
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-bold">{title}</span>
      <span className="text-xs leading-snug text-ink-soft dark:text-cream/60">{description}</span>
    </motion.button>
  );
}
