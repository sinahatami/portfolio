/**
 * Lighthouse audit of a running site, on mobile and desktop.
 *
 *   yarn build && yarn start      # in one terminal
 *   yarn lighthouse [url]         # default http://localhost:3000
 *
 * Prints the four category scores and writes HTML reports to .lighthouse/.
 * Exits non-zero when a score drops below LIGHTHOUSE_MIN (default 90).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const url = process.argv[2] ?? "http://localhost:3000";
const minimum = Number(process.env.LIGHTHOUSE_MIN ?? 90);
const outDir = new URL("../.lighthouse/", import.meta.url);
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

await mkdir(outDir, { recursive: true });
const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox"],
});

let failed = false;
try {
  for (const [name, config] of [
    ["mobile", undefined],
    ["desktop", desktopConfig],
  ]) {
    const result = await lighthouse(
      url,
      { port: chrome.port, output: "html", onlyCategories: CATEGORIES },
      config
    );
    if (!result) throw new Error(`Lighthouse returned no result for ${url}`);

    const { categories, audits } = result.lhr;
    const scores = CATEGORIES.map((id) => {
      const score = Math.round((categories[id]?.score ?? 0) * 100);
      if (score < minimum) failed = true;
      return `${categories[id]?.title ?? id} ${score}`;
    });
    const vitals = [
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
    ]
      .map((id) => `${audits[id]?.title}: ${audits[id]?.displayValue}`)
      .join(", ");

    // Failing audits outside performance, which has its own metrics above.
    const issues = ["accessibility", "best-practices", "seo"].flatMap((id) =>
      (categories[id]?.auditRefs ?? [])
        .filter((ref) => ref.weight > 0 && audits[ref.id]?.score === 0)
        .map((ref) => audits[ref.id]?.title)
    );

    const report = new URL(`${name}.html`, outDir);
    await writeFile(report, result.report);
    console.log(`${name.padEnd(8)} ${scores.join("  ")}`);
    console.log(`${" ".repeat(9)}${vitals}`);
    for (const issue of issues) console.log(`${" ".repeat(9)}Fix: ${issue}`);
    console.log(`${" ".repeat(9)}Report: ${report.pathname}`);
  }
} finally {
  await chrome.kill();
}

if (failed) {
  console.error(`A category scored below ${minimum}.`);
  process.exitCode = 1;
}
