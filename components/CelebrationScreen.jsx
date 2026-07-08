"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function CelebrationScreen({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-gradient-to-b from-night via-[#5c4a7a] to-[#7d6a9e] px-8 text-center text-cream"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-semibold">Adventure Complete 🌙</h2>
            <p className="mx-auto mt-2.5 max-w-[280px] text-sm text-cream/80">
              Thank you for spending a little time here today. See you tomorrow.
            </p>
            <button
              onClick={onClose}
              className="mt-7 rounded-2xl bg-white/10 px-5 py-2.5 text-sm font-bold text-cream backdrop-blur-sm transition hover:bg-white/20"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
