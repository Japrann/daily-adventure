// Wish Tree grows with Adventure Streak length.
// Sorted descending so the first matching threshold wins.
export const WISH_TREE_STAGES = [
  {
    minStreak: 100,
    emoji: "🌳✨",
    label: "Legendary Bloom",
    description: "A large glowing tree, full of birds and lanterns.",
  },
  {
    minStreak: 50,
    emoji: "🌳🐦",
    label: "Nesting Branches",
    description: "Birds have started building nests in the branches.",
  },
  {
    minStreak: 30,
    emoji: "🌳🏮",
    label: "Lantern Light",
    description: "Lanterns now hang from its branches, glowing at night.",
  },
  {
    minStreak: 7,
    emoji: "🌳",
    label: "Growing Branches",
    description: "More branches have grown — it's starting to look like a real tree.",
  },
  {
    minStreak: 3,
    emoji: "🌿",
    label: "First Leaves",
    description: "Small leaves have started to unfurl.",
  },
  {
    minStreak: 0,
    emoji: "🌱",
    label: "Seedling",
    description: "A tiny seedling, just getting started.",
  },
];

export function getWishTreeStage(streak) {
  return (
    WISH_TREE_STAGES.find((stage) => streak >= stage.minStreak) ||
    WISH_TREE_STAGES[WISH_TREE_STAGES.length - 1]
  );
}
