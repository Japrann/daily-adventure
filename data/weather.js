// Weather is purely visual — it never represents mood.
// Weighted so common weather appears often and rare weather feels special.
export const WEATHER_OPTIONS = [
  { key: "sunny", label: "☀️ Sunny", weight: 0.22 },
  { key: "cloudy", label: "☁️ Cloudy", weight: 0.18 },
  { key: "rain", label: "🌦️ Light Rain", weight: 0.14 },
  { key: "blossoms", label: "🌸 Cherry Blossoms", weight: 0.13 },
  { key: "fireflies", label: "✨ Fireflies", weight: 0.12 },
  { key: "golden", label: "🌇 Golden Hour", weight: 0.11 },
  { key: "aurora", label: "🌌 Aurora", weight: 0.06 },
  { key: "meteor", label: "☄️ Meteor Shower", weight: 0.04 },
];

export function pickWeather(rand = Math.random) {
  const r = rand();
  let acc = 0;
  for (const option of WEATHER_OPTIONS) {
    acc += option.weight;
    if (r <= acc) return option;
  }
  return WEATHER_OPTIONS[0];
}

// Sky gradients per time-of-day period, used as inline background styles
// (kept out of Tailwind so they can crossfade smoothly with Framer Motion).
export const SKY_GRADIENTS = {
  morning: "linear-gradient(180deg, #FFD9B3 0%, #A8D8EA 100%)",
  afternoon: "linear-gradient(180deg, #A8D8EA 0%, #E0F2F7 100%)",
  evening: "linear-gradient(180deg, #F2947D 0%, #C9967D 70%, #8B6A8F 100%)",
  night: "linear-gradient(180deg, #1B1A2E 0%, #2E2A4A 60%, #3D3861 100%)",
};

export const GREETINGS = {
  morning: "Good Morning ☀️",
  afternoon: "Good Afternoon 🌤",
  evening: "Good Evening 🌇",
  night: "Good Night 🌙",
};
