"use client";

import Sheet from "@/components/sheets/Sheet";

function Row({ label, value, onClick }) {
  return (
    <div className="flex items-center justify-between border-b border-black/[0.08] py-3 last:border-none dark:border-white/10">
      <span className="text-sm">{label}</span>
      <button
        onClick={onClick}
        className="rounded-xl border border-black/10 bg-white/60 px-3.5 py-1.5 text-sm font-bold dark:border-white/10 dark:bg-white/5"
      >
        {value ? "On" : "Off"}
      </button>
    </div>
  );
}

export default function SettingsSheet({
  isOpen,
  onClose,
  darkMode,
  soundOn,
  onToggleDark,
  onToggleSound,
  onSimulateNextDay,
  onReset,
  isDev,
}) {
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Settings" subtitle="Small preferences for this device.">
      <Row label="Dark mode" value={darkMode} onClick={onToggleDark} />
      <Row label="Ambient sound" value={soundOn} onClick={onToggleSound} />

      {isDev && (
        <div className="mt-6 rounded-2xl border border-dashed border-black/15 p-4 dark:border-white/15">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-soft dark:text-cream/50">
            Dev tools
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSimulateNextDay}
              className="rounded-xl bg-sage px-3.5 py-2 text-xs font-bold text-white"
            >
              ✨ Simulate next day
            </button>
            <button
              onClick={onReset}
              className="rounded-xl bg-black/10 px-3.5 py-2 text-xs font-bold dark:bg-white/10"
            >
              Reset world
            </button>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-ink-soft dark:text-cream/50">
        Everything here is saved to this browser only (localStorage), so it will stay put across
        refreshes and future visits on this device.
      </p>
    </Sheet>
  );
}
