import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.join(process.cwd(), "screenshots");

const TEST_PASSWORDS = [
  { label: "empty", value: "", waitMs: 500 },
  { label: "weak", value: "password123", waitMs: 3000 },
  { label: "medium", value: "Tr0ub4dor&3", waitMs: 3000 },
  { label: "strong", value: "kX9#mP2$nQ7@vL4!wR8&", waitMs: 3000 },
];

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

  for (const { label, value, waitMs } of TEST_PASSWORDS) {
    console.log(`📸  Capturing: ${label} (${value || "(empty)"})`);

    await page.goto(BASE_URL, { waitUntil: "networkidle2" });

    if (value) {
      // Click the password input and type
      await page.click('input[type="password"], input[type="text"]');
      await page.type('input[type="password"], input[type="text"]', value, {
        delay: 20,
      });

      // Wait for async results (HIBP + wordlist)
      await new Promise((r) => setTimeout(r, waitMs));
    }

    const outPath = path.join(OUT_DIR, `${label}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`   → saved ${outPath}`);
  }

  await browser.close();
  console.log("\n✅  All screenshots saved to ./screenshots/");
}

run().catch((err) => {
  console.error("Screenshot test failed:", err);
  process.exit(1);
});
