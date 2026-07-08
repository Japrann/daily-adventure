// Shown when a visitor returns after missing one or more days.
// Never punishing — always a gentle welcome.
export const WELCOME_BACK_MESSAGES = [
  "We missed you.",
  "Today's adventure is waiting.",
  "Welcome back.",
  "Good to see you again.",
  "The garden kept growing quietly while you were away.",
  "No time lost — just a new day, ready when you are.",
];

export function pickWelcomeBack(rand = Math.random) {
  return WELCOME_BACK_MESSAGES[Math.floor(rand() * WELCOME_BACK_MESSAGES.length)];
}
