"use client";

import Sheet from "@/components/sheets/Sheet";
import { formatFriendlyDate } from "@/lib/time";

export default function JournalSheet({ isOpen, onClose, journal }) {
  const entries = [...journal].reverse();

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Adventure Journal"
      subtitle="Written for you automatically, one page per day."
    >
      {entries.length === 0 ? (
        <p className="text-sm text-ink-soft dark:text-cream/60">
          Your journal will fill in as you complete days.
        </p>
      ) : (
        <div>
          {entries.map((entry) => (
            <div
              key={`${entry.dateKey}-${entry.day}`}
              className="mb-2.5 rounded-2xl bg-white p-4 shadow-card dark:bg-[#2b2b3a]"
            >
              <div className="mb-1 text-xs font-bold tracking-wide text-coral-deep">
                Day {entry.day} — {formatFriendlyDate(entry.dateKey)}
              </div>
              <div className="text-sm leading-relaxed">Today {entry.line}</div>
            </div>
          ))}
        </div>
      )}
    </Sheet>
  );
}
