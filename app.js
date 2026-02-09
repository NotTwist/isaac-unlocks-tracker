const STORAGE_KEY = "isaacUnlockTracker_v1";

const MARKS = [
  {
    id: "moms_heart",
    label: "Mom's Heart / It Lives",
    iconUrl:
      "assets/Completion_Heart.png",
    iconUrlHard:
      "assets/Completion_Heart_Hard.png",
  },
  {
    id: "boss_rush",
    label: "Boss Rush",
    iconUrl:
      "assets/Completion_BossRush.png",
    iconUrlHard:
      "assets/Completion_BossRush_Hard.png",
  },
  {
    id: "isaac",
    label: "Isaac",
    iconUrl:
      "assets/Completion_Cathedral.png",
    iconUrlHard:
      "assets/Completion_Cathedral_Hard.png",
  },
  {
    id: "satan",
    label: "Satan",
    iconUrl:
      "assets/Completion_Sheol.png",
    iconUrlHard:
      "assets/Completion_Sheol_Hard.png",
  },
  {
    id: "blue_baby",
    label: "???",
    iconUrl:
      "assets/Completion_Chest.png",
    iconUrlHard:
      "assets/Completion_Chest_Hard.png",
  },
  {
    id: "lamb",
    label: "The Lamb",
    iconUrl:
      "assets/Completion_DarkRoom.png",
    iconUrlHard:
      "assets/Completion_DarkRoom_Hard.png",
  },
  {
    id: "mega_satan",
    label: "Mega Satan",
    iconUrl:
      "assets/Completion_Brimstone.png",
    iconUrlHard:
      "assets/Completion_Brimstone_Hard.png",
  },
  {
    id: "greed",
    label: "Ultra Greed",
    iconUrl:
      "assets/Completion_Greed.png",
    iconUrlHard:
      "assets/Completion_Greed.png",
  },
  {
    id: "greedier",
    label: "Ultra Greedier",
    iconUrl:
      "assets/Completion_Greed_Hard.png",
    iconUrlHard:
      "assets/Completion_Greed_Hard.png",
  },
  {
    id: "hush",
    label: "Hush",
    iconUrl:
      "assets/Completion_BlueWomb.png",
    iconUrlHard:
      "assets/Completion_BlueWomb_Hard.png",
  },
  {
    id: "delirium",
    label: "Delirium",
    iconUrl: "assets/Repentance_Completion_Void.png",
    iconUrlHard: "assets/Repentance_Completion_Void_Hard.png",
    usePaperBackground: true,
  },
  {
    id: "mother",
    label: "Mother",
    iconUrl:
      "assets/Completion_Mother.png",
    iconUrlHard:
      "assets/Completion_Mother_Hard.png",
  },
  {
    id: "beast",
    label: "The Beast",
    iconUrl:
      "assets/Completion_Beast.png",
    iconUrlHard:
      "assets/Completion_Beast_Hard.png",
  },
];

const MARK_POSITIONS = {
  moms_heart: { x: 25, y: 9 },
  isaac: { x: 40, y: 20 },
  blue_baby: { x: 54, y: 27 },
  greed: { x: 65, y: 13 },
  greedier: { x: 70, y: 30 },
  satan: { x: 28, y: 30 },
  lamb: { x: 42, y: 42 },
  mega_satan: { x: 59, y: 46 },
  boss_rush: { x: 15, y: 42 },
  hush: { x: 14, y: 62 },
  mother: { x: 30, y: 58 },
  beast: { x: 47, y: 65 },
  delirium: { x: 73.4, y: 76.6 },
};

const BASE_CHARACTERS = [
  { id: "isaac", name: "Isaac", initials: "IS" },
  { id: "magdalene", name: "Magdalene", initials: "MG" },
  { id: "cain", name: "Cain", initials: "CA" },
  { id: "judas", name: "Judas", initials: "JU" },
  { id: "blue_baby", name: "Blue Baby", initials: "BB" },
  { id: "eve", name: "Eve", initials: "EV" },
  { id: "samson", name: "Samson", initials: "SA" },
  { id: "azazel", name: "Azazel", initials: "AZ" },
  { id: "lazarus", name: "Lazarus", initials: "LA" },
  { id: "eden", name: "Eden", initials: "ED" },
  { id: "the_lost", name: "The Lost", initials: "LO" },
  { id: "lilith", name: "Lilith", initials: "LI" },
  { id: "keeper", name: "Keeper", initials: "KE" },
  { id: "apollyon", name: "Apollyon", initials: "AP" },
  { id: "the_forgotten", name: "The Forgotten", initials: "FO" },
  { id: "bethany", name: "Bethany", initials: "BE" },
  { id: "jacob_esau", name: "Jacob & Esau", initials: "J+E" },
];

const CHARACTERS = [
  ...BASE_CHARACTERS.map((char) => ({ ...char, group: "regular" })),
  ...BASE_CHARACTERS.map((char) => ({
    id: `t_${char.id}`,
    name: `Tainted ${char.name}`,
    initials: `T${char.initials}`,
    group: "tainted",
  })),
];

const CHARACTER_ID_BY_NAME = {
  Isaac: "isaac",
  Magdalene: "magdalene",
  Cain: "cain",
  Judas: "judas",
  "???": "blue_baby",
  Eve: "eve",
  Samson: "samson",
  Azazel: "azazel",
  Lazarus: "lazarus",
  Eden: "eden",
  "The Lost": "the_lost",
  Lilith: "lilith",
  Keeper: "keeper",
  Apollyon: "apollyon",
  "The Forgotten": "the_forgotten",
  Bethany: "bethany",
  "Jacob & Esau": "jacob_esau",
  "Tainted Isaac": "t_isaac",
  "Tainted Magdalene": "t_magdalene",
  "Tainted Cain": "t_cain",
  "Tainted Judas": "t_judas",
  "Tainted ???": "t_blue_baby",
  "Tainted Eve": "t_eve",
  "Tainted Samson": "t_samson",
  "Tainted Azazel": "t_azazel",
  "Tainted Lazarus": "t_lazarus",
  "Tainted Eden": "t_eden",
  "Tainted Lost": "t_the_lost",
  "Tainted Lilith": "t_lilith",
  "Tainted Keeper": "t_keeper",
  "Tainted Apollyon": "t_apollyon",
  "Tainted Forgotten": "t_the_forgotten",
  "Tainted Bethany": "t_bethany",
  "Tainted Jacob": "t_jacob_esau",
};

const CHARACTER_IMAGE_OVERRIDES = {
  isaac: "https://isaacguru.com/core/assets/img/items/Isaac.webp",
  "blue baby": "https://isaacguru.com/core/assets/img/items/Blue_Baby.webp",
  "tainted blue baby":
    "https://isaacguru.com/core/assets/img/items/Tainted_Blue_Baby.webp",
  "tainted the lost":
    "https://isaacguru.com/core/assets/img/items/Tainted_Lost.webp",
  "tainted the forgotten":
    "https://isaacguru.com/core/assets/img/items/Tainted_Forgotten.webp",
  "tainted jacob and esau":
    "https://isaacguru.com/core/assets/img/items/Tainted_Jacob.webp",
};

const MARK_PATTERNS = [
  { id: "greedier", patterns: ["Ultra Greedier"] },
  { id: "greed", patterns: ["Ultra Greed"] },
  { id: "mega_satan", patterns: ["Mega Satan"] },
  { id: "boss_rush", patterns: ["Boss Rush"] },
  { id: "moms_heart", patterns: ["Mom's Heart", "It Lives"] },
  { id: "blue_baby", patterns: ["???"] },
  { id: "isaac", patterns: ["Isaac"] },
  { id: "satan", patterns: ["Satan"] },
  { id: "lamb", patterns: ["The Lamb"] },
  { id: "hush", patterns: ["Hush"] },
  { id: "delirium", patterns: ["Delirium"] },
  { id: "mother", patterns: ["Mother"] },
  { id: "beast", patterns: ["The Beast"] },
];

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
  "fart baby": "farting baby",
};

const ITEMS = buildItemsFromCsv(
  typeof UNLOCKS_CSV === "object" && UNLOCKS_CSV ? UNLOCKS_CSV : {}
);

const DEFAULT_STATE = {
  selectedCharacterId: CHARACTERS[0].id,
  marksByCharacter: {},
};

const state = loadState();

const regularList = document.getElementById("regularList");
const taintedList = document.getElementById("taintedList");
const characterPanelRegular = document.getElementById("characterPanelRegular");
const characterPanelTainted = document.getElementById("characterPanelTainted");
const characterNameRegular = document.getElementById("characterNameRegular");
const characterNameTainted = document.getElementById("characterNameTainted");
const characterSpriteRegular = document.getElementById("characterSpriteRegular");
const characterSpriteTainted = document.getElementById("characterSpriteTainted");
const characterProgressRegular = document.getElementById("characterProgressRegular");
const characterProgressTainted = document.getElementById("characterProgressTainted");
const marksGridRegular = document.getElementById("marksGridRegular");
const marksGridTainted = document.getElementById("marksGridTainted");
const specialUnlockRegular = document.getElementById("specialUnlockRegular");
const specialUnlockTainted = document.getElementById("specialUnlockTainted");
const recommendations = document.getElementById("recommendations");
const characterSearch = document.getElementById("characterSearch");

const exportBtn = document.getElementById("exportBtn");
const importInput = document.getElementById("importInput");
const resetBtn = document.getElementById("resetBtn");
const saveImportTrigger = document.getElementById("saveImportTrigger");
const saveImportInput = document.getElementById("saveImportInput");
const saveImportModal = document.getElementById("saveImportModal");
const saveImportClose = document.getElementById("saveImportClose");
const saveDropZone = document.getElementById("saveDropZone");

const toggleRecommendationsBottom = document.getElementById("toggleRecommendationsBottom");
const toggleRecommendationsLess = document.getElementById("toggleRecommendationsLess");
const toggleRecommendationButtons = [toggleRecommendationsBottom].filter(Boolean);
const RECOMMENDATION_BATCH = 10;
let recommendationLimit = RECOMMENDATION_BATCH;

const markTooltip = document.createElement("div");
markTooltip.id = "markTooltip";
markTooltip.className = "mark-tooltip";
markTooltip.style.display = "none";
document.body.appendChild(markTooltip);
let tooltipHideTimer = null;
let activeTooltipKey = null;
let tooltipLocked = false;

function cancelTooltipHide() {
  if (tooltipHideTimer) {
    window.clearTimeout(tooltipHideTimer);
    tooltipHideTimer = null;
  }
}

function scheduleHideMarkTooltip() {
  cancelTooltipHide();
  hideMarkTooltip();
}

renderCharacters();
renderSelectedCharacter();
renderRecommendations();

markTooltip.addEventListener("mouseenter", cancelTooltipHide);
markTooltip.addEventListener("mouseleave", scheduleHideMarkTooltip);

characterSearch.addEventListener("input", (event) => {
  renderCharacters(event.target.value.trim().toLowerCase());
});

toggleRecommendationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    recommendationLimit += RECOMMENDATION_BATCH;
    renderRecommendations();
  });
});
if (toggleRecommendationsLess) {
  toggleRecommendationsLess.addEventListener("click", () => {
    recommendationLimit = RECOMMENDATION_BATCH;
    renderRecommendations();
  });
}

exportBtn.addEventListener("click", () => {
  const payload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    marksByCharacter: state.marksByCharacter,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "isaac-unlock-progress.json";
  link.click();
  URL.revokeObjectURL(url);
});

importInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!parsed.marksByCharacter || typeof parsed.marksByCharacter !== "object") {
      throw new Error("Invalid file format.");
    }
    state.marksByCharacter = parsed.marksByCharacter;
    saveState(state);
    renderSelectedCharacter();
    renderRecommendations();
  } catch (error) {
    alert("Could not import progress. Check the file format.");
  }
  event.target.value = "";
});

if (saveImportInput) {
  const openSaveImportModal = () => {
    if (!saveImportModal) return;
    saveImportModal.classList.remove("hidden");
    saveImportModal.setAttribute("aria-hidden", "false");
  };

  const closeSaveImportModal = () => {
    if (!saveImportModal) return;
    saveImportModal.classList.add("hidden");
    saveImportModal.setAttribute("aria-hidden", "true");
    saveDropZone?.classList.remove("is-dragover");
  };

  const importSaveFile = async (file) => {
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      let marks = {};
      try {
        marks = extractMarksFromSave(buffer);
      } catch (markError) {
        const achievements = extractAchievementsFromSave(buffer);
        const map = await getSteamAchievementMap();
        marks = mapAchievementsToMarks(achievements, map);
      }
      if (!Object.keys(marks).length) {
        throw new Error("No marks mapped from savefile achievements.");
      }
      state.marksByCharacter = marks;
      saveState(state);
      updateSidebarProgress();
      renderSelectedCharacter();
      renderRecommendations();
      alert("Save file imported.");
    } catch (error) {
      alert(`Save import failed: ${error.message}`);
    }
  };

  if (saveImportTrigger) {
    saveImportTrigger.addEventListener("click", () => {
      openSaveImportModal();
    });
  }

  if (saveImportModal) {
    saveImportModal.addEventListener("click", (event) => {
      if (event.target === saveImportModal || event.target.classList.contains("modal-backdrop")) {
        closeSaveImportModal();
      }
    });
  }

  if (saveImportClose) {
    saveImportClose.addEventListener("click", () => {
      closeSaveImportModal();
    });
  }

  if (saveDropZone) {
    const highlight = (active) => {
      if (active) {
        saveDropZone.classList.add("is-dragover");
      } else {
        saveDropZone.classList.remove("is-dragover");
      }
    };

    ["dragenter", "dragover"].forEach((eventName) => {
      saveDropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        highlight(true);
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      saveDropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        highlight(false);
      });
    });

    saveDropZone.addEventListener("drop", async (event) => {
      const file = event.dataTransfer?.files?.[0];
      await importSaveFile(file);
      closeSaveImportModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSaveImportModal();
    }
  });

  saveImportInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    await importSaveFile(file);
    closeSaveImportModal();
    event.target.value = "";
  });
}

resetBtn.addEventListener("click", () => {
  const confirmed = window.confirm("Reset all saved progress?");
  if (!confirmed) return;
  state.marksByCharacter = {};
  saveState(state);
  updateSidebarProgress();
  renderSelectedCharacter();
  renderRecommendations();
});

async function getSteamAchievementMap() {
  const response = await fetch("steam-achievement-map.json");
  if (!response.ok) {
    throw new Error("Missing steam-achievement-map.json.");
  }
  const raw = await response.text();
  const cleaned = raw.replace(/^\uFEFF/, "").trim();
  const mapData = JSON.parse(cleaned);
  return mapData.mapping || mapData;
}

function extractMarksFromSave(buffer) {
  const data = new Uint8Array(buffer);
  const sectionOffsets = getSectionOffsets(data);
  if (!sectionOffsets[1]) {
    throw new Error("Save section offsets missing.");
  }
  const characterIds = [
    ...BASE_CHARACTERS.map((char) => char.id),
    ...BASE_CHARACTERS.map((char) => `t_${char.id}`),
  ];
  const markIndexToId = [
    "moms_heart",
    "isaac",
    "satan",
    "boss_rush",
    "blue_baby",
    "lamb",
    "mega_satan",
    "greed",
    "hush",
    "delirium",
    "mother",
    "beast",
  ];
  const marks = {};
  characterIds.forEach((characterId, index) => {
    const rawMarks = getChecklistUnlocks(data, sectionOffsets, index);
    rawMarks.forEach((rawValue, markIndex) => {
      const markId = markIndexToId[markIndex];
      if (!markId) return;
      const soloDifficulty = getSoloDifficulty(rawValue);
      if (!soloDifficulty) return;
      if (!marks[characterId]) marks[characterId] = {};
      if (markId === "greed") {
        if (soloDifficulty === 2) {
          marks[characterId].greedier = "hard";
          marks[characterId].greed = "hard";
        } else {
          marks[characterId].greed = "hard";
        }
        return;
      }
      marks[characterId][markId] = "hard";
    });
  });
  return marks;
}

function extractAchievementsFromSave(buffer) {
  const view = new DataView(buffer);
  const decoder = new TextDecoder("utf-8");
  const header = decoder.decode(buffer.slice(0, 16)).replace(/\0/g, "");
  if (
    !header.startsWith("ISAACNGSAVE") &&
    !header.startsWith("ISAACNG_GSR")
  ) {
    throw new Error("Not a recognized Isaac save file.");
  }
  let offset = 20; // 16-byte header + 4-byte CRC
  for (let i = 0; i < 11; i += 1) {
    const type = view.getInt32(offset, true);
    const len = view.getInt32(offset + 4, true);
    offset += 8;
    if (type === 1) {
      const count = view.getInt32(offset, true);
      offset += 4;
      const achievements = new Uint8Array(buffer, offset, count);
      return achievements;
    }
    if (type === 2 || type === 3 || type === 8 || type === 9) {
      const count = view.getInt32(offset, true);
      offset += 4 + count * 4;
      continue;
    }
    if (type === 4 || type === 5 || type === 6 || type === 7 || type === 10) {
      const count = view.getInt32(offset, true);
      offset += 4 + count;
      continue;
    }
    if (type === 11) {
      const count = view.getUint32(offset, true);
      offset += 4;
      for (let j = 0; j < count; j += 1) {
        const entryCount = view.getInt32(offset + 4, true);
        offset += 8 + entryCount * 2;
      }
      continue;
    }
    offset += Math.max(len, 0);
  }
  throw new Error("Achievements chunk not found.");
}

function mapAchievementsToMarks(achievements, map) {
  const marks = {};
  for (let i = 1; i < achievements.length; i += 1) {
    if (!achievements[i]) continue;
    const mapping = map[String(i)];
    if (!mapping) continue;
    const { characterId, markIds } = mapping;
    if (!characterId || !Array.isArray(markIds)) continue;
    const normalizedMarkIds = markIds.includes("mega_satan")
      ? markIds.filter((markId) => markId !== "satan")
      : markIds;
    if (!marks[characterId]) marks[characterId] = {};
    normalizedMarkIds.forEach((markId) => {
      marks[characterId][markId] = "hard";
    });
  }
  return marks;
}

function getSectionOffsets(data) {
  const entryLens = [1, 4, 4, 1, 1, 1, 1, 4, 4, 1, 546];
  const results = new Array(entryLens.length).fill(0);
  let offset = 0x14;
  for (let i = 0; i < entryLens.length; i += 1) {
    const sectionIndex = readUint32LE(data, offset);
    const sectionSize = readUint32LE(data, offset + 4);
    const sectionCount = readUint32LE(data, offset + 8);
    offset += 12;
    if (!results[i]) {
      results[i] = offset;
    }
    offset += entryLens[i] * sectionCount;
  }
  return results;
}

function getChecklistUnlocks(data, sectionOffsets, charIndex) {
  const numberOfMarks = 12;
  const resultData = new Array(numberOfMarks).fill(0);
  if (charIndex === 14) {
    let offset = sectionOffsets[1] + 0x32c;
    for (let i = 0; i < numberOfMarks; i += 1) {
      const currentOffset = offset + i * 4;
      resultData[i] = readUint32LE(data, currentOffset);
      if (i === 8) offset += 0x4;
      if (i === 9) offset += 0x37c;
      if (i === 10) offset += 0x84;
    }
  } else if (charIndex > 14) {
    let offset = sectionOffsets[1] + 0x31c;
    for (let i = 0; i < numberOfMarks; i += 1) {
      const currentOffset = offset + charIndex * 4 + i * 19 * 4;
      resultData[i] = readUint32LE(data, currentOffset);
      if (i === 8) offset += 0x4c;
      if (i === 9 || i === 10) offset += 0x3c;
    }
  } else {
    let offset = sectionOffsets[1] + 0x6c;
    for (let i = 0; i < numberOfMarks; i += 1) {
      const currentOffset = offset + charIndex * 4 + i * 14 * 4;
      resultData[i] = readUint32LE(data, currentOffset);
      if (i === 5) offset += 0x14;
      if (i === 8) offset += 0x3c;
      if (i === 9) offset += 0x3b0;
      if (i === 10) offset += 0x50;
    }
  }
  return resultData;
}

function getSoloDifficulty(value) {
  const solo = value & 0b11;
  return solo === 3 ? 2 : solo;
}

function readUint32LE(data, offset) {
  return (
    data[offset] |
    (data[offset + 1] << 8) |
    (data[offset + 2] << 16) |
    (data[offset + 3] << 24)
  ) >>> 0;
}


function renderCharacters(filter = "") {
  regularList.innerHTML = "";
  if (taintedList) {
    taintedList.innerHTML = "";
  }
  const characterById = new Map(CHARACTERS.map((char) => [char.id, char]));
  const matchesFilter = (char) =>
    !filter || char.name.toLowerCase().includes(filter);
  const renderEntry = (char) => {
    const entry = document.createElement("div");
    entry.className = "character-entry";
    if (char.id === state.selectedCharacterId) {
      entry.classList.add("active");
    }

    const pill = document.createElement("div");
    pill.className = "character-pill";
    const imageUrl = getCharacterImageUrl(char.name);
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = char.name;
      img.className = "character-image";
      img.referrerPolicy = "no-referrer";
      pill.appendChild(img);
    } else {
      pill.textContent = char.initials;
    }

    const name = document.createElement("span");
    name.textContent = char.name;

    entry.appendChild(pill);
    entry.appendChild(name);
    return entry;
  };
  const renderProgress = (char, column) => {
    const progress = document.createElement("div");
    progress.className = "character-progress";
    progress.style.gridColumn = String(column);
    progress.style.gridRow = "2";
    const stats = getCompletionStats(char.id);
    progress.title = `${stats.completed} / ${stats.total} marks`;
    const fill = document.createElement("div");
    fill.className = "character-progress-fill";
    fill.dataset.characterId = char.id;
    fill.style.width = `${stats.percent}%`;
    progress.appendChild(fill);
    return progress;
  };
  BASE_CHARACTERS.forEach((base) => {
    const regular = characterById.get(base.id);
    const tainted = characterById.get(`t_${base.id}`);
    const showRegular = regular && matchesFilter(regular);
    const showTainted = tainted && matchesFilter(tainted);
    if (!showRegular && !showTainted) {
      return;
    }
    const row = document.createElement("li");
    row.className = "character-row";
    if (base.id === getBaseCharacterId(state.selectedCharacterId)) {
      row.classList.add("active");
    }
    row.addEventListener("click", () => {
      state.selectedCharacterId = base.id;
      saveState(state);
      renderCharacters(filter);
      renderSelectedCharacter();
    });
    if (showRegular) {
      row.appendChild(renderEntry(regular));
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "character-entry placeholder";
      row.appendChild(placeholder);
    }
    if (showTainted) {
      row.appendChild(renderEntry(tainted));
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "character-entry placeholder";
      row.appendChild(placeholder);
    }
    if (showRegular) {
      row.appendChild(renderProgress(regular, 1));
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "character-progress placeholder";
      placeholder.style.gridColumn = "1";
      placeholder.style.gridRow = "2";
      row.appendChild(placeholder);
    }
    if (showTainted) {
      row.appendChild(renderProgress(tainted, 2));
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "character-progress placeholder";
      placeholder.style.gridColumn = "2";
      placeholder.style.gridRow = "2";
      row.appendChild(placeholder);
    }
    regularList.appendChild(row);
  });
}

function buildItemsFromCsv(csvMap) {
  const items = [];
  Object.values(csvMap).forEach((csvText) => {
    if (!csvText) return;
    let currentCharacterId = null;
    const lines = csvText.split(/\r?\n/);
    lines.forEach((line) => {
      if (!line.trim()) return;
      const columns = parseCsvLine(line);
      const header = columns[0] ? columns[0].trim() : "";
      if (header.endsWith("Completion Marks")) {
        const name = header.replace(" Completion Marks", "");
        currentCharacterId = CHARACTER_ID_BY_NAME[name] || null;
        return;
      }
      if (!currentCharacterId) return;
      const itemId = columns[0] ? columns[0].trim() : "";
      const itemName = columns[1] ? columns[1].trim() : "";
      const condition = columns[2] ? columns[2].trim() : "";
      if (!itemId || !itemName || !condition) return;
      const normalizedName = normalizeItemName(itemName);
      const meta =
        typeof ITEM_META_BY_NAME === "object" && ITEM_META_BY_NAME
          ? ITEM_META_BY_NAME[normalizedName]
          : null;
      const requirement = parseUnlockCondition(condition);
      items.push({
        id: `item_${itemId}`,
        itemId,
        name: meta && meta.name ? meta.name : itemName,
        quality: meta ? meta.quality : null,
        imageUrl: meta ? meta.imageUrl : null,
        description: meta ? meta.description : null,
        sourceId: meta ? meta.id : null,
        unlock: {
          characterId: currentCharacterId,
          markIds: requirement.markIds,
        },
        allMarks: requirement.allMarks,
        manualUnlock: requirement.manualUnlock,
        conditionText: condition,
      });
    });
  });
  return items;
}

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  result.push(current);
  return result;
}

function normalizeItemName(name) {
  const normalized = name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\?+/g, " question ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
  return ITEM_NAME_ALIASES[normalized] || normalized;
}

function normalizeCharacterName(name) {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\?+/g, " question ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function getCharacterImageUrl(name) {
  const normalized = normalizeCharacterName(name);
  if (CHARACTER_IMAGE_OVERRIDES[normalized]) {
    return CHARACTER_IMAGE_OVERRIDES[normalized];
  }
  if (typeof CHARACTER_META_BY_NAME === "object" && CHARACTER_META_BY_NAME) {
    const entry = CHARACTER_META_BY_NAME[normalized];
    return entry ? entry.imageUrl : null;
  }
  return null;
}

function parseUnlockCondition(condition) {
  const normalized = condition.toLowerCase();
  const strippedCharacter = normalized.replace(/\s+as\s+[^,]+$/i, "");
  if (
    normalized.includes("earn all hard mode completion marks") ||
    normalized.includes("12 completion marks on hard mode")
  ) {
    return { markIds: MARKS.map((mark) => mark.id), allMarks: true };
  }

  const matched = [];
  MARK_PATTERNS.forEach((entry) => {
    entry.patterns.forEach((pattern) => {
      if (strippedCharacter.includes(pattern.toLowerCase())) {
        matched.push(entry.id);
      }
    });
  });

  const unique = Array.from(new Set(matched));
  if (unique.includes("greedier") && unique.includes("greed")) {
    const index = unique.indexOf("greed");
    if (index !== -1) {
      unique.splice(index, 1);
    }
  }
  return {
    markIds: unique,
    allMarks: false,
    manualUnlock: unique.length === 0,
  };
}

function renderSelectedCharacter() {
  const baseId = getBaseCharacterId(state.selectedCharacterId);
  const regular = CHARACTERS.find((char) => char.id === baseId);
  const tainted = CHARACTERS.find((char) => char.id === `t_${baseId}`);
  renderCharacterPane(regular, {
    panel: characterPanelRegular,
    name: characterNameRegular,
    sprite: characterSpriteRegular,
    progress: characterProgressRegular,
    marksGrid: marksGridRegular,
    specialUnlock: specialUnlockRegular,
  });
  renderCharacterPane(tainted, {
    panel: characterPanelTainted,
    name: characterNameTainted,
    sprite: characterSpriteTainted,
    progress: characterProgressTainted,
    marksGrid: marksGridTainted,
    specialUnlock: specialUnlockTainted,
  });
}

function renderCharacterPane(character, pane) {
  if (!character) {
    if (pane.panel) {
      pane.panel.style.display = "none";
    }
    return;
  }
  if (pane.panel) {
    pane.panel.style.display = "";
  }
  pane.name.textContent = character.name;
  pane.sprite.innerHTML = "";
  const spriteUrl = getCharacterImageUrl(character.name);
  if (spriteUrl) {
    const img = document.createElement("img");
    img.src = spriteUrl;
    img.alt = character.name;
    img.className = "character-image large";
    img.referrerPolicy = "no-referrer";
    pane.sprite.appendChild(img);
  } else {
    pane.sprite.textContent = character.initials;
  }

  const marksGrid = pane.marksGrid;
  marksGrid.innerHTML = "";
  const marksState = getMarksForCharacter(character.id);
  let completedCount = 0;
  marksGrid.onclick = (event) => {
    if (event.target !== marksGrid) return;
    const current = normalizeMarkState(marksState.delirium, "delirium");
    marksState.delirium = getNextMarkState(current, "delirium");
    state.marksByCharacter[character.id] = marksState;
    saveState(state);
    updateSidebarProgress();
    renderSelectedCharacter();
    renderRecommendations();
  };
  marksGrid.addEventListener("pointermove", (event) => {
    if (event.target !== marksGrid) return;
    const tooltipKey = `${character.id}:delirium`;
    if (activeTooltipKey === tooltipKey) return;
    showMarkTooltip("delirium", character.id, marksGrid, false);
  });
  marksGrid.addEventListener("mouseleave", scheduleHideMarkTooltip);
  const deliriumState = normalizeMarkState(marksState.delirium, "delirium");
  marksGrid.classList.toggle("hard-paper", deliriumState === "hard");

  MARKS.forEach((mark) => {
    const markState = getEffectiveMarkState(marksState, mark.id);
    completedCount += countMarkCompletion(mark.id, markState);
    if (mark.usePaperBackground) {
      return;
    }
    const markCard = document.createElement("div");
    markCard.className = "mark";
    markCard.dataset.markId = mark.id;
    markCard.title = mark.label;
    markCard.setAttribute("aria-label", mark.label);
    const position = MARK_POSITIONS[mark.id];
    if (position) {
      markCard.style.left = `${position.x}%`;
      markCard.style.top = `${position.y}%`;
    }
    if (markState === "hard") {
      markCard.classList.add("checked");
    } else if (markState === "dim") {
      markCard.classList.add("dim");
    }
    markCard.addEventListener("click", () => {
      const nextState = getNextMarkState(markState, mark.id);
      marksState[mark.id] = nextState;
      state.marksByCharacter[character.id] = marksState;
      saveState(state);
      updateSidebarProgress();
      renderSelectedCharacter();
      renderRecommendations();
    });
    markCard.addEventListener("mouseenter", () => {
      if (tooltipLocked && activeTooltipKey !== `${character.id}:${mark.id}`) {
        return;
      }
      showMarkTooltip(mark.id, character.id, markCard, true);
    });
    markCard.addEventListener("mouseleave", scheduleHideMarkTooltip);

    const icon = document.createElement("img");
    icon.className = "mark-icon-img";
    icon.alt = mark.label;
    icon.src = markState === "hard" ? mark.iconUrlHard : mark.iconUrl;
    icon.referrerPolicy = "no-referrer";
    markCard.appendChild(icon);
    marksGrid.appendChild(markCard);
  });

  const specialContainer = pane.specialUnlock;
  if (specialContainer) {
    specialContainer.innerHTML = "";
    specialContainer.style.display = "none";
    const allMarksItems = ITEMS.filter(
      (item) =>
        item.allMarks &&
        item.unlock &&
        item.unlock.characterId === character.id &&
        isCollectibleItem(item)
    );
    if (allMarksItems.length) {
      specialContainer.style.display = "flex";
      allMarksItems.forEach((item) => {
        const isUnlocked = isItemUnlocked(item);
        const card = document.createElement("div");
        card.className = "special-unlock-card";
        if (!isUnlocked) {
          card.classList.add("locked");
        }
        if (item.imageUrl) {
          const icon = document.createElement("img");
          icon.className = "special-unlock-icon";
          icon.src = item.imageUrl;
          icon.alt = item.name;
          icon.referrerPolicy = "no-referrer";
          card.appendChild(icon);
        }
        const text = document.createElement("div");
        text.className = "special-unlock-text";
        const title = document.createElement("div");
        title.className = "special-unlock-title";
        title.textContent = item.name;
        const subtitle = document.createElement("div");
        subtitle.className = "special-unlock-subtitle";
        subtitle.textContent = "All completion marks reward";
        text.appendChild(title);
        text.appendChild(subtitle);
        card.appendChild(text);
        card.addEventListener("mouseenter", () => {
          if (
            tooltipLocked &&
            activeTooltipKey !== `${character.id}:allmarks:${item.id}`
          ) {
            return;
          }
          showSpecialUnlockTooltip(item, character.id, card);
        });
        card.addEventListener("mouseleave", scheduleHideMarkTooltip);
        specialContainer.appendChild(card);
      });
    }
  }

  pane.progress.textContent = `${completedCount} / ${getTotalMarks()} marks`;
}

function renderRecommendations() {
  const weights = {
    quality: 0.6,
    community: 0.3,
    manual: 0.1,
  };

  const candidates = ITEMS.map((item) => {
    const unlocked = isItemUnlocked(item);
    return { ...item, unlocked };
  }).filter((item) => !item.unlocked);

  const scored = candidates.map((item) => {
    const qualityScore = (item.quality ?? 0) * 25;
    const communityScore = item.communityTier
      ? (6 - item.communityTier) * 20
      : 0;
    const manualScore = item.score ?? 0;
    const score =
      weights.quality * qualityScore +
      weights.community * communityScore +
      weights.manual * manualScore;
    return { ...item, scoreComputed: Math.round(score) };
  });

  scored.sort((a, b) => b.scoreComputed - a.scoreComputed);

  recommendations.innerHTML = "";
  const baseLimit = Math.min(recommendationLimit, scored.length);
  const containerWidth = recommendations.clientWidth || 0;
  const minCardWidth = 400;
  const gridGap = 16;
  const columns = Math.max(
    1,
    Math.floor((containerWidth + gridGap) / (minCardWidth + gridGap))
  );
  const remainder = baseLimit % columns;
  const limit =
    remainder === 0
      ? baseLimit
      : Math.min(scored.length, baseLimit + (columns - remainder));
  scored.slice(0, limit).forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.addEventListener("click", () => focusUnlock(item));

    if (item.imageUrl) {
      const icon = document.createElement("img");
      icon.className = "item-icon";
      icon.src = item.imageUrl;
      icon.alt = item.name;
      icon.referrerPolicy = "no-referrer";
      if (item.sourceId) {
        const iconLink = document.createElement("a");
        iconLink.href = `https://isaacguru.com/wiki/isaac/c${item.sourceId}`;
        iconLink.target = "_blank";
        iconLink.rel = "noreferrer";
        iconLink.className = "item-icon-link";
        iconLink.appendChild(icon);
        card.appendChild(iconLink);
      } else {
        card.appendChild(icon);
      }
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h4");
    title.textContent = item.name;

    const meta = document.createElement("div");
    meta.className = "meta";
    const charName = getCharacterName(item.unlock.characterId);
    const markLabel = getUnlockLabel(item);
    meta.textContent = `${charName} • ${markLabel}`;

    const badges = document.createElement("div");
    const qualityValue =
      typeof item.quality === "number" ? item.quality : "unknown";
    badges.innerHTML = `
      <span class="badge quality-q${qualityValue}">Q${item.quality ?? "?"}</span>
    `;
    badges.className = "badge-row";

    const description = document.createElement("div");
    description.className = "item-description";
    description.textContent = item.description ?? "No description available.";
    description.title = description.textContent;
    const descriptionToggle = document.createElement("button");
    descriptionToggle.type = "button";
    descriptionToggle.className = "desc-toggle";
    descriptionToggle.textContent = "More";
    if (!item.description || item.description.length < 180) {
      descriptionToggle.style.display = "none";
    }
    descriptionToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const expanded = description.classList.toggle("expanded");
      descriptionToggle.textContent = expanded ? "Less" : "More";
    });

    body.appendChild(title);
    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";
    metaRow.appendChild(meta);
    metaRow.appendChild(badges);
    body.appendChild(metaRow);
    body.appendChild(description);
    body.appendChild(descriptionToggle);
    card.appendChild(body);
    recommendations.appendChild(card);
  });

  if (!scored.length) {
    recommendations.innerHTML = `<div class="card">No locked items left in the list.</div>`;
  }
  toggleRecommendationButtons.forEach((button) => {
    if (scored.length <= limit) {
      button.style.display = "none";
    } else {
      button.style.display = "inline-flex";
      button.textContent = "...";
    }
  });
  if (toggleRecommendationsLess) {
    toggleRecommendationsLess.style.display =
      recommendationLimit > RECOMMENDATION_BATCH ? "inline-flex" : "none";
  }
}

function getMarksForCharacter(characterId) {
  return state.marksByCharacter[characterId] || {};
}

function updateSidebarProgress() {
  const fills = document.querySelectorAll(".character-progress-fill");
  fills.forEach((fill) => {
    const characterId = fill.dataset.characterId;
    if (!characterId) return;
    const stats = getCompletionStats(characterId);
    fill.style.width = `${stats.percent}%`;
    const wrapper = fill.parentElement;
    if (wrapper) {
      wrapper.title = `${stats.completed} / ${stats.total} marks`;
    }
  });
}

function getCompletionStats(characterId) {
  const marks = getMarksForCharacter(characterId);
  let completed = 0;
  MARKS.forEach((mark) => {
    const state = getEffectiveMarkState(marks, mark.id);
    completed += countMarkCompletion(mark.id, state);
  });
  const total = getTotalMarks();
  const percent = total ? Math.min(100, Math.round((completed / total) * 100)) : 0;
  return { completed, total, percent };
}

function getBaseCharacterId(characterId) {
  return characterId.startsWith("t_") ? characterId.slice(2) : characterId;
}

function getMarksGridForCharacter(characterId) {
  return characterId.startsWith("t_") ? marksGridTainted : marksGridRegular;
}

function showMarkTooltip(markId, characterId, anchor, lockTooltip = true) {
  cancelTooltipHide();
  const tooltipKey = `${characterId}:${markId}`;
  if (activeTooltipKey === tooltipKey && markTooltip.style.display === "block") {
    return;
  }
  activeTooltipKey = tooltipKey;
  tooltipLocked = lockTooltip;
  let matches = ITEMS.filter((item) => {
    if (!item.unlock || item.unlock.characterId !== characterId) return false;
    return item.unlock.markIds.includes(markId);
  })
    .filter((item) => !item.allMarks)
    .filter((item) => item.imageUrl || item.sourceId);
  if (!matches.length) {
    hideMarkTooltip();
    return;
  }
  const sorted = matches.slice().sort((a, b) => {
    const aq = typeof a.quality === "number" ? a.quality : -1;
    const bq = typeof b.quality === "number" ? b.quality : -1;
    return bq - aq;
  });
  const item = sorted[0];

  markTooltip.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card mark-tooltip-card";

  if (item.imageUrl) {
    const icon = document.createElement("img");
    icon.className = "item-icon";
    icon.src = item.imageUrl;
    icon.alt = item.name;
    icon.referrerPolicy = "no-referrer";
    card.appendChild(icon);
  }

  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h4");
  title.textContent = item.name;
  const metaRow = document.createElement("div");
  metaRow.className = "meta-row";
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${getCharacterName(characterId)} • ${getMarkName(markId)}`;
  const badges = document.createElement("div");
  badges.className = "badge-row";
  const qualityValue =
    typeof item.quality === "number" ? item.quality : "unknown";
  badges.innerHTML = `<span class="badge quality-q${qualityValue}">Q${
    item.quality ?? "?"
  }</span>`;
  metaRow.appendChild(meta);
  metaRow.appendChild(badges);

  const description = document.createElement("div");
  description.className = "item-description";
  description.textContent = item.description ?? "No description available.";
  description.title = description.textContent;
  description.classList.add("expanded");
  const descToggle = document.createElement("button");
  descToggle.type = "button";
  descToggle.className = "desc-toggle";
  descToggle.textContent = "More";
  descToggle.style.display = "none";

  body.appendChild(title);
  body.appendChild(metaRow);
  body.appendChild(description);
  body.appendChild(descToggle);

  if (sorted.length > 1) {
    const list = document.createElement("div");
    list.className = "tooltip-unlock-list";
    sorted.slice(1).forEach((entry) => {
      const row = document.createElement("div");
      row.className = "tooltip-unlock-item";
      const entryQuality =
        typeof entry.quality === "number" ? entry.quality : "unknown";
      row.innerHTML = `
        <span class="badge quality-q${entryQuality}">Q${entry.quality ?? "?"}</span>
        <span>${entry.name}</span>
      `;
      list.appendChild(row);
    });
    body.appendChild(list);
  }

  card.appendChild(body);
  markTooltip.appendChild(card);
  markTooltip.style.display = "block";

  const rect = anchor.getBoundingClientRect();
  const tooltipRect = markTooltip.getBoundingClientRect();
  const padding = 12;
  let left = rect.right + padding;
  let top = rect.top + window.scrollY - tooltipRect.height / 2 + rect.height / 2;

  const maxLeft = window.scrollX + window.innerWidth - tooltipRect.width - padding;
  if (left > maxLeft) {
    left = rect.left + window.scrollX - tooltipRect.width - padding;
  }
  if (left < padding) {
    left = padding;
  }
  const minTop = window.scrollY + padding;
  const maxTop = window.scrollY + window.innerHeight - tooltipRect.height - padding;
  if (top < minTop) top = minTop;
  if (top > maxTop) top = maxTop;

  markTooltip.style.left = `${left}px`;
  markTooltip.style.top = `${top}px`;
}

function showSpecialUnlockTooltip(item, characterId, anchor) {
  if (!item) return;
  cancelTooltipHide();
  const tooltipKey = `${characterId}:allmarks:${item.id}`;
  if (activeTooltipKey === tooltipKey && markTooltip.style.display === "block") {
    return;
  }
  activeTooltipKey = tooltipKey;
  tooltipLocked = true;
  markTooltip.innerHTML = "";
  const card = document.createElement("div");
  card.className = "card mark-tooltip-card";

  if (item.imageUrl) {
    const icon = document.createElement("img");
    icon.className = "item-icon";
    icon.src = item.imageUrl;
    icon.alt = item.name;
    icon.referrerPolicy = "no-referrer";
    card.appendChild(icon);
  }

  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h4");
  title.textContent = item.name;
  const metaRow = document.createElement("div");
  metaRow.className = "meta-row";
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${getCharacterName(characterId)} • All completion marks`;
  const badges = document.createElement("div");
  badges.className = "badge-row";
  const qualityValue =
    typeof item.quality === "number" ? item.quality : "unknown";
  badges.innerHTML = `<span class="badge quality-q${qualityValue}">Q${
    item.quality ?? "?"
  }</span>`;
  metaRow.appendChild(meta);
  metaRow.appendChild(badges);

  const description = document.createElement("div");
  description.className = "item-description";
  description.textContent = item.description ?? "No description available.";
  description.title = description.textContent;
  description.classList.add("expanded");
  const descToggle = document.createElement("button");
  descToggle.type = "button";
  descToggle.className = "desc-toggle";
  descToggle.textContent = "More";
  descToggle.style.display = "none";

  body.appendChild(title);
  body.appendChild(metaRow);
  body.appendChild(description);
  body.appendChild(descToggle);
  card.appendChild(body);
  markTooltip.appendChild(card);
  markTooltip.style.display = "block";

  const rect = anchor.getBoundingClientRect();
  const tooltipRect = markTooltip.getBoundingClientRect();
  const padding = 12;
  let left = rect.right + padding;
  let top = rect.top + window.scrollY - tooltipRect.height / 2 + rect.height / 2;

  const maxLeft = window.scrollX + window.innerWidth - tooltipRect.width - padding;
  if (left > maxLeft) {
    left = rect.left + window.scrollX - tooltipRect.width - padding;
  }
  if (left < padding) {
    left = padding;
  }
  const minTop = window.scrollY + padding;
  const maxTop = window.scrollY + window.innerHeight - tooltipRect.height - padding;
  if (top < minTop) top = minTop;
  if (top > maxTop) top = maxTop;

  markTooltip.style.left = `${left}px`;
  markTooltip.style.top = `${top}px`;
}

function hideMarkTooltip() {
  cancelTooltipHide();
  activeTooltipKey = null;
  tooltipLocked = false;
  markTooltip.style.display = "none";
}

function getCharacterName(characterId) {
  const char = CHARACTERS.find((entry) => entry.id === characterId);
  return char ? char.name : "Unknown";
}

function isCollectibleItem(item) {
  if (!item) return false;
  if (item.imageUrl && item.imageUrl.includes("/collectibles/")) return true;
  if (item.imageUrl && item.imageUrl.includes("collectibles_")) return true;
  return false;
}

function getMarkName(markId) {
  const mark = MARKS.find((entry) => entry.id === markId);
  return mark ? mark.label : "Unknown";
}

function getUnlockLabel(item) {
  if (item.allMarks) return "All completion marks";
  if (!item.unlock.markIds.length) return "Special unlock";
  return item.unlock.markIds.map(getMarkName).join(" + ");
}

function focusUnlock(item) {
  if (!item || !item.unlock) return;
  state.selectedCharacterId = getBaseCharacterId(item.unlock.characterId);
  saveState(state);
  renderCharacters();
  renderSelectedCharacter();

  const marksToHighlight = item.allMarks
    ? MARKS.map((mark) => mark.id)
    : item.unlock.markIds;
  if (!marksToHighlight.length) return;

  const targetGrid = getMarksGridForCharacter(item.unlock.characterId);
  if (!targetGrid) return;
  window.requestAnimationFrame(() => {
    marksToHighlight.forEach((markId) => {
      const markEl = targetGrid.querySelector(`[data-mark-id="${markId}"]`);
      if (!markEl) {
        if (markId === "delirium") {
          targetGrid.classList.add("pulse-strong");
          window.setTimeout(() => targetGrid.classList.remove("pulse-strong"), 1400);
        }
        return;
      }
      markEl.classList.add("pulse-strong");
      window.setTimeout(() => markEl.classList.remove("pulse-strong"), 1400);
    });
  });
}

function isItemUnlocked(item) {
  const marks = getMarksForCharacter(item.unlock.characterId);
  if (item.allMarks) {
    return MARKS.every((mark) =>
      isMarkHardCompleted(mark.id, getEffectiveMarkState(marks, mark.id))
    );
  }
  if (!item.unlock.markIds.length) return false;
  return item.unlock.markIds.every((markId) =>
    isMarkCompleted(markId, getEffectiveMarkState(marks, markId))
  );
}

function normalizeMarkState(value, markId) {
  if (value === true) return "hard";
  if (value === false || value == null) {
    return "dim";
  }
  if (value === "hard" || value === "normal" || value === "dim") {
    return value === "normal" ? "dim" : value;
  }
  return "dim";
}

function getNextMarkState(current, markId) {
  if (current === "hard") return "dim";
  return "hard";
}

function isMarkCompleted(markId, state) {
  return state === "hard";
}

function isMarkHardCompleted(markId, state) {
  return state === "hard";
}

function getEffectiveMarkState(marksState, markId) {
  return normalizeMarkState(marksState[markId], markId);
}

function countMarkCompletion(markId, state) {
  return state === "hard" ? 1 : 0;
}

function getTotalMarks() {
  return MARKS.length;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return { ...DEFAULT_STATE };
    return {
      ...DEFAULT_STATE,
      ...saved,
      marksByCharacter: saved.marksByCharacter || {},
    };
  } catch (error) {
    return { ...DEFAULT_STATE };
  }
}

function saveState(nextState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
}
