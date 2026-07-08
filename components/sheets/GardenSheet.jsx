"use client";

import { motion } from "framer-motion";
import Sheet from "@/components/sheets/Sheet";
import { formatFriendlyDate } from "@/lib/time";

export default function GardenSheet({ isOpen, onClose, garden, onFlowerClick }) {
  const totalSlots = Math.max(18, garden.length + 6);
  const slots = Array.from({ length: totalSlots }, (_, i) => garden[i] || null);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Garden of Memories"
      subtitle="Every completed day blooms one flower, forever."
    >
      <div className="min-h-[220px] rounded-[20px] bg-gradient-to-b from-[#dff0e0] to-[#c9e6cc] p-4">
        <div className="grid grid-cols-6 gap-2.5">
          {slots.map((flower, i) =>
            flower ? (
              <motion.button
                key={i}
                onClick={() => onFlowerClick(flower)}
                whileTap={{ scale: 1.3 }}
                className="text-2xl drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)]"
              >
                {flower.type}
              </motion.button>
            ) : (
              <div key={i} className="text-center text-2xl text-black/20">
                &middot;
              </div>
            )
          )}
        </div>
      </div>
      {garden.length === 0 && (
        <p className="mt-4 text-sm text-ink-soft dark:text-cream/60">
          Complete today&rsquo;s adventure to bloom your first flower.
        </p>
      )}
    </Sheet>
  );
}

export function flowerMemoryLabel(flower) {
  return `Day ${flower.day} — ${formatFriendlyDate(flower.dateKey)}`;
}
