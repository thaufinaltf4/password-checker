# Password Analyzer

**Live demo:** https://thaufins-password-checker.vercel.app

A browser-based password strength analyzer. Every check runs locally in your browser, your password is never sent anywhere.

---

## Ideation

I wanted to build something actually useful rather than just another tutorial project. Password security seemed like a good fit since most people have weak passwords and don't really know why they're weak. The tools I found online were either too basic (just a colored bar) or didn't explain anything.

I also wanted to make sure the privacy side was solid. A password checker that sends your password to a server defeats the whole point, so that became the main constraint everything else was built around.

---

## Why this stack

**Next.js** made sense because I needed both a frontend and a small server-side piece (a proxy for the breach check API). Rather than setting up a separate backend, Next.js handles both in one project through API routes.

**TypeScript** was a natural fit coming from a C++ background. I wanted type safety, and it caught a few real bugs around the async state updates during development.

**Tailwind CSS** kept styling quick to write and easy to maintain. I set up a custom token system in `tailwind.config.ts` for colors and fonts so nothing is hardcoded in random places.

**zxcvbn** was chosen because it actually thinks about how attackers crack passwords rather than just checking if you used a capital letter and a number. It gives realistic crack time estimates which are much more informative than an arbitrary score.

---

## How I used it

The core of the app is an analysis pipeline that runs every time the password changes, debounced at 300ms:

```
password input (debounced 300ms)
  ├── zxcvbn()              -> strength score, crack time, suggestions  [sync]
  ├── calculateEntropy()    -> bits of randomness                       [sync]
  ├── detectPatterns()      -> keyboard walks, repeated chars, etc.     [sync]
  ├── isCommonPassword()    -> checks against ~69k wordlist entries      [async]
  └── sha1() -> /api/hibp  -> breach count from Have I Been Pwned      [async]
```

The sync checks render immediately. The async ones (wordlist and breach check) update the UI as they resolve without overwriting what's already there, using `setState` with the previous state spread.

The HIBP proxy in `src/app/api/hibp/route.ts` validates that the incoming prefix is exactly 5 hex characters, forwards it to the HIBP range API, and passes the response back. The server never sees the full hash or the password.

---

## Methodology

**Security first.** The main constraint was keeping the raw password in the browser at all times:

- zxcvbn, entropy, and pattern detection are pure functions with no network calls
- Wordlists are static files in `public/` that get downloaded to you, not the other way around
- For the breach check, SHA1 is computed locally using the browser's Web Crypto API. Only the first 5 characters of that hash are sent to the proxy. There are 16^5 = 1,048,576 possible prefixes, so the server has no way of knowing which password you're checking

**Progressive results.** Checks don't wait for each other. Strength, entropy, and pattern flags show up instantly. The wordlist and breach results appear when ready and slot in without re-animating anything already on screen.

**Pattern detection.** Five checks catch structural weaknesses that wordlists miss: keyboard walks (qwerty, asdf), repeated characters (aaaa), sequential runs (1234, abcd), leet speak substitutions (p@ssw0rd), and short numeric passwords. Each one is a regex or a simple character code comparison.

**Kept it simple.** Each utility file (sha1.ts, entropy.ts, wordlist.ts, patterns.ts) does one thing. The wordlist loader has a cache to avoid re-fetching, but there's no unnecessary abstraction beyond what was actually needed.

---

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS with custom design tokens
- zxcvbn
- Have I Been Pwned API (k-anonymity)
- Web Crypto API

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000
