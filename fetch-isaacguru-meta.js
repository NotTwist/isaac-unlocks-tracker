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

function parseDescription(html) {
  const headerRegex =
    /<h1[^>]*class="[^"]*wiki-header[^"]*"[^>]*>\s*Description\s*<\/h1>/i;
  let match = headerRegex.exec(html);
  if (!match) {
    const idRegex = /<h1[^>]*id="description"[^>]*>\s*Description\s*<\/h1>/i;
    match = idRegex.exec(html);
  }
  if (!match) return null;
  const start = match.index + match[0].length;
  const rest = html.slice(start);
  const nextHeaderIndex = rest.search(
    /<h1[^>]*class="[^"]*wiki-header[^"]*"[^>]*>/i
  );
  const block =
    nextHeaderIndex === -1 ? rest : rest.slice(0, nextHeaderIndex);
  const paragraphMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!paragraphMatch) return null;
  const cleaned = paragraphMatch[1]
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .trim();
  return cleaned || null;
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
        const description = parseDescription(html);
        const title = parseTitle(html);
        results[String(numeric)] = { quality, imageUrl, description, name: title };
        if (title) {
          const normalized = normalizeName(title);
          if (!resultsByName[normalized]) {
            resultsByName[normalized] = {
              id: String(numeric),
              name: title,
              quality,
              imageUrl,
              description,
            };
          }
        }
      } catch (error) {
        results[String(numeric)] = {
          quality: null,
          imageUrl: null,
          description: null,
          name: null,
        };
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
  const outputByNameJs = path.join(__dirname, "item-meta-by-name.js");
  fs.writeFileSync(
    outputByNameJs,
    `const ITEM_META_BY_NAME = ${JSON.stringify(resultsByName, null, 2)};\n`
  );
  console.log(`Saved ${Object.keys(results).length} entries to ${outputPath}`);
  console.log(
    `Saved ${Object.keys(resultsByName).length} entries to ${outputByName}`
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
