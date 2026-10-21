import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/** My Heart Will Go On — loops in background */
const LOCAL_SONG = "/my-heart-will-go-on.mp3";
const TARGET_VOLUME = 0.95;
const FADE_MS = 1200;
const AUTO_PLAY_DELAY_MS = 200;

type AmbienceToggleProps = {
  /** Start as soon as true (page ready / loader done) */
  playWhenReady?: boolean;
};

export function AmbienceToggle({ playWhenReady = false }: AmbienceToggleProps) {
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const userMutedRef = useRef(false);
  const startedRef = useRef(false);
  const tryingRef = useRef(false);

  const clearFade = () => {
    if (fadeRef.current != null) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const stopAudio = useCallback(() => {
    clearFade();
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";
    audioRef.current = null;
  }, []);

  useEffect(() => {
    return () => stopAudio();
  }, [stopAudio]);

  const fadeVolume = (audio: HTMLAudioElement, to: number, done?: () => void) => {
    clearFade();
    const from = audio.volume;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      audio.volume = from + (to - from) * t;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        done?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  };

  const waitForSource = (audio: HTMLAudioElement, src: string) =>
    new Promise<void>((resolve, reject) => {
      if (audio.readyState >= 3) {
        resolve();
        return;
      }
      const onReady = () => {
        cleanup();
        resolve();
      };
      const onErr = () => {
        cleanup();
        reject(new Error("load failed"));
      };
      const cleanup = () => {
        audio.removeEventListener("canplaythrough", onReady);
        audio.removeEventListener("error", onErr);
      };
      audio.addEventListener("canplaythrough", onReady);
      audio.addEventListener("error", onErr);
      audio.src = src;
      audio.load();
    });

  const startSong = useCallback(async () => {
    if (audioRef.current && !audioRef.current.paused) {
      setOn(true);
      startedRef.current = true;
      return;
    }

    stopAudio();
    const audio = new Audio();
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    await waitForSource(audio, LOCAL_SONG);
    if (!audioRef.current) return;
    await audio.play();
    fadeVolume(audio, TARGET_VOLUME);
    setOn(true);
    startedRef.current = true;
  }, [stopAudio]);

  const tryPlay = useCallback(async () => {
    if (userMutedRef.current || tryingRef.current) return;
    if (startedRef.current && audioRef.current && !audioRef.current.paused) return;

    tryingRef.current = true;
    setBusy(true);
    try {
      await startSong();
    } catch {
      stopAudio();
      startedRef.current = false;
    } finally {
      tryingRef.current = false;
      setBusy(false);
    }
  }, [startSong, stopAudio]);

  /* Try autoplay as soon as page is ready */
  useEffect(() => {
    if (!playWhenReady || userMutedRef.current) return;

    const timer = window.setTimeout(() => {
      void tryPlay();
    }, AUTO_PLAY_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [playWhenReady, tryPlay]);

  /* If browser blocked autoplay, start on first tap / key */
  useEffect(() => {
    if (!playWhenReady || userMutedRef.current) return;

    const onInteract = () => {
      if (userMutedRef.current) return;
      if (startedRef.current && audioRef.current && !audioRef.current.paused) return;
      void tryPlay();
    };

    document.addEventListener("pointerdown", onInteract, { passive: true });
    document.addEventListener("keydown", onInteract);
    document.addEventListener("touchstart", onInteract, { passive: true });

    return () => {
      document.removeEventListener("pointerdown", onInteract);
      document.removeEventListener("keydown", onInteract);
      document.removeEventListener("touchstart", onInteract);
    };
  }, [playWhenReady, tryPlay]);

  const toggle = async () => {
    if (busy) return;

    if (on) {
      userMutedRef.current = true;
      setBusy(true);
      const audio = audioRef.current;
      if (audio) {
        fadeVolume(audio, 0, () => {
          stopAudio();
          setOn(false);
          setBusy(false);
          startedRef.current = false;
        });
      } else {
        setOn(false);
        setBusy(false);
      }
      return;
    }

    userMutedRef.current = false;
    setBusy(true);
    try {
      await startSong();
    } catch {
      stopAudio();
      setOn(false);
      startedRef.current = false;
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      title={on ? "Mute My Heart Will Go On" : "Play My Heart Will Go On (loop)"}
      aria-label={on ? "Mute background music" : "Play My Heart Will Go On"}
      className="absolute top-4 right-4 z-50 size-11 rounded-full bg-card/90 backdrop-blur border border-emerald/30 shadow-soft flex items-center justify-center text-emerald hover:bg-card transition disabled:opacity-60"
    >
      {on ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
    </button>
  );
}
