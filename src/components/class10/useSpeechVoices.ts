import { useEffect, useMemo, useState } from "react";

/**
 * Smooth female US English voices, best first.
 *
 * Browsers expose wildly different voice sets, so we rank by name against the
 * voices that are actually pleasant to listen to on each platform rather than
 * trusting the engine's default (which is often a clipped robotic fallback).
 */
const PREFERRED = [
  // Edge / Windows neural voices — the smoothest widely available
  "microsoft ava",
  "microsoft emma",
  "microsoft jenny",
  "microsoft aria",
  "microsoft michelle",
  // macOS / iOS
  "ava",
  "samantha",
  "allison",
  "susan",
  "nicky",
  "zoe",
  "joelle",
  // Chrome (all platforms)
  "google us english",
  // Older Windows SAPI
  "microsoft zira",
];

/** Names that are male or non-US, so they never win the default. */
const EXCLUDE = [
  "alex", "daniel", "fred", "tom", "aaron", "arthur", "gordon", "rishi",
  "david", "mark", "guy", "eric", "roger", "steffan", "andrew", "brian",
  "karen", "moira", "tessa", "fiona", "veena", "rishi", "serena", "kate",
  "libby", "sonia", "natasha", "clara", "google uk",
];

const score = (voice: SpeechSynthesisVoice): number => {
  const name = voice.name.toLowerCase();
  const lang = voice.lang.toLowerCase().replace("_", "-");

  if (!lang.startsWith("en")) return -1;
  if (EXCLUDE.some((bad) => name.includes(bad))) return -1;

  let points = 0;

  // American English is the requirement, not a nicety.
  if (lang === "en-us") points += 100;
  else return -1;

  const rank = PREFERRED.findIndex((p) => name.includes(p));
  if (rank !== -1) points += 200 - rank * 5;

  // Neural / premium variants are noticeably smoother.
  if (/natural|neural|premium|enhanced|online/.test(name)) points += 40;
  if (voice.localService) points += 5;

  return points;
};

export const pickDefaultVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  const ranked = voices
    .map((voice) => ({ voice, points: score(voice) }))
    .filter((v) => v.points >= 0)
    .sort((a, b) => b.points - a.points);

  if (ranked.length) return ranked[0].voice;

  // Nothing matched: fall back to any US English voice, then any English one.
  return (
    voices.find((v) => v.lang.toLowerCase().replace("_", "-") === "en-us") ??
    voices.find((v) => v.lang.toLowerCase().startsWith("en")) ??
    null
  );
};

/**
 * Voice lists load asynchronously in most browsers, and Chrome only populates
 * them after the first `voiceschanged` event — so we subscribe rather than
 * reading once.
 */
export const useSpeechVoices = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const read = () => setVoices(window.speechSynthesis.getVoices());
    read();

    window.speechSynthesis.addEventListener("voiceschanged", read);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", read);
  }, []);

  /** English voices only — the notes are in English. */
  const englishVoices = useMemo(
    () => voices.filter((v) => v.lang.toLowerCase().startsWith("en")),
    [voices],
  );

  return { voices, englishVoices };
};
