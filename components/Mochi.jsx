"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { MOCHI_IDLE_LINES, MOCHI_TAP_LINES } from "@/data/mochiLines";

/**
 * Mochi is alive: a gentle idle bob, blinking, random idle speech bubbles,
 * and a little jump + reaction line whenever it's tapped/petted.
 */
export default function Mochi({ onPet, externalLine }) {
  const controls = useAnimationControls();
  const [bubble, setBubble] = useState(null);
  const bubbleTimer = useRef(null);
  const idleTimer = useRef(null);

  const say = (text, duration = 2200) => {
    setBubble(text);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), duration);
  };

  useEffect(() => {
    function scheduleIdleLine() {
      idleTimer.current = setTimeout(() => {
        say(MOCHI_IDLE_LINES[Math.floor(Math.random() * MOCHI_IDLE_LINES.length)]);
        scheduleIdleLine();
      }, 9000 + Math.random() * 8000);
    }
    scheduleIdleLine();
    return () => clearTimeout(idleTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (externalLine) say(externalLine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalLine]);

  const jump = async () => {
    await controls.start({
      y: [0, -32, -32, 0],
      scaleY: [1, 0.95, 0.95, 1],
      transition: { duration: 0.55, times: [0, 0.4, 0.6, 1] },
    });
  };

  const handleTap = () => {
    jump();
    say(MOCHI_TAP_LINES[Math.floor(Math.random() * MOCHI_TAP_LINES.length)]);
    onPet?.();
  };

  return (
    <div className="relative flex h-[170px] items-end justify-center">
      <motion.button
        aria-label="Pet Mochi"
        onClick={handleTap}
        className="relative h-20 w-24 cursor-pointer border-none bg-transparent p-0"
        animate={controls}
        style={{ y: 0 }}
      >
        {/* idle bob, layered under the tap-jump controls */}
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <AnimatePresence>
            {bubble && (
              <motion.div
                className="bubble-tail absolute -top-10 left-1/2 whitespace-nowrap rounded-2xl bg-white px-3.5 py-1.5 text-xs text-ink shadow-soft"
                initial={{ opacity: 0, scale: 0.5, y: 4, x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, scale: 0.5, x: "-50%" }}
                transition={{ type: "spring", damping: 18, stiffness: 300 }}
              >
                {bubble}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ears */}
          <div className="absolute -top-2.5 left-2 h-[26px] w-[22px] -rotate-[18deg] rounded-t-full bg-coral" />
          <div className="absolute -top-2.5 right-2 h-[26px] w-[22px] rotate-[18deg] rounded-t-full bg-coral" />

          {/* body */}
          <div
            className="absolute bottom-0 left-0 h-[70px] w-24 rounded-[52%_52%_46%_46%/60%_60%_40%_40%] shadow-[0_10px_18px_rgba(226,116,88,0.35),inset_0_-8px_14px_rgba(180,80,60,0.18)]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #fff6ea, #F2947D 75%)",
            }}
          />

          {/* face */}
          <div className="absolute left-0 top-6 flex w-full justify-center gap-5">
            <motion.span
              className="h-2.5 w-[7px] rounded-full bg-ink"
              animate={{ scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
            />
            <motion.span
              className="h-2.5 w-[7px] rounded-full bg-ink"
              animate={{ scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
            />
          </div>
          <div className="absolute left-3.5 top-9 h-1.5 w-2.5 rounded-full bg-white/60" />
          <div className="absolute right-3.5 top-9 h-1.5 w-2.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.button>
    </div>
  );
}
