"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Toast = forwardRef(function Toast(_props, ref) {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show(text, duration = 2200) {
      setMessage(text);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMessage(null), duration);
    },
  }));

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-[60] -translate-x-1/2">
      <AnimatePresence>
        {message && (
          <motion.div
            className="rounded-2xl bg-ink px-[18px] py-2.5 text-sm text-white shadow-soft"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: "spring", damping: 20, stiffness: 260 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Toast;
