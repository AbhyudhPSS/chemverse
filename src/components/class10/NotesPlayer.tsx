import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Headphones, Pause, Play, Square, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { pickDefaultVoice, useSpeechVoices } from "@/components/class10/useSpeechVoices";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;
const VOICE_STORAGE_KEY = "chemverse:notes-voice";

/**
 * Splits prose into speakable chunks. Short utterances keep pause/resume
 * responsive and sidestep the per-utterance length limits some browsers have.
 */
const chunkText = (text: string, max = 380): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > max && current) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(Boolean);
};

/** Trims the noisy platform suffixes browsers add to voice names. */
const prettyVoiceName = (voice: SpeechSynthesisVoice) =>
  voice.name
    .replace(/\s*\((Natural|Premium|Enhanced|Online)\)/gi, "")
    .replace(/\s*-\s*English.*/i, "")
    .replace(/^Microsoft\s+/i, "")
    .replace(/\s*Online$/i, "")
    .trim();

const NotesPlayer = ({ text, className }: { text: string; className?: string }) => {
  const chunks = useMemo(() => chunkText(text), [text]);
  const { englishVoices } = useSpeechVoices();

  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [voiceURI, setVoiceURI] = useState<string>("");

  // Refs hold the live values the speech callbacks need, so restarting a
  // chunk after a settings change doesn't depend on stale closures.
  const indexRef = useRef(0);
  const rateRef = useRef(rate);
  const volumeRef = useRef(volume);
  const voiceURIRef = useRef<string>("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stoppedRef = useRef(true);

  /** Look the chosen voice up in the browser's current list, by URI. */
  const resolveVoice = useCallback((): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
    const uri = voiceURIRef.current;
    if (!uri) return null;
    return window.speechSynthesis.getVoices().find((v) => v.voiceURI === uri) ?? null;
  }, []);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  // Choose the smoothest female US voice available, unless the reader picked one.
  useEffect(() => {
    if (!englishVoices.length || voiceURI) return;

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(VOICE_STORAGE_KEY);
    } catch {
      saved = null;
    }

    const savedVoice = saved ? englishVoices.find((v) => v.voiceURI === saved) : undefined;
    const chosen = savedVoice ?? pickDefaultVoice(englishVoices);
    if (chosen) {
      setVoiceURI(chosen.voiceURI);
      voiceURIRef.current = chosen.voiceURI;
    }
  }, [englishVoices, voiceURI]);

  const speakFrom = useCallback(
    (start: number) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      stoppedRef.current = false;

      const speakChunk = (i: number) => {
        if (stoppedRef.current || i >= chunks.length) {
          if (!stoppedRef.current) {
            stoppedRef.current = true;
            setPlaying(false);
            setPaused(false);
            setProgress(0);
            indexRef.current = 0;
          }
          return;
        }

        indexRef.current = i;
        setProgress(i / chunks.length);

        const utterance = new SpeechSynthesisUtterance(chunks[i]);
        utterance.rate = rateRef.current;
        utterance.volume = volumeRef.current;
        utterance.pitch = 1;

        // Re-resolve the voice from the live list on every chunk. Browsers
        // rebuild their voice objects (each `voiceschanged`), and a stale
        // object silently falls back to the system default — which is what
        // made the narration change voice part-way through a chapter.
        const voice = resolveVoice();
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = "en-US";
        }

        // Chrome garbage-collects utterances that nothing references, which
        // cuts speech off mid-sentence. Holding one reference prevents that.
        utteranceRef.current = utterance;

        utterance.onend = () => {
          if (!stoppedRef.current) speakChunk(i + 1);
        };
        utterance.onerror = () => {
          stoppedRef.current = true;
          setPlaying(false);
          setPaused(false);
        };

        window.speechSynthesis.speak(utterance);
      };

      speakChunk(start);
      setPlaying(true);
      setPaused(false);
    },
    [chunks, resolveVoice],
  );

  const stop = useCallback(() => {
    stoppedRef.current = true;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    indexRef.current = 0;
    setPlaying(false);
    setPaused(false);
    setProgress(0);
  }, []);

  const toggle = () => {
    if (!playing) {
      speakFrom(indexRef.current);
      return;
    }
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };

  // Settings take effect immediately by restarting the current chunk.
  const applyRate = (next: number) => {
    setRate(next);
    rateRef.current = next;
    if (playing) speakFrom(indexRef.current);
  };

  /** Live value while dragging — restarting on every tick would stutter. */
  const previewVolume = (next: number) => {
    setVolume(next);
    volumeRef.current = next;
  };

  /** Applied once the reader lets go of the slider. */
  const commitVolume = (next: number) => {
    volumeRef.current = next;
    if (playing) speakFrom(indexRef.current);
  };

  const applyVoice = (uri: string) => {
    setVoiceURI(uri);
    voiceURIRef.current = uri;
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, uri);
    } catch {
      /* storage can be blocked; the choice just won't persist */
    }
    if (playing) speakFrom(indexRef.current);
  };

  // Chrome (and Edge) stop speaking after ~15 seconds unless nudged.
  useEffect(() => {
    if (!playing || paused) return;
    if (!/Chrome/.test(navigator.userAgent)) return;
    const id = window.setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
    return () => window.clearInterval(id);
  }, [playing, paused]);

  // Never leave speech running after the component goes away.
  useEffect(() => stop, [stop]);
  useEffect(() => {
    stop();
  }, [text, stop]);

  if (!supported) return null;

  return (
    <div className={cn("glass-panel rounded-lg", className)}>
      <div className="flex flex-wrap items-center gap-3 p-3 sm:gap-4">
        <Button onClick={toggle} size="sm" className="shrink-0">
          {playing && !paused ? (
            <>
              <Pause aria-hidden="true" className="h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              {playing ? (
                <Play aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Headphones aria-hidden="true" className="h-4 w-4" />
              )}
              {playing ? "Resume" : "Listen to notes"}
            </>
          )}
        </Button>

        {playing && (
          <Button onClick={stop} size="sm" variant="ghost" aria-label="Stop reading">
            <Square aria-hidden="true" className="h-3.5 w-3.5" />
            Stop
          </Button>
        )}

        {/* Voice */}
        {englishVoices.length > 0 && (
          <div className="flex items-center gap-1.5">
            <label htmlFor="tts-voice" className="eyebrow">
              Voice
            </label>
            <select
              id="tts-voice"
              value={voiceURI}
              onChange={(e) => applyVoice(e.target.value)}
              className="max-w-[9.5rem] truncate rounded border border-border bg-card/70 px-2 py-1 text-xs text-foreground transition-colors hover:border-foreground/25 focus-visible:border-primary"
            >
              {englishVoices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {prettyVoiceName(v)} · {v.lang}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Speed */}
        <div className="flex items-center gap-1.5">
          <span id="tts-speed" className="eyebrow">
            Speed
          </span>
          <div className="flex gap-0.5" role="group" aria-labelledby="tts-speed">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => applyRate(s)}
                aria-pressed={rate === s}
                className={cn(
                  "rounded px-1.5 py-1 font-mono text-[0.6875rem] transition-colors",
                  rate === s
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div className="flex min-w-[8.5rem] flex-1 items-center gap-2">
          <span className="eyebrow" id="tts-volume">
            Volume
          </span>
          {volume === 0 ? (
            <VolumeX aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <Volume2 aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <Slider
            aria-labelledby="tts-volume"
            value={[volume]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={([v]) => previewVolume(v)}
            onValueCommit={([v]) => commitVolume(v)}
            className="flex-1"
          />
          <span className="w-9 shrink-0 text-right font-mono text-[0.6875rem] text-muted-foreground">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Progress */}
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-0.5 w-full overflow-hidden rounded-b-lg bg-muted"
      >
        <div
          className="h-full bg-cobalt transition-[width] duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {playing ? (paused ? "Reading paused" : "Reading notes aloud") : "Stopped"}
      </p>
    </div>
  );
};

export default NotesPlayer;
