"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sheet from "@/components/sheets/Sheet";
import { COMFORTS } from "@/data/comforts";

export default function ComfortSheet({ isOpen, onClose }) {
  const [message, setMessage] = useState(null);

  const give = () => {
    setMessage(COMFORTS[Math.floor(Math.random() * COMFORTS.length)]);
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Comfort Corner"
      subtitle="No reason needed. Just a little warmth."
    >
      <div className="flex min-h-[100px] items-center justify-center rounded-2xl bg-white p-5 text-center font-display shadow-soft dark:bg-[#2b2b3a]">
        <AnimatePresence mode="wait">
          <motion.div
            key={message || "closed"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 18 }}
          >
            {message ? (
              <p className="text-base leading-relaxed">{message}</p>
            ) : (
              <span className="text-4xl">🫖</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={give}
          className="rounded-2xl bg-coral px-5 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(226,116,88,0.35)] transition active:scale-95"
        >
          I need a little comfort
        </button>
      </div>
    </Sheet>
  );
}
