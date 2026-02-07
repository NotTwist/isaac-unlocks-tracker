const fs = require("fs");
const vm = require("vm");

const base = "c:/Users/Sergey/Documents/isaac/";
const meta = JSON.parse(fs.readFileSync(base + "item-meta-by-name.json", "utf8"));
const code = fs.readFileSync(base + "data.js", "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(`${code}\nthis.UNLOCKS_CSV = UNLOCKS_CSV;`, sandbox);
const UNLOCKS_CSV = sandbox.UNLOCKS_CSV;

const normalize = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\?+/g, " question ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");

const ITEM_NAME_ALIASES = {
  "celctic cross": "celtic cross",
  "sacraficial dagger": "sacrificial dagger",
  "temporary tatoo": "temporary tattoo",
  "the high priesstess": "the high priestess",
  "euthanesia": "euthanasia",
  "soul of lillith": "soul of lilith",
  "abbadon": "abaddon",
  "samson s chain": "samson s chains",
  "cricket leg": "cricket s leg",
  "the d20": "d20",
  "the d100": "d100",
};

const missing = new Set();
Object.values(UNLOCKS_CSV).forEach((csv) => {
  if (!csv) return;
  csv.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const cols = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        const nxt = line[i + 1];
        if (q && nxt === '"') {
          cur += '"';
          i += 1;
        } else {
          q = !q;
        }
        continue;
      }
      if (ch === "," && !q) {
        cols.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    cols.push(cur);
    const header = cols[0] ? cols[0].trim() : "";
    if (header.endsWith("Completion Marks")) return;
    const name = cols[1] ? cols[1].trim() : "";
    if (!name) return;
    const key = normalize(name);
    if (!meta[key]) missing.add(name);
  });
});

const matches = [];
const nonmatches = [];
missing.forEach((name) => {
  const key = normalize(name);
  if (meta[key]) {
    matches.push({ name, key, reason: "direct" });
    return;
  }
  const alias = ITEM_NAME_ALIASES[key];
  if (alias && meta[alias]) {
    matches.push({ name, key: alias, reason: "alias" });
    return;
  }
  const noThe = key.replace(/^the\s+/, "");
  if (meta[noThe]) {
    matches.push({ name, key: noThe, reason: "drop the" });
    return;
  }
  const noA = key.replace(/^(a|an)\s+/, "");
  if (meta[noA]) {
    matches.push({ name, key: noA, reason: "drop a/an" });
    return;
  }
  nonmatches.push(name);
});

matches.sort((a, b) => a.name.localeCompare(b.name));
console.log("Missing count:", missing.size);
console.log("Likely items (match metadata):", matches.length);
matches.forEach((m) => console.log(`${m.name} -> ${m.key} (${m.reason})`));
console.log("\nNon-matches (likely non-collectibles):", nonmatches.length);
nonmatches.forEach((n) => console.log(n));
