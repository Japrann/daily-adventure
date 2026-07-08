// Quest pool for "Today's Adventure".
// Each day, 5 quests are drawn at random from this pool.
// Scoped to ~50 hand-written quests across all 6 categories; extend freely.

export const QUEST_CATEGORIES = {
  SELF_CARE: "🌸 Self Care",
  TINY_WINS: "✨ Tiny Wins",
  CAT_MISSIONS: "🐱 Cat Missions",
  CHILL_TIME: "🎵 Chill Time",
  EXPLORE: "🌿 Explore",
  RANDOM_FUN: "🎈 Random Fun",
};

export const QUEST_POOL = [
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Drink a glass of water" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Stretch for 30 seconds" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Take three deep breaths" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Wash your face" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Sit up straight for a moment" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Eat your favorite snack" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Roll your shoulders back" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Moisturize your hands" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Unclench your jaw" },
  { cat: QUEST_CATEGORIES.SELF_CARE, text: "Refill your water for later" },

  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Make your bed" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Clean one small thing" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Organize your desk" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Reply to one message you've been avoiding" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Put one thing back where it belongs" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Write down one thing you finished today" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Recycle or toss one piece of clutter" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Set out tomorrow's first task" },
  { cat: QUEST_CATEGORIES.TINY_WINS, text: "Wipe down one surface" },

  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Pet Cila" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Find Zoro" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Give Mochi a little hello" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Say good morning to Mochi" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Look for Cila hiding somewhere" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Leave a treat out for Zoro" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Draw a tiny picture of Cila" },
  { cat: QUEST_CATEGORIES.CAT_MISSIONS, text: "Whisper hello to Mochi" },

  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Listen to one favorite song" },
  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Hum a tune for ten seconds" },
  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Sit quietly for one minute" },
  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Watch today's sky for a moment" },
  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Close your eyes and listen to the room" },
  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Play one calming sound" },
  { cat: QUEST_CATEGORIES.CHILL_TIME, text: "Hum along to something nostalgic" },

  { cat: QUEST_CATEGORIES.EXPLORE, text: "Look outside" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Walk for one minute" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Open a window for fresh air" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Notice one new thing nearby" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Step outside, even briefly" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Find a patch of sunlight" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Water a plant, real or imagined" },
  { cat: QUEST_CATEGORIES.EXPLORE, text: "Notice the temperature of the air" },

  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Smile, just because" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Do a tiny stretch-dance" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Tell yourself one nice thing" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Doodle something small" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Give yourself a high five" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Make a silly face at nobody" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Wiggle your fingers and toes" },
  { cat: QUEST_CATEGORIES.RANDOM_FUN, text: "Think of your favorite color right now" },
];

/**
 * Deterministically-random pick of `count` unique quests from the pool,
 * seeded by a date string so everyone gets the "same" quests for a given day
 * if generated twice (e.g. across a refresh before persistence kicks in).
 */
export function pickDailyQuests(seed, count = 5) {
  const pool = [...QUEST_POOL];
  const rand = mulberry32(hashString(seed));
  const picked = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(rand() * pool.length);
    const [item] = pool.splice(idx, 1);
    picked.push({ ...item, id: `${seed}-${i}`, done: false });
  }
  return picked;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash >>> 0;
}

// Small deterministic PRNG so daily quests stay stable per seed.
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
