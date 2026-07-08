"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sheet from "@/components/sheets/Sheet";

export default function GiftSheet({ isOpen, onClose, onOpenGift, alreadyOpenedGift }) {
  const [revealed, setRevealed] = useState(alreadyOpenedGift || null);

  // Keep in sync if a new day rolls in (or the demo "simulate next day" runs)
  // and the daily gift becomes available again.
  useEffect(() => {
    setRevealed(alreadyOpenedGift || null);
  }, [alreadyOpenedGift]);

  const handleOpen = () => {
    const { gift } = onOpenGift();
    setRevealed(gift);
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Daily Gift"
      subtitle="One little surprise waiting for you today."
    >
      <div className="flex min-h-[100px] items-center justify-center rounded-2xl bg-white p-5 text-center shadow-soft dark:bg-[#2b2b3a]">
        <AnimatePresence mode="wait">
          {revealed ? (
            <motion.div
              key={revealed.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 18 }}
            >
              <div className="mb-1.5 text-3xl">{revealed.icon}</div>
              <div className="font-display font-semibold">{revealed.title}</div>
              <p className="mt-1.5 text-sm text-ink-soft dark:text-cream/60">{revealed.body}</p>
            </motion.div>
          ) : (
            <motion.div key="closed" className="text-4xl" initial={{ scale: 1 }} animate={{ scale: 1 }}>
              🎁
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleOpen}
          disabled={!!revealed}
          className="rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(226,116,88,0.35)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {revealed ? "See you tomorrow" : "Open gift"}
        </button>
      </div>
    </Sheet>
  );
}
