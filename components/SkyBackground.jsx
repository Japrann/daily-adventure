"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKY_GRADIENTS } from "@/data/weather";

function useRandomPositions(count, seedKey) {
  return useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 60,
        delay: Math.random() * 3,
        size: Math.random() * 2 + 1,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seedKey]
  );
}

export default function SkyBackground({ period, weatherKey }) {
  const showStars = period === "night" || weatherKey === "aurora";
  const stars = useRandomPositions(showStars ? 28 : 0, `${period}-${weatherKey}-stars`);
  const petals = useRandomPositions(weatherKey === "blossoms" ? 14 : 0, "petals");
  const fireflies = useRandomPositions(weatherKey === "fireflies" ? 10 : 0, "fireflies");
  const showClouds = period === "afternoon" && weatherKey === "cloudy";

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={period}
          className="absolute inset-0"
          style={{ background: SKY_GRADIENTS[period] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {showStars &&
        stars.map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          />
        ))}

      {showClouds &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute text-4xl opacity-80"
            style={{ top: `${10 + i * 12}%` }}
            initial={{ x: "-15%" }}
            animate={{ x: "115%" }}
            transition={{ duration: 22 + i * 6, repeat: Infinity, ease: "linear", delay: -i * 6 }}
          >
            ☁️
          </motion.div>
        ))}

      {weatherKey === "blossoms" &&
        petals.map((p, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute text-sm"
            style={{ left: `${p.left}%` }}
            initial={{ y: -20, opacity: 0, rotate: 0 }}
            animate={{ y: 700, opacity: [0, 1, 1, 0], rotate: 300 }}
            transition={{ duration: 6 + p.delay, repeat: Infinity, ease: "linear", delay: p.delay }}
          >
            🌸
          </motion.div>
        ))}

      {weatherKey === "fireflies" &&
        fireflies.map((f, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute text-xs"
            style={{ left: `${f.left}%`, top: `${40 + f.top}%` }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -14, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
          >
            ✨
          </motion.div>
        ))}

      {weatherKey === "meteor" && (
        <motion.div
          className="absolute text-2xl"
          style={{ top: "15%", left: "-5%" }}
          animate={{ x: "130vw", y: "40vh" }}
          transition={{ duration: 2.6, ease: "linear" }}
        >
          ☄️
        </motion.div>
      )}
    </div>
  );
}
