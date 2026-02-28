import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Password Analyzer",
  description:
    "How we assess your password strength using zxcvbn, entropy, HIBP k-anonymity, common password lists, and pattern detection.",
};

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-base">
      {/* Top bar */}
      <header className="border-b border-edge px-6 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-dim tracking-[0.25em] uppercase">
          Thaufin Altaf
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
      </header>

      <main className="max-w-2xl mx-auto px-5 py-14">
        {/* Back */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-accent transition-colors mb-14"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">
            ←
          </span>
          back to analyzer
        </Link>

        {/* Hero */}
        <div className="mb-14">
          <h1 className="font-display text-[76px] leading-[0.88] text-ink mb-6">
            HOW WE
            <br />
            CHECK YOUR
            <br />
            <span className="text-accent">PASSWORD</span>
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed max-w-lg">
            Five independent checks run the moment you type, all locally in
            your browser. Here&apos;s exactly what each one does, why it matters,
            and why your password never touches a server.
          </p>
        </div>

        {/* Index */}
        <div
          className="border border-edge bg-panel px-5 py-4 mb-16"
          style={{ borderLeftWidth: 3, borderLeftColor: "#A97BFF" }}
        >
          <p className="eyebrow mb-3">{"// six sections"}</p>
          <ol className="space-y-2">
            {(
              [
                ["00", "Privacy Architecture", "how your password stays local", "#00CC6A"],
                ["01", "Strength Scoring", "zxcvbn", "#A97BFF"],
                ["02", "Entropy", "Shannon entropy formula", "#A97BFF"],
                ["03", "Breach Database", "Have I Been Pwned · k-anonymity", "#A97BFF"],
                ["04", "Common Password Lists", "top-10k + RockYou", "#A97BFF"],
                ["05", "Pattern Detection", "5 structural checks", "#A97BFF"],
              ] as const
            ).map(([num, title, sub, color]) => (
              <li key={num} className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] w-5 shrink-0" style={{ color }}>
                  {num}
                </span>
                <span className="text-sm text-ink">{title}</span>
                <span className="font-mono text-[10px] text-ink-dim">{sub}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-20">
          {/* ── 00 Privacy ──────────────────────────────────────── */}
          <Section number="00" title="PRIVACY ARCHITECTURE" accentColor="#00CC6A">
            <p className="text-sm text-ink-muted leading-relaxed mb-5">
              Every check on this site runs inside your browser. Your password
              is never sent to any server, never logged, and never stored. Here
              is exactly what happens, and what doesn&apos;t.
            </p>

            <div
              className="border border-edge bg-panel px-4 py-4 mb-5"
              style={{ borderLeftWidth: 3, borderLeftColor: "#00CC6A" }}
            >
              <p className="eyebrow mb-4">{"// what stays local"}</p>
              <div className="space-y-4">
                {(
                  [
                    [
                      "Strength + Entropy + Patterns",
                      "Pure JavaScript functions. They receive your password as a string, compute a result, and return it. No network involved, nothing to intercept.",
                    ],
                    [
                      "Wordlist check",
                      "The wordlist files (top10k, RockYou) are downloaded once from our own server as plain text. The server only sends files to you, it never receives your password.",
                    ],
                    [
                      "Breach check",
                      "SHA1 is computed locally using the browser's built-in Web Crypto API. Only the first 5 characters of that hash are ever sent anywhere. See section 03 for the full breakdown.",
                    ],
                  ] as const
                ).map(([label, desc]) => (
                  <div key={label} className="flex gap-4">
                    <span
                      className="font-mono text-[9px] tracking-[0.1em] px-1.5 py-0.5 border shrink-0 h-fit mt-0.5"
                      style={{
                        color: "#00CC6A",
                        borderColor: "rgba(0,204,106,0.3)",
                        backgroundColor: "rgba(0,204,106,0.06)",
                      }}
                    >
                      LOCAL
                    </span>
                    <div>
                      <p className="font-mono text-xs text-ink mb-1">{label}</p>
                      <p className="text-xs text-ink-muted leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="border border-edge bg-panel px-4 py-4"
              style={{ borderLeftWidth: 3, borderLeftColor: "#FF3366" }}
            >
              <p className="eyebrow mb-4">{"// what the server sees"}</p>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-ink-muted">your password</span>
                  <span className="text-danger">never</span>
                </div>
                <div className="flex justify-between items-center border-t border-edge pt-3">
                  <span className="text-ink-muted">full SHA1 hash</span>
                  <span className="text-danger">never</span>
                </div>
                <div className="flex justify-between items-center border-t border-edge pt-3">
                  <span className="text-ink-muted">first 5 chars of SHA1 (HIBP only)</span>
                  <span className="text-warn">once per check</span>
                </div>
                <div className="flex justify-between items-center border-t border-edge pt-3">
                  <span className="text-ink-muted">wordlist files</span>
                  <span className="text-safe">downloaded to you</span>
                </div>
              </div>
            </div>
          </Section>

          {/* ── 01 zxcvbn ───────────────────────────────────────── */}
          <Section number="01" title="STRENGTH SCORING" accentColor="#A97BFF">
            <p className="text-sm text-ink-muted leading-relaxed mb-5">
              Most password meters just count character types: uppercase? +1.
              Number? +1. That&apos;s nearly useless. We use{" "}
              <strong className="text-ink font-semibold">zxcvbn</strong>, a
              library originally built by Dropbox, that thinks like an actual
              attacker.
            </p>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              It checks your password against dictionary words, common names,
              keyboard patterns, dates, and known sequences, then estimates
              crack time against realistic hardware.
            </p>

            <div
              className="border border-edge bg-panel px-4 py-4 mb-5"
              style={{ borderLeftWidth: 3, borderLeftColor: "#A97BFF" }}
            >
              <p className="eyebrow mb-4">{"// score scale"}</p>
              <div className="space-y-2.5">
                {(
                  [
                    ["0", "Very Weak", "#FF3366", "password"],
                    ["1", "Weak", "#FF6B35", "password1!"],
                    ["2", "Fair", "#FFAD00", "Tr0ub4dor"],
                    ["3", "Strong", "#88CC00", "correct-horse-battery"],
                    ["4", "Very Strong", "#00CC6A", "kX9#mP2$nQ7@vL4!"],
                  ] as const
                ).map(([score, label, color, example]) => (
                  <div key={score} className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-ink-dim w-3 shrink-0">
                      {score}
                    </span>
                    <div
                      className="h-2 w-16 shrink-0"
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}60`,
                      }}
                    />
                    <span
                      className="font-mono text-[10px] w-20 shrink-0"
                      style={{ color }}
                    >
                      {label}
                    </span>
                    <span className="font-mono text-[10px] text-ink-dim truncate">
                      {example}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-ink-dim">
              Crack time assumes an offline attack at 10 billion guesses per
              second (GPU-level hardware a serious attacker would have).
            </p>
          </Section>

          {/* ── 02 Entropy ──────────────────────────────────────── */}
          <Section number="02" title="ENTROPY" accentColor="#A97BFF">
            <p className="text-sm text-ink-muted leading-relaxed mb-5">
              Entropy measures how unpredictable your password is, in bits. More
              bits = more possible combinations an attacker has to search. The
              formula:
            </p>

            <div
              className="border border-edge bg-panel px-4 py-4 mb-5"
              style={{ borderLeftWidth: 3, borderLeftColor: "#A97BFF" }}
            >
              <p className="font-mono text-sm text-ink mb-4">
                bits = length × log₂(pool size)
              </p>
              <div className="space-y-1 font-mono text-xs text-ink-muted mb-5">
                <p>
                  lowercase only{"    "}→ pool ={" "}
                  <span className="text-ink">26</span>
                </p>
                <p>
                  + uppercase{"       "}→ pool ={" "}
                  <span className="text-ink">52</span>
                </p>
                <p>
                  + digits{"          "}→ pool ={" "}
                  <span className="text-ink">62</span>
                </p>
                <p>
                  + symbols{"         "}→ pool ={" "}
                  <span className="text-ink">94</span>
                </p>
              </div>
              <div className="border-t border-edge pt-4 space-y-1.5 font-mono text-xs">
                <p className="text-ink-muted">
                  <span className="text-ink">&quot;hello&quot;</span> = 5 × log₂(26) ={" "}
                  <span className="text-warn">23 bits</span>
                  {"  "}(very weak)
                </p>
                <p className="text-ink-muted">
                  <span className="text-ink">&quot;kX9#mP2$&quot;</span> = 8 × log₂(94) ={" "}
                  <span className="text-safe">52 bits</span>
                  {"  "}(moderate)
                </p>
                <p className="text-ink-muted">
                  <span className="text-ink">&quot;kX9#mP2$nQ7@vL4!&quot;</span> = 16 × log₂(94) ={" "}
                  <span className="text-accent">104 bits</span>
                  {"  "}(strong)
                </p>
              </div>
            </div>

            <p className="text-xs text-ink-dim">
              Entropy assumes random character selection. For human-chosen
              passwords, zxcvbn&apos;s crack time estimate is more realistic.
              Entropy is most accurate for randomly generated passwords.
            </p>
          </Section>

          {/* ── 03 HIBP ─────────────────────────────────────────── */}
          <Section number="03" title="BREACH DATABASE" accentColor="#FF3366">
            <p className="text-sm text-ink-muted leading-relaxed mb-5">
              We check your password against billions of real leaked passwords
              using{" "}
              <strong className="text-ink">Have I Been Pwned</strong>, the
              largest public breach database. But here&apos;s the important part:{" "}
              <span className="text-accent font-semibold">
                your password never leaves your browser
              </span>
              .
            </p>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              This is possible through a technique called{" "}
              <strong className="text-ink">k-anonymity</strong>. Here&apos;s
              exactly what happens step by step:
            </p>

            <div
              className="border border-edge bg-panel px-4 py-4 mb-5"
              style={{ borderLeftWidth: 3, borderLeftColor: "#FF3366" }}
            >
              <p className="eyebrow mb-4">{"// request flow"}</p>
              <div className="space-y-0 font-mono text-xs">
                {(
                  [
                    [
                      "01",
                      "text-ink",
                      "your password",
                      '"password123"',
                      "never leaves browser",
                    ],
                    [
                      "02",
                      "text-ink-muted",
                      "SHA1 computed in browser",
                      "CBFDAC6008F9CAB4083784CBD1874F76618D2A97",
                      "full hash stays local",
                    ],
                    [
                      "03",
                      "text-accent",
                      "only first 5 chars sent",
                      "CBFDA",
                      "→ our server → HIBP",
                    ],
                    [
                      "04",
                      "text-ink-muted",
                      "HIBP returns ~800 matches",
                      "all hashes starting with CBFDA",
                      "server learns nothing",
                    ],
                    [
                      "05",
                      "text-safe",
                      "browser checks locally",
                      "suffix match found? → count",
                      "result rendered",
                    ],
                  ] as const
                ).map(([step, valueColor, label, value, note]) => (
                  <div
                    key={step}
                    className="grid grid-cols-[20px_1fr_auto] gap-x-3 py-2.5 border-b border-edge last:border-0 items-start"
                  >
                    <span className="text-ink-dim">{step}</span>
                    <div className="min-w-0">
                      <p className="text-ink-muted mb-0.5">{label}</p>
                      <p className={`${valueColor} truncate`}>{value}</p>
                    </div>
                    <span className="text-[9px] text-ink-dim text-right whitespace-nowrap self-center">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-ink-dim">
              There are 16⁵ = 1,048,576 possible 5-character hex prefixes. The
              server cannot determine which password you&apos;re checking from the
              prefix alone. That&apos;s the k-anonymity guarantee.
            </p>
          </Section>

          {/* ── 04 Wordlists ────────────────────────────────────── */}
          <Section number="04" title="COMMON PASSWORD LISTS" accentColor="#FFAD00">
            <p className="text-sm text-ink-muted leading-relaxed mb-5">
              We also check your password against two locally-stored wordlists.
              No network request, the lists download to your browser once and
              are cached. The check is instant on every subsequent visit.
            </p>

            <div
              className="border border-edge bg-panel px-4 py-4 mb-5"
              style={{ borderLeftWidth: 3, borderLeftColor: "#FFAD00" }}
            >
              <div className="space-y-5">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-xs text-ink">
                      top-10k.txt
                    </span>
                    <span className="font-mono text-[10px] text-ink-dim">
                      10,000 entries
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    A curated list of the most commonly used passwords. If
                    your password is on here, it&apos;s the very first thing any
                    attacker tries.
                  </p>
                </div>
                <div className="border-t border-edge pt-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-mono text-xs text-ink">
                      rockyou-top100k.txt
                    </span>
                    <span className="font-mono text-[10px] text-ink-dim">
                      59,186 entries
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Real passwords from the 2009 RockYou data breach. 32
                    million plaintext passwords leaked from a social gaming
                    site. It became the standard wordlist for security
                    research and every serious password cracker includes it.
                  </p>
                </div>
              </div>
              <div className="border-t border-edge mt-5 pt-3">
                <p className="font-mono text-[10px] text-ink-dim">
                  combined coverage:{" "}
                  <span className="text-warn">~69,000 passwords</span> checked
                  locally with O(1) lookup
                </p>
              </div>
            </div>
          </Section>

          {/* ── 05 Patterns ─────────────────────────────────────── */}
          <Section number="05" title="PATTERN DETECTION" accentColor="#FFAD00">
            <p className="text-sm text-ink-muted leading-relaxed mb-5">
              Even passwords not in any wordlist can be structurally weak. We
              run five checks that catch the shortcuts people take when trying
              to make a password feel complex without actually being complex.
            </p>

            <div
              className="border border-edge bg-panel px-4 py-4"
              style={{ borderLeftWidth: 3, borderLeftColor: "#FFAD00" }}
            >
              <div className="space-y-5">
                {(
                  [
                    [
                      "KEYBOARD WALK",
                      "#FF3366",
                      "qwerty, asdf123, trewq",
                      "Four or more consecutive keys along a keyboard row, including reversed patterns like trewq.",
                    ],
                    [
                      "REPEATED CHARS",
                      "#FF3366",
                      "aaaa, 1111111",
                      "Four or more of the same character in a row. Caught with a single regex backreference.",
                    ],
                    [
                      "SEQUENTIAL",
                      "#FFAD00",
                      "abcd, 1234, zyxw",
                      "Four or more characters whose Unicode values step up or down by exactly 1.",
                    ],
                    [
                      "L33T SPEAK",
                      "#FFAD00",
                      "p@ssw0rd, s3cur3",
                      "Common symbol substitutions like @ → a, 0 → o, 3 → e. Every password cracker has these mapped.",
                    ],
                    [
                      "NUMERIC ONLY",
                      "#FF3366",
                      "1234, 19901231",
                      "All-digit passwords up to 8 characters. 10⁸ = 100 million combinations, less than a second on modern hardware.",
                    ],
                  ] as const
                ).map(([label, color, example, desc], i) => (
                  <div
                    key={label}
                    className={`flex gap-4 ${i > 0 ? "pt-5 border-t border-edge" : ""}`}
                  >
                    <div className="shrink-0 mt-0.5">
                      <span
                        className="font-mono text-[9px] tracking-[0.12em] px-1.5 py-0.5 border inline-block"
                        style={{
                          color,
                          borderColor: `${color}40`,
                          backgroundColor: `${color}0D`,
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-ink-dim mb-1.5">
                        {example}
                      </p>
                      <p className="text-xs text-ink-muted leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-edge flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs text-ink-muted hover:text-accent transition-colors"
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">
              ←
            </span>
            back to analyzer
          </Link>
          <p className="font-mono text-[9px] text-ink-dim">THAUFIN ALTAF</p>
        </div>
      </main>
    </div>
  );
}

function Section({
  number,
  title,
  accentColor,
  children,
}: {
  number: string;
  title: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      {/* Ghost number — decorative */}
      <div
        className="absolute -top-6 -left-2 font-display leading-none select-none pointer-events-none"
        style={{ fontSize: 130, color: accentColor, opacity: 0.04 }}
        aria-hidden
      >
        {number}
      </div>

      {/* Header */}
      <div className="flex items-baseline gap-4 mb-6">
        <span
          className="font-mono text-[10px] tracking-[0.2em] shrink-0"
          style={{ color: accentColor }}
        >
          {number}
        </span>
        <h2
          className="font-display text-4xl leading-none"
          style={{ color: accentColor }}
        >
          {title}
        </h2>
      </div>

      <div>{children}</div>
    </section>
  );
}
