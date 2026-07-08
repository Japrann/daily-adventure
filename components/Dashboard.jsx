"use client";

import DashboardCard from "@/components/DashboardCard";

const PRIMARY_CARDS = [
  { key: "quests", icon: "🗺️", title: "Today's Adventure", description: "5 tiny quests picked just for today" },
  { key: "garden", icon: "🌷", title: "Garden of Memories", description: "Every finished day blooms a flower" },
  { key: "gift", icon: "🎁", title: "Daily Gift", description: "One little surprise, once a day" },
  { key: "fortune", icon: "🥠", title: "Fortune Cookie", description: "A small thought to carry with you" },
  { key: "journal", icon: "📔", title: "Adventure Journal", description: "Your days, written for you" },
  { key: "comfort", icon: "🫖", title: "Comfort Corner", description: "A little warmth, whenever you need it" },
];

const SECONDARY_CARDS = [
  { key: "wishtree", icon: "🌳", title: "Wish Tree", description: "Grows with your streak" },
  { key: "settings", icon: "⚙️", title: "Settings", description: "Theme, sound, and quiet things" },
];

export default function Dashboard({ onOpen, questsRemaining }) {
  return (
    <>
      <div className="mb-2.5 mt-6 text-[0.7rem] font-bold uppercase tracking-widest text-ink-soft dark:text-cream/50">
        Today&rsquo;s World
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PRIMARY_CARDS.map((card) => (
          <DashboardCard
            key={card.key}
            icon={card.icon}
            title={card.title}
            description={card.description}
            badge={card.key === "quests" ? questsRemaining : null}
            onClick={() => onOpen(card.key)}
          />
        ))}
      </div>

      <div className="mb-2.5 mt-6 text-[0.7rem] font-bold uppercase tracking-widest text-ink-soft dark:text-cream/50">
        More of the World
      </div>
      <div className="grid grid-cols-2 gap-3">
        {SECONDARY_CARDS.map((card) => (
          <DashboardCard
            key={card.key}
            icon={card.icon}
            title={card.title}
            description={card.description}
            onClick={() => onOpen(card.key)}
          />
        ))}
      </div>
    </>
  );
}
