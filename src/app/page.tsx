"use client";

import { useState, useEffect, useRef } from "react";
import zxcvbn from "zxcvbn";
import { calculateEntropy } from "@/lib/entropy";
import { isCommonPassword } from "@/lib/wordlist";
import { sha1 } from "@/lib/sha1";
import { detectPatterns } from "@/lib/patterns";
import type { AnalysisResult } from "@/types/analysis";
import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";
import AnalysisResults from "@/components/AnalysisResults";

const EMPTY_RESULT: AnalysisResult = {
  zxcvbn: null,
  entropy: null,
  isCommon: null,
  breachCount: null,
  breachLoading: false,
  patterns: [],
};

export default function Home() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<AnalysisResult>(EMPTY_RESULT);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!password) {
      setResult(EMPTY_RESULT);
      return;
    }

    const timer = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const zxcvbnResult = zxcvbn(password);
      const entropyResult = calculateEntropy(password);
      const patternFlags = detectPatterns(password);

      setResult({
        zxcvbn: {
          score: zxcvbnResult.score,
          crackTimesDisplay: {
            offlineFastHashing1e10PerSecond:
              zxcvbnResult.crack_times_display
                .offline_fast_hashing_1e10_per_second as string,
            onlineNoThrottling10PerSecond:
              zxcvbnResult.crack_times_display
                .online_no_throttling_10_per_second as string,
          },
          feedback: {
            warning: zxcvbnResult.feedback.warning ?? "",
            suggestions: zxcvbnResult.feedback.suggestions ?? [],
          },
        },
        entropy: entropyResult,
        patterns: patternFlags,
        isCommon: null,
        breachCount: null,
        breachLoading: true,
      });

      const commonCheck = isCommonPassword(password).then((isCommon) => {
        setResult((prev) => ({ ...prev, isCommon }));
      });

      const hibpCheck = (async () => {
        try {
          const hash = await sha1(password);
          const prefix = hash.slice(0, 5);
          const suffix = hash.slice(5);

          const resp = await fetch(`/api/hibp?prefix=${prefix}`, {
            signal: controller.signal,
          });
          if (!resp.ok) throw new Error("HIBP error");

          const text = await resp.text();
          const match = text
            .split("\n")
            .find((line) => line.toUpperCase().startsWith(suffix));

          const count = match ? parseInt(match.split(":")[1], 10) : 0;
          setResult((prev) => ({ ...prev, breachCount: count, breachLoading: false }));
        } catch (err) {
          if ((err as Error).name !== "AbortError") {
            setResult((prev) => ({ ...prev, breachCount: null, breachLoading: false }));
          }
        }
      })();

      await Promise.allSettled([commonCheck, hibpCheck]);
    }, 300);

    return () => clearTimeout(timer);
  }, [password]);

  const hasResults =
    result.zxcvbn !== null || result.entropy !== null || result.breachLoading;

  return (
    <div className="min-h-screen bg-base">
      {/* ── Top system bar ───────────────────────────────────────── */}
      <header className="border-b border-edge px-6 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-dim tracking-[0.25em] uppercase">
          Thaufin Altaf
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main className="max-w-xl mx-auto px-5 py-14">
        {/* Hero */}
        <div className="mb-14">
          <h1 className="font-display text-[82px] leading-[0.88] text-ink select-none">
            HOW STRONG
            <br />
            IS <span className="text-accent">YOUR</span>
            <br />
            PASSWORD?
          </h1>
          <p className="font-mono text-[10px] text-ink-dim tracking-[0.2em] mt-5">
            ALL CHECKS LOCAL — PASSWORD NEVER TRANSMITTED 
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px flex-1 bg-edge" />
          <span className="font-mono text-[9px] text-ink-dim tracking-[0.2em]">
            INPUT
          </span>
          <span className="h-px flex-1 bg-edge" />
        </div>

        {/* Password input */}
        <PasswordInput value={password} onChange={setPassword} />

        {/* Results */}
        {hasResults && (
          <>
            <div className="flex items-center gap-3 my-10">
              <span className="h-px flex-1 bg-edge" />
              <span className="font-mono text-[9px] text-ink-dim tracking-[0.2em]">
                ANALYSIS
              </span>
              <span className="h-px flex-1 bg-edge" />
            </div>
            <AnalysisResults result={result} />
          </>
        )}

        {/* How it works CTA */}
        <Link
          href="/how-it-works"
          className="group mt-14 flex items-center justify-between border border-edge bg-panel px-5 py-4 hover:border-accent transition-colors duration-200"
          style={{ borderLeftWidth: 3, borderLeftColor: "#A97BFF" }}
        >
          <div>
            <p className="font-mono text-[9px] text-ink-dim tracking-[0.2em] uppercase mb-1">
              Curious how this works?
            </p>
            <p className="font-display text-2xl text-ink group-hover:text-accent transition-colors duration-200">
              HOW WE CHECK YOUR PASSWORD
            </p>
          </div>
          <span className="font-mono text-2xl text-accent group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
            →
          </span>
        </Link>

        {/* Footer */}
        <div className="mt-6 pt-5 border-t border-edge">
          <p className="font-mono text-[9px] text-ink-dim tracking-[0.15em]">
            BREACH DATA: HAVE I BEEN PWNED ·{" "}
            <span className="text-accent">K-ANONYMITY PROTOCOL ACTIVE</span> ·
            5-CHAR SHA1 PREFIX ONLY
          </p>
        </div>
      </main>
    </div>
  );
}
