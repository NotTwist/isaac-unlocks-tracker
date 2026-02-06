const fs = require("fs");
const path = require("path");
const https = require("https");

const MAX_ID = 732;
const results = {};
const resultsByName = {};
let completed = 0;

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      }
    );
    request.on("error", reject);
  });
}

function parseQuality(html) {
  const index = html.indexOf("item-quality-container");
  if (index === -1) return null;
  const block = html.slice(index, index + 600);
  const matches = [...block.matchAll(/--x:\s*(-?\d+)px/g)].map((m) =>
    Number(m[1])
  );
  if (!matches.length) return null;
  const filled = matches.filter((value) => value === -416).length;
  const empty = matches.filter((value) => value === -400).length;
  if (filled + empty === 0) return null;
  return filled;
}

function parseImage(html) {
  const match = html.match(/property="og:image" content="([^"]+)"/);
  return match ? match[1] : null;
}

function parseTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (!match) return null;
  return match[1].replace(" - The Binding of Isaac - IsaacGuru", "").trim();
}

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\?+/g, " question ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

async function run() {
  if (process.argv.includes("--debug")) {
    const testId = process.argv[process.argv.indexOf("--debug") + 1] || "1";
    const html = await fetchHtml(`https://isaacguru.com/wiki/isaac/c${testId}`);
    const snippet = html.slice(
      html.indexOf("item-quality-container"),
      html.indexOf("item-quality-container") + 600
    );
    console.log(snippet);
    const blockMatch = snippet.match(/--x:\s*(-?\d+)px/g) || [];
    console.log("Raw --x matches:", blockMatch);
    const globalBlock = html.match(/item-quality-container[\s\S]*?<\/span>/i);
    console.log("Global block found:", Boolean(globalBlock));
    if (globalBlock) {
      const matches = [...globalBlock[0].matchAll(/--x:\s*(-?\d+)px/g)].map(
        (m) => Number(m[1])
      );
      console.log("Global --x values:", matches);
    }
    console.log("Quality:", parseQuality(html));
    console.log("Image:", parseImage(html));
    return;
  }
  const concurrency = 6;
  const queue = Array.from({ length: MAX_ID }, (_, idx) => idx + 1);
  const workers = new Array(concurrency).fill(0).map(async () => {
    while (queue.length) {
      const numeric = queue.shift();
      const url = `https://isaacguru.com/wiki/isaac/c${numeric}`;
      try {
        const html = await fetchHtml(url);
        const quality = parseQuality(html);
        const imageUrl = parseImage(html);
        const title = parseTitle(html);
        results[String(numeric)] = { quality, imageUrl, name: title };
        if (title) {
          const normalized = normalizeName(title);
          if (!resultsByName[normalized]) {
            resultsByName[normalized] = {
              id: String(numeric),
              name: title,
              quality,
              imageUrl,
            };
          }
        }
      } catch (error) {
        results[String(numeric)] = { quality: null, imageUrl: null, name: null };
      }
      completed += 1;
      if (completed % 50 === 0) {
        console.log(`Fetched ${completed}/${MAX_ID}`);
      }
    }
  });

  await Promise.all(workers);
  const outputPath = path.join(__dirname, "item-meta.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  const outputByName = path.join(__dirname, "item-meta-by-name.json");
  fs.writeFileSync(outputByName, JSON.stringify(resultsByName, null, 2));
  console.log(`Saved ${Object.keys(results).length} entries to ${outputPath}`);
  console.log(
    `Saved ${Object.keys(resultsByName).length} entries to ${outputByName}`
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
