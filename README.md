# Isaac Unlock Tracker

Static web app for tracking completion marks and recommending the next unlock.

## Run
Open `index.html` in a browser.

## Customize data
- Unlock data is embedded in `data.js` from the CSVs you provided.
- Item quality and images come from IsaacGuru (Repentance+).

To refresh item metadata:
1. Run `node fetch-isaacguru-meta.js`
2. Run `node -e "const fs=require('fs');const json=JSON.parse(fs.readFileSync('item-meta-by-name.json','utf8'));fs.writeFileSync('item-meta-by-name.js','const ITEM_META_BY_NAME = '+JSON.stringify(json,null,2)+';\\n');"`

To refresh character images:
1. Run `node fetch-isaacguru-characters.js`
2. Run `node -e "const fs=require('fs');const json=JSON.parse(fs.readFileSync('character-meta-by-name.json','utf8'));fs.writeFileSync('character-meta-by-name.js','const CHARACTER_META_BY_NAME = '+JSON.stringify(json,null,2)+';\\n');"`

Each item entry expects:

```js
{
  id: "unique_id",
  name: "Item Name",
  quality: 0-4,
  communityTier: 1-5, // 1 best
  score: 0-100, // manual boost
  unlock: { characterId: "isaac", markId: "hush" },
  note: "Optional note"
}
```
