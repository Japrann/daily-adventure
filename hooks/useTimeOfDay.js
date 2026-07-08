"use client";

import { useEffect, useState } from "react";
import { getPeriod } from "@/lib/time";
import { pickWeather } from "@/data/weather";

/**
 * Tracks the current time-of-day period (re-checked every minute so the
 * sky/greeting update live if someone leaves the tab open across a
 * boundary), plus one randomly-chosen weather for this visit.
 */
export function useTimeOfDay() {
  const [period, setPeriod] = useState(() => getPeriod());
  const [weather] = useState(() => pickWeather());

  useEffect(() => {
    const id = setInterval(() => {
      setPeriod(getPeriod());
    }, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return { period, weather };
}
