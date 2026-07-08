"use client";

import Sheet from "@/components/sheets/Sheet";
import { getWishTreeStage } from "@/data/wishTree";

export default function WishTreeSheet({ isOpen, onClose, streak }) {
  const stage = getWishTreeStage(streak);

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Wish Tree"
      subtitle={`${streak} day streak — grows a little with every day.`}
    >
      <div className="my-5 text-center text-7xl">{stage.emoji}</div>
      <p className="text-center text-sm text-ink-soft dark:text-cream/60">{stage.description}</p>
    </Sheet>
  );
}
