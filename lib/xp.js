export const XP_PER_LEVEL = 100;
export const XP_PER_QUEST = 14;

/**
 * Applies an XP delta, rolling over into level-ups (or level-downs, used
 * only when un-completing a quest by mistake). Returns a new { xp, level }.
 */
export function applyXpDelta(current, delta) {
  let { xp, level } = current;
  xp += delta;

  while (xp >= XP_PER_LEVEL) {
    xp -= XP_PER_LEVEL;
    level += 1;
  }
  while (xp < 0 && level > 1) {
    level -= 1;
    xp += XP_PER_LEVEL;
  }
  if (xp < 0) xp = 0;

  return { xp, level };
}

export function xpProgressPercent(xp) {
  return Math.max(0, Math.min(100, (xp / XP_PER_LEVEL) * 100));
}
