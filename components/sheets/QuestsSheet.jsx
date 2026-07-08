"use client";

import { motion } from "framer-motion";
import Sheet from "@/components/sheets/Sheet";

export default function QuestsSheet({ isOpen, onClose, quests, onToggle }) {
  const doneCount = quests.filter((q) => q.done).length;
  const subtitle =
    doneCount === quests.length && quests.length > 0
      ? "All done — today's adventure is complete! 🎉"
      : `${doneCount} of ${quests.length} complete today.`;

  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Today's Adventure" subtitle={subtitle}>
      <div>
        {quests.map((q) => (
          <motion.div
            key={q.id}
            layout
            className={`mb-2.5 flex items-center gap-3 rounded-2xl p-3.5 shadow-card ${
              q.done ? "bg-gradient-to-r from-[#F3EFE3] to-[#eef7ee]" : "bg-white dark:bg-[#2b2b3a]"
            }`}
          >
            <button
              onClick={() => onToggle(q.id)}
              aria-label={q.done ? "Mark quest as not done" : "Mark quest as done"}
              className={`flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full border-2 text-xs transition-colors ${
                q.done ? "border-sage bg-sage text-white" : "border-sage"
              }`}
            >
              {q.done ? "✓" : ""}
            </button>
            <div>
              <div className={`text-sm ${q.done ? "text-ink-soft line-through" : ""}`}>{q.text}</div>
              <div className="text-xs text-ink-soft dark:text-cream/50">{q.cat}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Sheet>
  );
}
