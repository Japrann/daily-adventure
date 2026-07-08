"use client";

import { AnimatePresence, motion } from "framer-motion";

/**
 * Reusable bottom sheet used by every feature panel (Quests, Garden,
 * Journal, etc). Handles its own backdrop + slide-up animation and mount
 * lifecycle via AnimatePresence.
 */
export default function Sheet({ isOpen, onClose, title, subtitle, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-night/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="fixed left-1/2 bottom-0 z-50 w-full max-w-[520px] -translate-x-1/2 rounded-t-xl2 bg-cream px-5 pb-9 pt-3 shadow-soft dark:bg-night max-h-[86vh] overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
          >
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-ink/15 dark:bg-cream/20" />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-4 text-ink-soft transition hover:text-ink dark:text-cream/60 dark:hover:text-cream"
            >
              ✕
            </button>
            {title && (
              <h2 className="font-display text-2xl font-semibold leading-tight">{title}</h2>
            )}
            {subtitle && (
              <p className="mb-4 mt-1 text-sm text-ink-soft dark:text-cream/60">{subtitle}</p>
            )}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
