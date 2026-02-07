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

const missingList = Array.from(missing);
console.log(`Missing count: ${missingList.length}`);
console.log(missingList.slice(0, 200).join("\n"));
