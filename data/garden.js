export const FLOWER_TYPES = ["🌷", "🌼", "🌸", "🌻", "🪷", "🌺"];

export function randomFlower(rand = Math.random) {
  return FLOWER_TYPES[Math.floor(rand() * FLOWER_TYPES.length)];
}
