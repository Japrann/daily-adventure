"use client";

import { useEffect, useRef, useState } from "react";
import { useDailyAdventure } from "@/hooks/useDailyAdventure";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { getDateKey } from "@/lib/time";

import BootScreen from "@/components/BootScreen";
import SkyBackground from "@/components/SkyBackground";
import Mochi from "@/components/Mochi";
import StatsBar from "@/components/StatsBar";
import Dashboard from "@/components/Dashboard";
import Toast from "@/components/Toast";
import Confetti from "@/components/Confetti";
import CelebrationScreen from "@/components/CelebrationScreen";

import QuestsSheet from "@/components/sheets/QuestsSheet";
import GardenSheet, { flowerMemoryLabel } from "@/components/sheets/GardenSheet";
import WishTreeSheet from "@/components/sheets/WishTreeSheet";
import GiftSheet from "@/components/sheets/GiftSheet";
import FortuneSheet from "@/components/sheets/FortuneSheet";
import JournalSheet from "@/components/sheets/JournalSheet";
import ComfortSheet from "@/components/sheets/ComfortSheet";
import SettingsSheet from "@/components/sheets/SettingsSheet";

import { GREETINGS } from "@/data/weather";
import { MOCHI_QUEST_LINES, MOCHI_NEW_DAY_LINE } from "@/data/mochiLines";
import { XP_PER_LEVEL, XP_PER_QUEST } from "@/lib/xp";

const isDev = process.env.NODE_ENV !== "production";

export default function DailyAdventureApp() {
  const { state, isReady, actions } = useDailyAdventure();
  const { period, weather } = useTimeOfDay();

  const [booting, setBooting] = useState(true);
  const [activeSheet, setActiveSheet] = useState(null);
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [mochiLine, setMochiLine] = useState(null);

  const toastRef = useRef(null);
  const confettiRef = useRef(null);

  // Reflect dark mode on the root element so Tailwind's `dark:` variants apply.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", !!state.darkMode);
  }, [state.darkMode]);

  // Gentle welcome-back toast (never a punishment) after a missed day.
  useEffect(() => {
    if (isReady && state.welcomeBackMessage) {
      toastRef.current?.show(state.welcomeBackMessage, 3200);
      actions.clearWelcomeBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, state.welcomeBackMessage]);

  const handleToggleQuest = (id) => {
    const quest = state.quests.find((q) => q.id === id);
    if (!quest) return;

    const willComplete = !quest.done;
    const today = getDateKey();
    const otherQuestsDone = state.quests
      .filter((q) => q.id !== id)
      .every((q) => q.done);
    const willFinishAdventure =
      willComplete && otherQuestsDone && state.adventureCompletedDateKey !== today;
    const willLevelUp = willComplete && state.xp + XP_PER_QUEST >= XP_PER_LEVEL;

    actions.toggleQuest(id);

    if (willComplete) {
      confettiRef.current?.burst(willFinishAdventure ? 40 : 24);
      setMochiLine(MOCHI_QUEST_LINES[Math.floor(Math.random() * MOCHI_QUEST_LINES.length)]);
    }
    if (willLevelUp) {
      toastRef.current?.show(`✨ Level up! You're now level ${state.level + 1}`, 2600);
    }
    if (willFinishAdventure) {
      setTimeout(() => setCelebrationOpen(true), 600);
    }
  };

  const handlePet = () => {
    actions.petMochi();
  };

  const handleSimulateNextDay = () => {
    actions.simulateNextDay();
    setCelebrationOpen(false);
    setMochiLine(MOCHI_NEW_DAY_LINE);
    toastRef.current?.show(`🌅 Day ${state.totalDays + 1} — welcome back!`, 2600);
  };

  const today = getDateKey();
  const alreadyOpenedGift = state.giftOpenedDateKey === today ? state.lastGift : null;
  const questsRemaining = state.quests.filter((q) => !q.done).length;

  if (!isReady) {
    // Extremely brief window before localStorage hydration resolves.
    return <div className="h-screen bg-cream dark:bg-night" />;
  }

  return (
    <div className="relative mx-auto h-screen max-w-[520px] overflow-hidden bg-cream dark:bg-night">
      <SkyBackground period={period} weatherKey={weather.key} />

      <div className="relative z-[1] h-full overflow-y-auto px-[18px] pb-24 pt-5">
        <div className="mt-1.5 flex items-start justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold leading-tight">
              {GREETINGS[period]}
            </h1>
            <p className="mt-1 text-sm text-ink-soft dark:text-cream/60">
              A tiny adventure made just for today.
            </p>
          </div>
          <div className="glass whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs shadow-soft">
            {weather.label}
          </div>
        </div>

        <StatsBar level={state.level} xp={state.xp} coins={state.coins} streak={state.streak} />

        <Mochi onPet={handlePet} externalLine={mochiLine} />

        <Dashboard onOpen={setActiveSheet} questsRemaining={questsRemaining} />
      </div>

      <QuestsSheet
        isOpen={activeSheet === "quests"}
        onClose={() => setActiveSheet(null)}
        quests={state.quests}
        onToggle={handleToggleQuest}
      />
      <GardenSheet
        isOpen={activeSheet === "garden"}
        onClose={() => setActiveSheet(null)}
        garden={state.garden}
        onFlowerClick={(flower) => toastRef.current?.show(flowerMemoryLabel(flower))}
      />
      <WishTreeSheet
        isOpen={activeSheet === "wishtree"}
        onClose={() => setActiveSheet(null)}
        streak={state.streak}
      />
      <GiftSheet
        isOpen={activeSheet === "gift"}
        onClose={() => setActiveSheet(null)}
        onOpenGift={actions.openDailyGift}
        alreadyOpenedGift={alreadyOpenedGift}
      />
      <FortuneSheet isOpen={activeSheet === "fortune"} onClose={() => setActiveSheet(null)} />
      <JournalSheet
        isOpen={activeSheet === "journal"}
        onClose={() => setActiveSheet(null)}
        journal={state.journal}
      />
      <ComfortSheet isOpen={activeSheet === "comfort"} onClose={() => setActiveSheet(null)} />
      <SettingsSheet
        isOpen={activeSheet === "settings"}
        onClose={() => setActiveSheet(null)}
        darkMode={state.darkMode}
        soundOn={state.soundOn}
        onToggleDark={actions.toggleDarkMode}
        onToggleSound={actions.toggleSound}
        onSimulateNextDay={handleSimulateNextDay}
        onReset={actions.resetWorld}
        isDev={isDev}
      />

      <CelebrationScreen isOpen={celebrationOpen} onClose={() => setCelebrationOpen(false)} />
      <BootScreen visible={booting} onDone={() => setBooting(false)} />

      <Toast ref={toastRef} />
      <Confetti ref={confettiRef} />
    </div>
  );
}
