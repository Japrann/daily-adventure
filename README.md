# Daily Adventure 🌱

A cozy, mobile-first world that grows a little more every day you visit —
built with Next.js (App Router), Tailwind CSS, Framer Motion, and
`localStorage` persistence.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Everything you do —
quests completed, flowers bloomed, streak, XP, coins, journal entries — is
saved to your browser's `localStorage` and will still be there next time you
open the app, on this device.

To deploy: push this repo to GitHub and import it in
[Vercel](https://vercel.com/new) — no configuration needed, it's a standard
Next.js app.

## Project structure

```
app/
  layout.js          Root layout, fonts (Fraunces / Nunito / JetBrains Mono)
  page.js             Client-only entry point (dynamic import, no SSR)
  globals.css         Tailwind directives + a couple of shared utilities

components/
  DailyAdventureApp.jsx   Main orchestrator: wires state, sky, Mochi, sheets
  BootScreen.jsx          Boot / loading sequence
  SkyBackground.jsx       Time-of-day gradient + animated weather effects
  Mochi.jsx               The mascot: idle animation, speech bubbles, taps
  StatsBar.jsx            Level / XP bar, coins, streak
  Dashboard.jsx           Grid of feature cards
  DashboardCard.jsx       Single animated card
  Toast.jsx               Imperative toast notifications
  Confetti.jsx            Imperative confetti burst
  CelebrationScreen.jsx   "Adventure Complete" full-screen moment
  sheets/
    Sheet.jsx             Shared bottom-sheet shell (used by all panels below)
    QuestsSheet.jsx        Today's Adventure (5 daily quests)
    GardenSheet.jsx         Garden of Memories
    WishTreeSheet.jsx       Wish Tree (grows with streak)
    GiftSheet.jsx           Daily Gift
    FortuneSheet.jsx        Fortune Cookie
    JournalSheet.jsx        Adventure Journal
    ComfortSheet.jsx        Comfort Corner
    SettingsSheet.jsx       Dark mode / sound / dev tools

data/
  quests.js            ~50-quest pool across 6 categories + daily picker
  fortunes.js, comforts.js, gifts.js, journalLines.js, mochiLines.js
  weather.js            Weighted weather options + sky gradients
  garden.js             Flower types
  wishTree.js            Streak → tree growth stages
  welcomeBack.js         Gentle re-entry messages after a missed day

hooks/
  useLocalStorage.js     Generic localStorage-backed state hook
  useDailyAdventure.js   Core game logic: XP, streak, garden, journal, gifts
  useTimeOfDay.js         Time-of-day period + per-visit weather

lib/
  storage.js             Safe localStorage read/write helpers
  time.js                 Date/period helpers (SSR-safe)
  xp.js                   XP → level math

public/
  (static assets go here — currently empty; add icons/og-image as needed)
```

## What's implemented

- Boot sequence, dynamic greeting + sky/weather by time of day
- Today's Adventure: 5 daily quests drawn from a curated pool, with
  XP/coin rewards, confetti, and an "Adventure Complete" celebration
- XP/level, coins, and a never-punishing Adventure Streak
- Mochi: idle animation, blinking, random speech, tap-to-pet
- Garden of Memories (one flower per completed day) and a Wish Tree that
  grows with streak length
- Daily Gift, Fortune Cookie, Comfort Corner, and an auto-written
  Adventure Journal
- Dark mode + a sound toggle (no audio files are bundled — wire up your own
  ambient track in `Settings` if you'd like real audio)
- Full `localStorage` persistence, keyed under `daily-adventure:v1`

## Scoped down / intentionally simplified

This is a substantial feature set, but a few things from a larger spec were
deliberately trimmed so the core loop stays polished rather than shallow
everywhere. These are natural next additions:

- **Sticker Album & Achievements** — not yet implemented; `petCount` and
  `totalDays` are already tracked in state, so achievement conditions can be
  layered on top without changing the data model.
- **Time Capsule** — not implemented.
- **Full seasonal reskinning** (Halloween, Christmas, Ramadan, etc.) — the
  weather/sky system is the natural place to hook in seasonal palettes and
  decorations.
- **Living world random events** (butterflies, Cila/Zoro cameos) — Mochi's
  speech-bubble system and `SkyBackground`'s weather-effect layer are built
  to make this easy to extend.
- Quest pool is ~50 entries, not 100+ — extend `data/quests.js` freely.

## Dev tools

In non-production builds (`npm run dev`), the Settings sheet includes a
"Simulate next day" button and a "Reset world" button, so you can see streak,
garden growth, and the Wish Tree evolve without waiting for real days to
pass. These are hidden automatically in production builds.
