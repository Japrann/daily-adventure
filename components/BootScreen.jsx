"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_STEPS = [
  "Waking up Mochi...",
  "Looking for Cila...",
  "Looking for Zoro...",
  "Preparing today's quests...",
  "Checking today's weather...",
  "Packing today's surprises...",
];

const listVariants = {
  visible: { transition: { staggerChildren: 0.22, delayChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BootScreen({ visible, onDone }) {
  useEffect(() => {
    if (!visible) return;
    const totalDelay = 500 + BOOT_STEPS.length * 220 + 700;
    const id = setTimeout(onDone, totalDelay);
    return () => clearTimeout(id);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-night via-[#4a3f6b] to-[#6b5a8f] text-cream"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="font-display text-3xl font-semibold tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Daily Adventure
          </motion.h1>
          <motion.p
            className="mb-9 mt-1.5 text-sm text-cream/75"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Loading today's little adventure...
          </motion.p>
          <motion.ul
            className="w-[280px] text-sm"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {BOOT_STEPS.map((step) => (
              <motion.li
                key={step}
                variants={itemVariants}
                className="mb-2.5 flex items-center gap-2.5"
              >
                <span className="w-4 text-center text-gold">✓</span>
                <span>{step}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
