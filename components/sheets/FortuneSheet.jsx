"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sheet from "@/components/sheets/Sheet";
import { FORTUNES } from "@/data/fortunes";

export default function FortuneSheet({ isOpen, onClose }) {
  const [fortune, setFortune] = useState(null);

  const crack = () => {
    setFortune(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]);
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Fortune Cookie" subtitle="Crack it open for a small thought.">
      <div className="flex min-h-[100px] items-center justify-center rounded-2xl bg-white p-5 text-center font-display shadow-soft dark:bg-[#2b2b3a]">
        <AnimatePresence mode="wait">
          <motion.div
            key={fortune || "closed"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 18 }}
          >
            {fortune ? (
              <p className="text-base leading-relaxed">{fortune}</p>
            ) : (
              <span className="text-4xl">🥠</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={crack}
          className="rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(226,116,88,0.35)] transition active:scale-95"
        >
          Crack the cookie
        </button>
      </div>
    </Sheet>
  );
}
