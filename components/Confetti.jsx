"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COLORS = ["#F2947D", "#7FA986", "#E8B75A", "#C9B6E4", "#A8D8EA"];
let pieceId = 0;

const Confetti = forwardRef(function Confetti(_props, ref) {
  const [pieces, setPieces] = useState([]);

  useImperativeHandle(ref, () => ({
    burst(count = 24) {
      const newPieces = Array.from({ length: count }, () => ({
        id: pieceId++,
        left: 45 + Math.random() * 10,
        size: 5 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: 1.2 + Math.random() * 0.8,
        rotate: 360 + Math.random() * 360,
      }));
      setPieces((prev) => [...prev, ...newPieces]);
      setTimeout(() => {
        setPieces((prev) => prev.filter((p) => !newPieces.some((n) => n.id === p.id)));
      }, 2200);
    },
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        {pieces.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-[-10px] rounded-sm"
            style={{ left: `${p.left}%`, width: p.size, height: p.size, background: p.color }}
            initial={{ y: 0, rotate: 0, opacity: 1 }}
            animate={{ y: 520, rotate: p.rotate, opacity: 0 }}
            transition={{ duration: p.duration, ease: "easeIn" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

export default Confetti;
