const fs = require("fs");
const path = require("path");
const https = require("https");

const MAX_CHR_ID = 40;
const resultsByName = {};

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

function parseTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  if (!match) return null;
  return match[1].replace(" - The Binding of Isaac - IsaacGuru", "").trim();
}

function parseImage(html) {
  const match = html.match(/property="og:image" content="([^"]+)"/);
  return match ? match[1] : null;
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
  for (let chrId = 1; chrId <= MAX_CHR_ID; chrId += 1) {
    const url = `https://isaacguru.com/wiki/isaac/chr${chrId}`;
    try {
      const html = await fetchHtml(url);
      const name = parseTitle(html);
      const imageUrl = parseImage(html);
      if (name && imageUrl) {
        const normalized = normalizeName(name);
        resultsByName[normalized] = {
          id: String(chrId),
          name,
          imageUrl,
        };
      }
    } catch (error) {
      // Skip missing pages.
    }
  }

  const outputByName = path.join(__dirname, "character-meta-by-name.json");
  fs.writeFileSync(outputByName, JSON.stringify(resultsByName, null, 2));
  console.log(
    `Saved ${Object.keys(resultsByName).length} entries to ${outputByName}`
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
