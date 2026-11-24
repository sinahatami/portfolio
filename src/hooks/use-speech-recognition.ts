"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Minimal typing for the (still prefixed) Web Speech API. */
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}
interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const candidate = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return (
    candidate.SpeechRecognition ?? candidate.webkitSpeechRecognition ?? null
  );
}

export type SpeechError = "not-allowed" | "unsupported" | "failed";

interface Options {
  onFinalTranscript: (transcript: string) => void;
  onError?: (error: SpeechError) => void;
  lang?: string;
}

/**
 * Adapter hook over the browser's speech recognition. Exposes a small,
 * framework-friendly API and hides vendor prefixes and event plumbing.
 */
export function useSpeechRecognition({
  onFinalTranscript,
  onError,
  lang = "en-US",
}: Options) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const callbacks = useRef({ onFinalTranscript, onError });

  useEffect(() => {
    callbacks.current = { onFinalTranscript, onError };
  });

  useEffect(() => {
    setSupported(getRecognitionConstructor() !== null);
    return () => recognitionRef.current?.stop();
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(() => {
    const Recognition = getRecognitionConstructor();
    if (!Recognition) {
      callbacks.current.onError?.("unsupported");
      return;
    }

    const recognition = recognitionRef.current ?? new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (!result) continue;
        const text = result[0].transcript.trim();
        setTranscript(text);
        if (result.isFinal) callbacks.current.onFinalTranscript(text);
      }
    };
    recognition.onerror = (event) => {
      callbacks.current.onError?.(
        event.error === "not-allowed" || event.error === "service-not-allowed"
          ? "not-allowed"
          : "failed"
      );
      setListening(false);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setTranscript("");
    try {
      recognition.start();
      setListening(true);
    } catch {
      // `start()` throws if a session is already running; treat as listening.
      setListening(true);
    }
  }, [lang]);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  return { supported, listening, transcript, start, stop, toggle };
}
