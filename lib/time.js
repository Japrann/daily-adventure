// Time-of-day + date helpers used to drive the dynamic home screen
// and the day/streak logic in useDailyAdventure.

/** Returns 'morning' | 'afternoon' | 'evening' | 'night' based on local hour. */
export function getPeriod(date = new Date()) {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 20) return "evening";
  return "night";
}

/** Returns a stable 'YYYY-MM-DD' key for the given date, in local time. */
export function getDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Human-friendly date, e.g. "July 8". */
export function formatFriendlyDate(dateKeyOrDate) {
  const date =
    dateKeyOrDate instanceof Date ? dateKeyOrDate : new Date(`${dateKeyOrDate}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

/** Number of calendar days between two 'YYYY-MM-DD' keys (b - a). */
export function daysBetween(dateKeyA, dateKeyB) {
  const a = new Date(`${dateKeyA}T00:00:00`);
  const b = new Date(`${dateKeyB}T00:00:00`);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b - a) / msPerDay);
}
