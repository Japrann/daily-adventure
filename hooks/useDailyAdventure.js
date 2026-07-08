"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEY } from "@/lib/storage";
import { getDateKey, daysBetween } from "@/lib/time";
import { pickDailyQuests } from "@/data/quests";
import { applyXpDelta, XP_PER_QUEST } from "@/lib/xp";
import { randomFlower } from "@/data/garden";
import { JOURNAL_LINES } from "@/data/journalLines";
import { pickWelcomeBack } from "@/data/welcomeBack";
import { GIFTS } from "@/data/gifts";

const COINS_PER_QUEST = 3;
const COINS_PER_PET = 1;
const COINS_PER_GIFT = 5;
const QUESTS_PER_DAY = 5;

const initialState = {
  xp: 0,
  level: 1,
  coins: 0,
  streak: 0,
  totalDays: 0,
  lastVisitDateKey: null,
  quests: [],
  questsDateKey: null,
  adventureCompletedDateKey: null,
  garden: [],
  journal: [],
  petCount: 0,
  darkMode: false,
  soundOn: false,
  welcomeBackMessage: null,
  giftOpenedDateKey: null,
  lastGift: null,
};

/**
 * Central state + game-logic engine for Daily Adventure.
 * Everything is persisted to localStorage under a single key so related
 * fields (xp, quests, garden, journal, ...) always stay in sync together.
 */
export function useDailyAdventure() {
  const [state, setState, isHydrated] = useLocalStorage(STORAGE_KEY, initialState);
  const hasRunDayCheck = useRef(false);

  // Run the "new day" roll-forward exactly once, right after hydration.
  useEffect(() => {
    if (!isHydrated || hasRunDayCheck.current) return;
    hasRunDayCheck.current = true;

    const today = getDateKey();

    setState((prev) => {
      // Same calendar day as last visit (e.g. a refresh) — nothing to roll.
      if (prev.lastVisitDateKey === today && prev.quests.length > 0) {
        return prev;
      }

      const isFirstEverVisit = prev.lastVisitDateKey === null;
      let nextStreak = 1;
      let welcomeBackMessage = null;

      if (!isFirstEverVisit) {
        const diff = daysBetween(prev.lastVisitDateKey, today);
        if (diff === 1) {
          nextStreak = prev.streak + 1;
        } else if (diff <= 0) {
          // Same day or clock skew — keep streak as-is.
          nextStreak = prev.streak || 1;
        } else {
          // Missed one or more days — never punish, just welcome back.
          nextStreak = 1;
          welcomeBackMessage = pickWelcomeBack();
        }
      }

      return {
        ...prev,
        lastVisitDateKey: today,
        streak: nextStreak,
        totalDays: prev.totalDays + 1,
        quests: pickDailyQuests(today, QUESTS_PER_DAY),
        questsDateKey: today,
        welcomeBackMessage,
      };
    });
  }, [isHydrated, setState]);

  const clearWelcomeBack = useCallback(() => {
    setState((prev) => ({ ...prev, welcomeBackMessage: null }));
  }, [setState]);

  const toggleQuest = useCallback(
    (questId) => {
      setState((prev) => {
        const quests = prev.quests.map((q) =>
          q.id === questId ? { ...q, done: !q.done } : q
        );
        const targetQuest = prev.quests.find((q) => q.id === questId);
        const justCompleted = targetQuest ? !targetQuest.done : false;

        const delta = justCompleted ? XP_PER_QUEST : -XP_PER_QUEST;
        const coinDelta = justCompleted ? COINS_PER_QUEST : -COINS_PER_QUEST;
        const { xp, level } = applyXpDelta({ xp: prev.xp, level: prev.level }, delta);

        const today = getDateKey();
        const allDone = quests.every((q) => q.done);
        const alreadyLoggedToday = prev.adventureCompletedDateKey === today;

        let garden = prev.garden;
        let journal = prev.journal;
        let adventureCompletedDateKey = prev.adventureCompletedDateKey;

        if (allDone && !alreadyLoggedToday) {
          adventureCompletedDateKey = today;
          garden = [
            ...prev.garden,
            { type: randomFlower(), day: prev.totalDays, dateKey: today },
          ];
          const line = JOURNAL_LINES[Math.floor(Math.random() * JOURNAL_LINES.length)];
          journal = [...prev.journal, { day: prev.totalDays, dateKey: today, line }];
        } else if (!allDone && alreadyLoggedToday) {
          // A quest was un-checked after completion — quietly revert today's log.
          adventureCompletedDateKey = null;
          garden = prev.garden.filter((f) => f.dateKey !== today);
          journal = prev.journal.filter((j) => j.dateKey !== today);
        }

        return {
          ...prev,
          quests,
          xp,
          level,
          coins: Math.max(0, prev.coins + coinDelta),
          garden,
          journal,
          adventureCompletedDateKey,
        };
      });
    },
    [setState]
  );

  const petMochi = useCallback(() => {
    setState((prev) => ({ ...prev, coins: prev.coins + COINS_PER_PET, petCount: prev.petCount + 1 }));
  }, [setState]);

  const openDailyGift = useCallback(() => {
    const today = getDateKey();
    if (state.giftOpenedDateKey === today && state.lastGift) {
      return { alreadyOpened: true, gift: state.lastGift };
    }
    const gift = GIFTS[Math.floor(Math.random() * GIFTS.length)];
    setState((prev) => ({
      ...prev,
      coins: prev.coins + COINS_PER_GIFT,
      giftOpenedDateKey: today,
      lastGift: gift,
    }));
    return { alreadyOpened: false, gift };
  }, [state.giftOpenedDateKey, state.lastGift, setState]);

  const toggleDarkMode = useCallback(() => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, [setState]);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundOn: !prev.soundOn }));
  }, [setState]);

  // Testing/demo utility — only ever rendered behind a dev-only flag in the UI.
  // Advances the world by exactly one simulated day without waiting for a
  // real calendar day to pass, so streak/garden/journal growth is easy to see.
  const simulateNextDay = useCallback(() => {
    setState((prev) => {
      const simDays = (prev._simDays || 0) + 1;
      const fakeToday = getDateKey(new Date(Date.now() + 24 * 60 * 60 * 1000 * simDays));
      return {
        ...prev,
        _simDays: simDays,
        lastVisitDateKey: fakeToday,
        streak: prev.streak + 1,
        totalDays: prev.totalDays + 1,
        quests: pickDailyQuests(fakeToday, QUESTS_PER_DAY),
        questsDateKey: fakeToday,
        adventureCompletedDateKey: null,
        welcomeBackMessage: null,
      };
    });
  }, [setState]);

  const resetWorld = useCallback(() => {
    setState(initialState);
    hasRunDayCheck.current = false;
  }, [setState]);

  return {
    state,
    isReady: isHydrated,
    actions: {
      toggleQuest,
      petMochi,
      openDailyGift,
      toggleDarkMode,
      toggleSound,
      simulateNextDay,
      resetWorld,
      clearWelcomeBack,
    },
  };
}
