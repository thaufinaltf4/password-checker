const cache = new Map<string, Set<string>>();
const pending = new Map<string, Promise<Set<string>>>();

async function loadList(url: string): Promise<Set<string>> {
  if (cache.has(url)) return cache.get(url)!;

  // pending map prevents duplicate fetches if called concurrently
  if (!pending.has(url)) {
    const promise = fetch(url)
      .then((r) => r.text())
      .then((text) => {
        const set = new Set(
          text.split("\n").map((w) => w.trim().toLowerCase()).filter(Boolean)
        );
        cache.set(url, set);
        pending.delete(url);
        return set;
      });
    pending.set(url, promise);
  }

  return pending.get(url)!;
}

const WORDLISTS = [
  "/wordlists/top10k.txt",
  "/wordlists/rockyou-top100k.txt",
];

export async function isCommonPassword(password: string): Promise<boolean> {
  if (!password) return false;
  const lower = password.toLowerCase();
  const sets = await Promise.all(WORDLISTS.map(loadList));
  return sets.some((set) => set.has(lower));
}
