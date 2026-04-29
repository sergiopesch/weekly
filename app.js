const STORAGE_KEY = "casa-weekly-v1";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_TYPES = ["breakfast", "lunch", "dinner"];
const DEFAULT_PROFILE = { toddler: true, balanced: true, lowSugar: false, quick: true };
const DEFAULT_SETTINGS = {
  homeStyle:
    "Warm, practical, calm, and a little playful. Help us eat well without making meal planning feel like homework.",
  household:
    "Family of three: two adults and one daughter, age three. Breakfast, lunch, and dinner should be nutritious, realistic, and family friendly.",
  promises: {
    useGroceriesFirst: true,
    keepToddlerFriendly: true,
    balanceQuickAndBatch: true,
    avoidWaste: true,
    learnFromFeedback: true,
  },
};

const PROMISE_OPTIONS = [
  {
    id: "useGroceriesFirst",
    label: "Use what we already bought",
    copy: "Meals with basket ingredients rank higher.",
  },
  {
    id: "keepToddlerFriendly",
    label: "Keep our little one in mind",
    copy: "Soft, mild, easy portions stay prioritised.",
  },
  {
    id: "balanceQuickAndBatch",
    label: "Balance quick and batch meals",
    copy: "Fast meals help busy days, batch meals help leftovers.",
  },
  {
    id: "avoidWaste",
    label: "Reduce food waste",
    copy: "Shared ingredients and leftovers become a planning signal.",
  },
  {
    id: "learnFromFeedback",
    label: "Learn from our feedback",
    copy: "Hearts, skips, and notes shape future weeks.",
  },
];

const PROFILE_OPTIONS = [
  {
    id: "toddler",
    label: "Toddler friendly",
    copy: "Soft textures, mild flavour, easy portions.",
  },
  {
    id: "balanced",
    label: "Balanced plates",
    copy: "Protein, fibre, colour, and slow energy.",
  },
  {
    id: "lowSugar",
    label: "Lower sugar",
    copy: "Breakfasts and snacks stay steady.",
  },
  {
    id: "quick",
    label: "Weeknight quick",
    copy: "Most meals land under 30 minutes.",
  },
];

const DEFAULT_PANTRY = [
  "oats",
  "eggs",
  "greek yogurt",
  "berries",
  "rice",
  "chicken",
  "lentils",
  "spinach",
  "sweet potato",
  "tortillas",
  "tomatoes",
  "cheddar",
];

const MEALS = [
  {
    id: "berry-oats",
    type: "breakfast",
    name: "Berry oat bowls",
    time: "10 min",
    emoji: "🥣",
    color: "#8d3d66",
    summary: "Creamy oats with yogurt, berries, seeds, and a tiny drizzle of honey.",
    ingredients: ["oats", "greek yogurt", "berries", "chia seeds", "milk"],
    tags: ["toddler", "balanced", "lowSugar", "quick"],
  },
  {
    id: "egg-toast",
    type: "breakfast",
    name: "Eggy avocado toast",
    time: "15 min",
    emoji: "🥑",
    color: "#247a68",
    summary: "Soft scrambled eggs, avocado, toast fingers, and tomato slices.",
    ingredients: ["eggs", "avocado", "bread", "tomatoes"],
    tags: ["toddler", "balanced", "quick"],
  },
  {
    id: "banana-pancakes",
    type: "breakfast",
    name: "Banana oat pancakes",
    time: "20 min",
    emoji: "🥞",
    color: "#bf7a20",
    summary: "Blender pancakes with oats, banana, eggs, and yogurt on the side.",
    ingredients: ["oats", "banana", "eggs", "greek yogurt", "berries"],
    tags: ["toddler", "balanced"],
  },
  {
    id: "yogurt-crunch",
    type: "breakfast",
    name: "Yogurt crunch cups",
    time: "8 min",
    emoji: "🍓",
    color: "#d83e44",
    summary: "Layered yogurt, berries, granola, and sunflower seeds.",
    ingredients: ["greek yogurt", "berries", "granola", "sunflower seeds"],
    tags: ["toddler", "quick"],
  },
  {
    id: "toast-beans",
    type: "breakfast",
    name: "Tomato beans on toast",
    time: "18 min",
    emoji: "🍅",
    color: "#c05236",
    summary: "White beans warmed with tomatoes, olive oil, and a little cheddar.",
    ingredients: ["bread", "white beans", "tomatoes", "cheddar", "spinach"],
    tags: ["balanced", "quick"],
  },
  {
    id: "chicken-rice-bowls",
    type: "lunch",
    name: "Chicken rice bowls",
    time: "25 min",
    emoji: "🍚",
    color: "#2d6f91",
    summary: "Rice, roast chicken, cucumber, tomatoes, yogurt sauce, and cheddar.",
    ingredients: ["rice", "chicken", "cucumber", "tomatoes", "greek yogurt", "cheddar"],
    tags: ["toddler", "balanced", "quick"],
  },
  {
    id: "lentil-soup",
    type: "lunch",
    name: "Golden lentil soup",
    time: "30 min",
    emoji: "🍲",
    color: "#bf7a20",
    summary: "Lentils, sweet potato, carrots, rice, and spinach for batch-friendly bowls.",
    ingredients: ["lentils", "sweet potato", "carrots", "rice", "spinach"],
    tags: ["toddler", "balanced"],
  },
  {
    id: "tortilla-pockets",
    type: "lunch",
    name: "Warm tortilla pockets",
    time: "15 min",
    emoji: "🌮",
    color: "#247a68",
    summary: "Tortillas folded with chicken, spinach, tomatoes, and melted cheddar.",
    ingredients: ["tortillas", "chicken", "spinach", "tomatoes", "cheddar"],
    tags: ["toddler", "balanced", "quick"],
  },
  {
    id: "egg-fried-rice",
    type: "lunch",
    name: "Egg fried rice",
    time: "18 min",
    emoji: "🥢",
    color: "#6f5f35",
    summary: "Leftover rice with eggs, peas, carrots, and mild sesame flavour.",
    ingredients: ["rice", "eggs", "peas", "carrots", "sesame oil"],
    tags: ["toddler", "balanced", "quick"],
  },
  {
    id: "rainbow-plate",
    type: "lunch",
    name: "Rainbow picky plate",
    time: "12 min",
    emoji: "🥕",
    color: "#8d3d66",
    summary: "Cheddar cubes, boiled egg, toast fingers, fruit, cucumber, and hummus.",
    ingredients: ["eggs", "cheddar", "bread", "cucumber", "berries", "hummus"],
    tags: ["toddler", "balanced", "quick"],
  },
  {
    id: "sheet-pan-chicken",
    type: "dinner",
    name: "Sheet-pan chicken",
    time: "35 min",
    emoji: "🍗",
    color: "#d83e44",
    summary: "Chicken, sweet potato, carrots, and tomatoes roasted for dinner plus lunch.",
    ingredients: ["chicken", "sweet potato", "carrots", "tomatoes", "spinach"],
    tags: ["toddler", "balanced"],
  },
  {
    id: "lentil-bolognese",
    type: "dinner",
    name: "Lentil bolognese",
    time: "35 min",
    emoji: "🍝",
    color: "#c05236",
    summary: "Tomato lentil sauce over pasta with hidden carrots and spinach.",
    ingredients: ["lentils", "pasta", "tomatoes", "carrots", "spinach", "parmesan"],
    tags: ["toddler", "balanced"],
  },
  {
    id: "taco-rice-night",
    type: "dinner",
    name: "Taco rice night",
    time: "25 min",
    emoji: "🌯",
    color: "#247a68",
    summary: "Rice, tortillas, chicken, tomatoes, yogurt, cheddar, and avocado.",
    ingredients: ["rice", "tortillas", "chicken", "tomatoes", "greek yogurt", "cheddar", "avocado"],
    tags: ["toddler", "balanced", "quick"],
  },
  {
    id: "salmon-tray",
    type: "dinner",
    name: "Salmon tray supper",
    time: "30 min",
    emoji: "🐟",
    color: "#2d6f91",
    summary: "Salmon, sweet potato wedges, cucumber yogurt, and wilted spinach.",
    ingredients: ["salmon", "sweet potato", "cucumber", "greek yogurt", "spinach"],
    tags: ["balanced", "quick"],
  },
  {
    id: "breakfast-dinner",
    type: "dinner",
    name: "Breakfast-for-dinner",
    time: "20 min",
    emoji: "🍳",
    color: "#bf7a20",
    summary: "Omelette strips, toast, tomatoes, avocado, and berry yogurt cups.",
    ingredients: ["eggs", "bread", "tomatoes", "avocado", "greek yogurt", "berries"],
    tags: ["toddler", "balanced", "quick"],
  },
];

const DEFAULT_PLAN = {
  Mon: { breakfast: "berry-oats", lunch: "chicken-rice-bowls", dinner: "sheet-pan-chicken" },
  Tue: { breakfast: "egg-toast", lunch: "tortilla-pockets", dinner: "lentil-bolognese" },
  Wed: { breakfast: "banana-pancakes", lunch: "lentil-soup", dinner: "taco-rice-night" },
  Thu: { breakfast: "yogurt-crunch", lunch: "egg-fried-rice", dinner: "salmon-tray" },
  Fri: { breakfast: "toast-beans", lunch: "rainbow-plate", dinner: "breakfast-dinner" },
  Sat: { breakfast: "berry-oats", lunch: "tortilla-pockets", dinner: "sheet-pan-chicken" },
  Sun: { breakfast: "banana-pancakes", lunch: "lentil-soup", dinner: "lentil-bolognese" },
};

const state = loadState();
ensureCurrentWeek();
const mealById = new Map(MEALS.map((meal) => [meal.id, meal]));
let selectedLibraryType = "all";
let dialogSlot = null;

const elements = {
  weekLabel: document.querySelector("#weekLabel"),
  weekGrid: document.querySelector("#weekGrid"),
  helperCards: document.querySelector("#helperCards"),
  memoryScore: document.querySelector("#memoryScore"),
  profileToggles: document.querySelector("#profileToggles"),
  focusLabel: document.querySelector("#focusLabel"),
  avoidInput: document.querySelector("#avoidInput"),
  avoidList: document.querySelector("#avoidList"),
  pantryInput: document.querySelector("#pantryInput"),
  pantryList: document.querySelector("#pantryList"),
  reuseScore: document.querySelector("#reuseScore"),
  sharedCount: document.querySelector("#sharedCount"),
  shoppingCount: document.querySelector("#shoppingCount"),
  shoppingList: document.querySelector("#shoppingList"),
  memoryInput: document.querySelector("#memoryInput"),
  memoryStats: document.querySelector("#memoryStats"),
  memoryList: document.querySelector("#memoryList"),
  homeStyleInput: document.querySelector("#homeStyleInput"),
  householdInput: document.querySelector("#householdInput"),
  promiseList: document.querySelector("#promiseList"),
  tasteProfile: document.querySelector("#tasteProfile"),
  guidePreview: document.querySelector("#guidePreview"),
  mealTabs: document.querySelector("#mealTabs"),
  mealLibrary: document.querySelector("#mealLibrary"),
  mealDialog: document.querySelector("#mealDialog"),
  dialogMealType: document.querySelector("#dialogMealType"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogOptions: document.querySelector("#dialogOptions"),
};

render();
bindEvents();

function loadState() {
  const currentKey = weekKey(new Date());
  const fallback = {
    weekStart: currentKey,
    profile: { ...DEFAULT_PROFILE },
    avoid: [],
    pantry: [...DEFAULT_PANTRY],
    weeks: {
      [currentKey]: createWeek(),
    },
    memory: createMemory(),
    settings: structuredClone(DEFAULT_SETTINGS),
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return fallback;
    const savedWeekStart = normalizeWeekKey(saved.weekStart || currentKey);
    const weeks = saved.weeks && typeof saved.weeks === "object" ? saved.weeks : {};

    if (saved.plan && !weeks[savedWeekStart]) {
      weeks[savedWeekStart] = {
        plan: mergePlan(saved.plan),
        locked: saved.locked || {},
        notes: [],
        updatedAt: new Date().toISOString(),
      };
    }

    return {
      ...fallback,
      ...saved,
      weekStart: savedWeekStart,
      profile: { ...fallback.profile, ...(saved.profile || {}) },
      pantry: Array.isArray(saved.pantry) ? saved.pantry : fallback.pantry,
      avoid: Array.isArray(saved.avoid) ? saved.avoid : fallback.avoid,
      weeks: normalizeWeeks({ ...fallback.weeks, ...weeks }),
      memory: normalizeMemory(saved.memory),
      settings: normalizeSettings(saved.settings),
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createWeek(plan = DEFAULT_PLAN) {
  return {
    plan: mergePlan(plan),
    locked: {},
    notes: [],
    updatedAt: new Date().toISOString(),
  };
}

function createMemory() {
  return {
    favorites: {},
    skips: {},
    notes: [],
    lastUpdatedAt: null,
  };
}

function normalizeWeeks(weeks) {
  return Object.entries(weeks).reduce((normalized, [key, week]) => {
    const normalizedKey = normalizeWeekKey(key);
    normalized[normalizedKey] = {
      plan: mergePlan(week?.plan || DEFAULT_PLAN),
      locked: week?.locked && typeof week.locked === "object" ? week.locked : {},
      notes: Array.isArray(week?.notes) ? week.notes : [],
      updatedAt: week?.updatedAt || new Date().toISOString(),
    };
    return normalized;
  }, {});
}

function normalizeMemory(memory) {
  const fallback = createMemory();
  if (!memory || typeof memory !== "object") return fallback;
  return {
    favorites: memory.favorites && typeof memory.favorites === "object" ? memory.favorites : {},
    skips: memory.skips && typeof memory.skips === "object" ? memory.skips : {},
    notes: Array.isArray(memory.notes) ? memory.notes : [],
    lastUpdatedAt: memory.lastUpdatedAt || null,
  };
}

function normalizeSettings(settings) {
  if (!settings || typeof settings !== "object") return structuredClone(DEFAULT_SETTINGS);
  return {
    homeStyle: typeof settings.homeStyle === "string" ? settings.homeStyle : DEFAULT_SETTINGS.homeStyle,
    household: typeof settings.household === "string" ? settings.household : DEFAULT_SETTINGS.household,
    promises: {
      ...DEFAULT_SETTINGS.promises,
      ...(settings.promises && typeof settings.promises === "object" ? settings.promises : {}),
    },
  };
}

function mergePlan(plan) {
  return DAYS.reduce((merged, day) => {
    merged[day] = { ...DEFAULT_PLAN[day], ...(plan?.[day] || {}) };
    return merged;
  }, {});
}

function ensureCurrentWeek() {
  const key = normalizeWeekKey(state.weekStart);
  state.weekStart = key;
  if (!state.weeks) state.weeks = {};
  if (!state.weeks[key]) state.weeks[key] = createWeek(suggestWeekPlan(key));
}

function getCurrentWeekKey() {
  return normalizeWeekKey(state.weekStart);
}

function currentWeek() {
  ensureCurrentWeek();
  return state.weeks[getCurrentWeekKey()];
}

function currentPlan() {
  return currentWeek().plan;
}

function currentLocked() {
  return currentWeek().locked;
}

function touchCurrentWeek() {
  currentWeek().updatedAt = new Date().toISOString();
}

function render() {
  ensureCurrentWeek();
  renderWeekLabel();
  renderHelpers();
  renderProfile();
  renderPlanner();
  renderPantry();
  renderShopping();
  renderMemory();
  renderSettings();
  renderLibraryTabs();
  renderLibrary();
  saveState();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const { action } = actionTarget.dataset;

    if (action === "previous-week") shiftWeek(-7);
    if (action === "next-week") shiftWeek(7);
    if (action === "reset") resetPlanner();
    if (action === "add-avoid") addAvoid();
    if (action === "remove-avoid") removeAvoid(actionTarget.dataset.value);
    if (action === "add-pantry") addPantry();
    if (action === "remove-pantry") removePantry(actionTarget.dataset.value);
    if (action === "add-memory-note") addMemoryNote();
    if (action === "save-settings") saveSettingsFromInputs();
    if (action === "download-guide") downloadFamilyGuide();
    if (action === "reset-learning") resetLearning();
    if (action === "choose-meal") openMealDialog(actionTarget.dataset.day, actionTarget.dataset.type);
    if (action === "shuffle-meal") shuffleMeal(actionTarget.dataset.day, actionTarget.dataset.type);
    if (action === "toggle-lock") toggleLock(actionTarget.dataset.day, actionTarget.dataset.type);
    if (action === "like-meal") rememberMeal(actionTarget.dataset.mealId);
    if (action === "skip-meal") skipMeal(actionTarget.dataset.day, actionTarget.dataset.type);
    if (action === "fill-week") fillOpenSlots(false);
    if (action === "optimize-week") fillOpenSlots(true);
    if (action === "assign-meal") assignMeal(actionTarget.dataset.mealId);
    if (action === "plan-library-meal") planLibraryMeal(actionTarget.dataset.mealId);
    if (action === "filter-meals") {
      selectedLibraryType = actionTarget.dataset.type;
      renderLibraryTabs();
      renderLibrary();
    }
  });

  elements.profileToggles.addEventListener("change", (event) => {
    if (!event.target.matches("input[type='checkbox']")) return;
    state.profile[event.target.value] = event.target.checked;
    render();
  });

  document.addEventListener("change", (event) => {
    if (!event.target.matches("[data-promise]")) return;
    saveSettingsFromInputs(false);
    state.settings.promises[event.target.value] = event.target.checked;
    render();
  });

  [elements.homeStyleInput, elements.householdInput].forEach((input) => {
    input.addEventListener("input", () => saveSettingsFromInputs(false));
  });

  elements.avoidInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addAvoid();
    }
  });

  elements.pantryInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addPantry();
    }
  });

  elements.memoryInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addMemoryNote();
    }
  });

  elements.shoppingList.addEventListener("change", (event) => {
    if (!event.target.matches("input[type='checkbox']")) return;
    const ingredient = event.target.value;
    if (!state.pantry.includes(ingredient)) state.pantry.push(ingredient);
    render();
  });
}

function renderWeekLabel() {
  const start = dateFromWeekKey(state.weekStart);
  const end = addDays(start, 6);
  elements.weekLabel.textContent = `${formatDate(start)} - ${formatDate(end)}`;
}

function renderHelpers() {
  const context = buildPlanningContext();
  const cards = buildHelperCards(context);
  elements.helperCards.innerHTML = cards
    .map(
      (card) => `
        <article class="helper-card" style="--helper-color: ${card.color}">
          <div class="helper-icon" aria-hidden="true">${card.icon}</div>
          <div>
            <span>${card.role}</span>
            <h3>${card.title}</h3>
            <p>${card.copy}</p>
          </div>
          <strong>${card.metric}</strong>
        </article>
      `,
    )
    .join("");

  const weeksTracked = context.history.weeksTracked;
  const notesTracked = context.history.notesTracked;
  elements.memoryScore.textContent = `${weeksTracked} week${weeksTracked === 1 ? "" : "s"} · ${notesTracked} note${notesTracked === 1 ? "" : "s"}`;
}

function buildPlanningContext() {
  const meals = getPlannedMeals();
  const ingredientMap = ingredientCounts(meals);
  const pantry = new Set(state.pantry);
  const reused = [...ingredientMap.keys()].filter((ingredient) => pantry.has(ingredient)).length;
  const topShared = [...ingredientMap.entries()].sort((a, b) => b[1] - a[1])[0];

  return {
    guide: state.settings,
    profile: state.profile,
    avoid: state.avoid,
    pantry,
    meals,
    currentWeek: currentWeek(),
    weekStart: state.weekStart,
    signals: {
      ingredientMap,
      reuseScore: Math.round((reused / Math.max(ingredientMap.size, 1)) * 100),
      topShared,
      toddlerMeals: meals.filter((meal) => meal.tags.includes("toddler")).length,
      quickMeals: meals.filter((meal) => meal.tags.includes("quick")).length,
      favoriteHits: meals.filter((meal) => state.memory.favorites[meal.id]).length,
      weekNotes: state.memory.notes.filter((note) => note.week === state.weekStart).length,
    },
    history: {
      weeksTracked: Object.keys(state.weeks).length,
      notesTracked: state.memory.notes.length,
      favorites: state.memory.favorites,
      skips: state.memory.skips,
    },
  };
}

function buildHelperCards(context = buildPlanningContext()) {
  const { signals } = context;

  return [
    {
      role: "Shopping helper",
      title: signals.topShared ? `Build around ${signals.topShared[0]}` : "Basket is ready",
      copy: signals.topShared
        ? `${signals.topShared[0]} appears in ${signals.topShared[1]} meals, so this week has a natural reuse anchor.`
        : "Add groceries to the basket and Casa will prioritise reuse.",
      metric: `${signals.reuseScore}% reuse`,
      icon: "🧺",
      color: "#247a68",
    },
    {
      role: "Little plate",
      title: `${signals.toddlerMeals}/21 toddler-ready`,
      copy:
        signals.toddlerMeals >= 18
          ? "Most of the week is mild, soft, and easy to portion."
          : "A few swaps can make the week easier for a three-year-old.",
      metric: state.profile.toddler ? "On" : "Open",
      icon: "🧒",
      color: "#ff5a5f",
    },
    {
      role: "Weekly rhythm",
      title: `${signals.quickMeals} quick meals`,
      copy:
        signals.quickMeals >= 12
          ? "The week is weighted toward easy breakfasts, fast lunches, and calmer evenings."
          : "Use the quick toggle or optimise button if the week looks too prep-heavy.",
      metric: "Flow",
      icon: "⏱",
      color: "#2d6f91",
    },
    {
      role: "Family learning",
      title: signals.favoriteHits ? `${signals.favoriteHits} family wins planned` : "Learning the family taste",
      copy: signals.weekNotes
        ? `${signals.weekNotes} note${signals.weekNotes === 1 ? "" : "s"} saved for this week.`
        : "Heart meals or add notes and future weeks will rank those patterns higher.",
      metric: `${Object.keys(state.memory.favorites).length} favs`,
      icon: "♥",
      color: "#8d3d66",
    },
  ];
}

function renderProfile() {
  elements.profileToggles.innerHTML = PROFILE_OPTIONS.map(
    (option) => `
      <label class="toggle">
        <input type="checkbox" value="${option.id}" ${state.profile[option.id] ? "checked" : ""} />
        <span class="toggle-switch" aria-hidden="true"></span>
        <span>
          <span class="toggle-title">${option.label}</span>
          <span class="toggle-copy">${option.copy}</span>
        </span>
      </label>
    `,
  ).join("");

  const active = PROFILE_OPTIONS.find((option) => state.profile[option.id]);
  elements.focusLabel.textContent = active ? active.label : "Flexible";

  elements.avoidList.innerHTML = state.avoid.length
    ? state.avoid.map((item) => chipTemplate(item, "remove-avoid")).join("")
    : `<p class="empty-state">No avoid list yet.</p>`;
}

function renderPlanner() {
  const start = dateFromWeekKey(state.weekStart);
  const today = new Date();
  elements.weekGrid.innerHTML = DAYS.map((day, index) => {
    const date = addDays(start, index);
    const isToday = isSameDate(date, today);
    const slots = MEAL_TYPES.map((type) => slotTemplate(day, type)).join("");
    return `
      <article class="day-column ${isToday ? "day-today" : ""}">
        <div class="day-head">
          <span>
            <strong>${day}</strong>
            ${isToday ? "<em>Today</em>" : ""}
          </span>
          <span>${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
        </div>
        ${slots}
      </article>
    `;
  }).join("");
}

function slotTemplate(day, type) {
  const plan = currentPlan();
  const locked = Boolean(currentLocked()[slotKey(day, type)]);
  const meal = mealById.get(plan[day]?.[type]);
  if (!meal) {
    return `
      <article class="meal-slot" style="--slot-color: #6d665f">
        <button class="calendar-meal" type="button" data-action="choose-meal" data-day="${day}" data-type="${type}" aria-label="Choose ${type} for ${day}">
          <span class="meal-art" aria-hidden="true">＋</span>
          <span class="meal-title">
            <span class="slot-label">${type}</span>
            <strong>Open slot</strong>
            <small>Choose a meal</small>
          </span>
        </button>
      </article>
    `;
  }

  return `
    <article class="meal-slot" style="--slot-color: ${meal.color}">
      <button class="calendar-meal" type="button" data-action="choose-meal" data-day="${day}" data-type="${type}" aria-label="Swap ${type} on ${day}">
        <span class="meal-art" aria-hidden="true">${meal.emoji}</span>
        <span class="meal-title">
          <span class="slot-label">${type}</span>
          <strong>${meal.name}</strong>
          <small>${meal.time}</small>
        </span>
      </button>
      <div class="slot-controls">
        <span class="slot-icons">
          <button class="icon-button ${locked ? "locked-badge" : ""}" type="button" data-action="toggle-lock" data-day="${day}" data-type="${type}" aria-label="${locked ? "Unlock" : "Lock"} ${type} on ${day}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          </button>
          <button class="icon-button ${state.memory.favorites[meal.id] ? "favorite-badge" : ""}" type="button" data-action="like-meal" data-meal-id="${meal.id}" aria-label="Remember ${meal.name} as a family favourite">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>
          </button>
        </span>
        <button class="visually-hidden" type="button" data-action="shuffle-meal" data-day="${day}" data-type="${type}">Shuffle</button>
        <button class="visually-hidden" type="button" data-action="skip-meal" data-day="${day}" data-type="${type}">Skip</button>
      </div>
    </article>
  `;
}

function renderPantry() {
  elements.pantryList.innerHTML = state.pantry.length
    ? state.pantry.map((item) => chipTemplate(item, "remove-pantry")).join("")
    : `<p class="empty-state">Add groceries already at home.</p>`;
}

function renderShopping() {
  const plannedMeals = getPlannedMeals();
  const needed = ingredientCounts(plannedMeals);
  const pantry = new Set(state.pantry);
  const missing = [...needed.entries()]
    .filter(([ingredient]) => !pantry.has(ingredient))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  const reused = [...needed.keys()].filter((ingredient) => pantry.has(ingredient)).length;
  const total = Math.max(needed.size, 1);
  const score = Math.round((reused / total) * 100);

  elements.reuseScore.textContent = `${score}% reuse`;
  elements.sharedCount.textContent = String([...needed.values()].filter((count) => count > 1).length);
  elements.shoppingCount.textContent = String(missing.length);

  elements.shoppingList.innerHTML = missing.length
    ? missing
        .slice(0, 14)
        .map(
          ([ingredient, count]) => `
            <li class="shopping-item">
              <input type="checkbox" value="${escapeHtml(ingredient)}" aria-label="Mark ${escapeHtml(ingredient)} as bought" />
              <span>${escapeHtml(ingredient)}</span>
              <small>${count}x</small>
            </li>
          `,
        )
        .join("")
    : `<li class="empty-state">Everything planned is in the basket.</li>`;
}

function renderMemory() {
  const favorites = Object.values(state.memory.favorites).reduce((sum, count) => sum + count, 0);
  const skips = Object.values(state.memory.skips).reduce((sum, count) => sum + count, 0);
  elements.memoryStats.innerHTML = `
    <div><span class="signal-label">Weeks</span><strong>${Object.keys(state.weeks).length}</strong></div>
    <div><span class="signal-label">Wins</span><strong>${favorites}</strong></div>
    <div><span class="signal-label">Skips</span><strong>${skips}</strong></div>
  `;

  elements.memoryList.innerHTML = state.memory.notes.length
    ? state.memory.notes
        .slice(0, 4)
        .map(
          (note) => `
            <li>
              <strong>${escapeHtml(note.week)}</strong>
              <span>${escapeHtml(note.text)}</span>
            </li>
          `,
        )
        .join("")
    : `<li class="empty-state">No family notes yet.</li>`;
}

function renderSettings() {
  elements.homeStyleInput.value = state.settings.homeStyle;
  elements.householdInput.value = state.settings.household;
  elements.promiseList.innerHTML = PROMISE_OPTIONS.map(
    (option) => `
      <label class="toggle">
        <input type="checkbox" value="${option.id}" data-promise ${state.settings.promises[option.id] ? "checked" : ""} />
        <span class="toggle-switch" aria-hidden="true"></span>
        <span>
          <span class="toggle-title">${option.label}</span>
          <span class="toggle-copy">${option.copy}</span>
        </span>
      </label>
    `,
  ).join("");
  elements.tasteProfile.innerHTML = tasteProfileTemplate(buildTasteProfile());
  elements.guidePreview.textContent = buildFamilyGuideMarkdown();
}

function buildTasteProfile() {
  const favoriteMeals = Object.entries(state.memory.favorites)
    .map(([mealId, count]) => ({ meal: mealById.get(mealId), count }))
    .filter(({ meal }) => meal)
    .sort((a, b) => b.count - a.count || a.meal.name.localeCompare(b.meal.name));
  const skippedMeals = Object.entries(state.memory.skips)
    .map(([mealId, count]) => ({ meal: mealById.get(mealId), count }))
    .filter(({ meal }) => meal)
    .sort((a, b) => b.count - a.count || a.meal.name.localeCompare(b.meal.name));
  const lovedIngredients = ingredientCounts(favoriteMeals.flatMap(({ meal, count }) => Array(count).fill(meal)));
  const topIngredients = [...lovedIngredients.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5);
  const feedbackCount =
    favoriteMeals.reduce((sum, item) => sum + item.count, 0) +
    skippedMeals.reduce((sum, item) => sum + item.count, 0) +
    state.memory.notes.length;

  return {
    confidence: feedbackCount >= 8 ? "Strong" : feedbackCount >= 3 ? "Growing" : "Early",
    favoriteMeal: favoriteMeals[0]?.meal.name || "Still learning",
    skippedMeal: skippedMeals[0]?.meal.name || "None yet",
    topIngredients,
    feedbackCount,
  };
}

function tasteProfileTemplate(profile) {
  const ingredients = profile.topIngredients.length
    ? profile.topIngredients.map(([ingredient, count]) => `<span>${escapeHtml(ingredient)} <small>${count}</small></span>`).join("")
    : `<span>Waiting for favourites</span>`;
  return `
    <div class="taste-meter">
      <span class="signal-label">Confidence</span>
      <strong>${profile.confidence}</strong>
      <small>${profile.feedbackCount} feedback signal${profile.feedbackCount === 1 ? "" : "s"}</small>
    </div>
    <dl class="taste-facts">
      <div><dt>Most loved</dt><dd>${escapeHtml(profile.favoriteMeal)}</dd></div>
      <div><dt>Often skipped</dt><dd>${escapeHtml(profile.skippedMeal)}</dd></div>
    </dl>
    <div class="taste-ingredients">
      <span class="signal-label">Flavours to reuse</span>
      <div>${ingredients}</div>
    </div>
  `;
}

function renderLibraryTabs() {
  const tabs = ["all", ...MEAL_TYPES];
  elements.mealTabs.innerHTML = tabs
    .map(
      (type) => `
        <button class="filter-tab" type="button" role="tab" aria-selected="${selectedLibraryType === type}" data-action="filter-meals" data-type="${type}">
          ${titleCase(type)}
        </button>
      `,
    )
    .join("");
}

function renderLibrary() {
  const meals = filteredMeals(selectedLibraryType === "all" ? null : selectedLibraryType).slice(0, 12);
  elements.mealLibrary.innerHTML = meals
    .map(
      (meal) => `
        <article class="meal-card" style="--meal-color: ${meal.color}">
          <div class="meal-card-art">
            <span aria-hidden="true">${meal.emoji}</span>
            <span>${meal.time}</span>
          </div>
          <div class="meal-card-body">
            <h3>${meal.name}</h3>
            <p>${meal.summary}</p>
            <div class="tag-row">${meal.tags.slice(0, 3).map((tag) => `<span class="tag">${labelForTag(tag)}</span>`).join("")}</div>
          </div>
          <div class="meal-card-actions">
            <button class="text-button secondary" type="button" data-action="plan-library-meal" data-meal-id="${meal.id}">Plan next</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function openMealDialog(day, type) {
  dialogSlot = { day, type };
  const options = filteredMeals(type);
  elements.dialogMealType.textContent = type;
  elements.dialogTitle.textContent = `${day} ${titleCase(type)}`;
  elements.dialogOptions.innerHTML = options
    .map(
      (meal) => `
        <button class="dialog-option" type="button" data-action="assign-meal" data-meal-id="${meal.id}" style="--slot-color: ${meal.color}">
          <span class="meal-art">${meal.emoji}</span>
          <span>
            <strong>${meal.name}</strong>
            <small>${meal.ingredients.slice(0, 5).join(", ")}</small>
          </span>
          <span class="text-button">Pick</span>
        </button>
      `,
    )
    .join("");
  elements.mealDialog.showModal();
}

function assignMeal(mealId) {
  const meal = mealById.get(mealId);
  if (!meal) return;

  if (!dialogSlot) {
    const target = findFirstOpenSlot(meal.type) || { day: DAYS[0], type: meal.type };
    dialogSlot = target;
  }

  currentPlan()[dialogSlot.day][dialogSlot.type] = mealId;
  touchCurrentWeek();
  dialogSlot = null;
  if (elements.mealDialog.open) elements.mealDialog.close();
  render();
}

function planLibraryMeal(mealId) {
  const meal = mealById.get(mealId);
  if (!meal) return;
  const target = findNextUnlockedSlot(meal.type);
  if (!target) return;
  currentPlan()[target.day][target.type] = meal.id;
  touchCurrentWeek();
  render();
}

function shuffleMeal(day, type) {
  if (currentLocked()[slotKey(day, type)]) return;
  const current = currentPlan()[day]?.[type];
  const candidates = filteredMeals(type).filter((meal) => meal.id !== current);
  const best = rankMealsForGroceries(candidates)[0];
  if (best) {
    currentPlan()[day][type] = best.id;
    touchCurrentWeek();
    render();
  }
}

function toggleLock(day, type) {
  const key = slotKey(day, type);
  const locked = currentLocked();
  if (locked[key]) delete locked[key];
  else locked[key] = true;
  touchCurrentWeek();
  render();
}

function rememberMeal(mealId) {
  if (!mealById.has(mealId)) return;
  state.memory.favorites[mealId] = (state.memory.favorites[mealId] || 0) + 1;
  state.memory.lastUpdatedAt = new Date().toISOString();
  render();
}

function skipMeal(day, type) {
  const mealId = currentPlan()[day]?.[type];
  if (!mealId) return;
  state.memory.skips[mealId] = (state.memory.skips[mealId] || 0) + 1;
  state.memory.lastUpdatedAt = new Date().toISOString();
  shuffleMeal(day, type);
}

function fillOpenSlots(optimize) {
  DAYS.forEach((day) => {
    MEAL_TYPES.forEach((type) => {
      if (currentLocked()[slotKey(day, type)]) return;
      const candidates = filteredMeals(type);
      const ranked = optimize ? rankMealsForGroceries(candidates) : rotateMeals(candidates, day, type);
      if (ranked[0]) currentPlan()[day][type] = ranked[0].id;
    });
  });
  touchCurrentWeek();
  render();
}

function resetPlanner() {
  state.profile = { ...DEFAULT_PROFILE };
  state.avoid = [];
  state.pantry = [...DEFAULT_PANTRY];
  state.weeks[getCurrentWeekKey()] = createWeek();
  render();
}

function addAvoid() {
  const value = normalizeInput(elements.avoidInput.value);
  if (!value || state.avoid.includes(value)) return;
  state.avoid.push(value);
  elements.avoidInput.value = "";
  render();
}

function removeAvoid(value) {
  state.avoid = state.avoid.filter((item) => item !== value);
  render();
}

function addPantry() {
  const value = normalizeInput(elements.pantryInput.value);
  if (!value || state.pantry.includes(value)) return;
  state.pantry.push(value);
  elements.pantryInput.value = "";
  render();
}

function removePantry(value) {
  state.pantry = state.pantry.filter((item) => item !== value);
  render();
}

function addMemoryNote() {
  const value = elements.memoryInput.value.trim();
  if (!value) return;
  state.memory.notes.unshift({
    text: value,
    week: state.weekStart,
    createdAt: new Date().toISOString(),
  });
  state.memory.notes = state.memory.notes.slice(0, 20);
  state.memory.lastUpdatedAt = new Date().toISOString();
  elements.memoryInput.value = "";
  render();
}

function saveSettingsFromInputs(shouldRender = true) {
  state.settings.homeStyle = elements.homeStyleInput.value.trim() || DEFAULT_SETTINGS.homeStyle;
  state.settings.household = elements.householdInput.value.trim() || DEFAULT_SETTINGS.household;
  if (shouldRender) render();
}

function resetLearning() {
  state.memory = createMemory();
  render();
}

function downloadFamilyGuide() {
  saveSettingsFromInputs();
  const blob = new Blob([buildFamilyGuideMarkdown()], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `casa-weekly-family-guide-${state.weekStart}.md`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

function buildFamilyGuideMarkdown() {
  const taste = buildTasteProfile();
  const activePromises = PROMISE_OPTIONS.filter((option) => state.settings.promises[option.id]);
  const favorites = Object.entries(state.memory.favorites)
    .sort((a, b) => b[1] - a[1])
    .map(([mealId, count]) => `- ${mealById.get(mealId)?.name || mealId}: ${count} win${count === 1 ? "" : "s"}`)
    .join("\n");
  const skips = Object.entries(state.memory.skips)
    .sort((a, b) => b[1] - a[1])
    .map(([mealId, count]) => `- ${mealById.get(mealId)?.name || mealId}: ${count} skip${count === 1 ? "" : "s"}`)
    .join("\n");
  const notes = state.memory.notes
    .slice(0, 12)
    .map((note) => `- ${note.week}: ${note.text}`)
    .join("\n");

  return `# Casa Weekly Family Guide

## Home Style

${state.settings.homeStyle}

## Household

${state.settings.household}

## Planning Promises

${activePromises.map((option) => `- ${option.label}: ${option.copy}`).join("\n") || "- No planning promises are currently enabled."}

## What Casa Has Learned

### Taste Profile

- Confidence: ${taste.confidence}
- Most loved: ${taste.favoriteMeal}
- Often skipped: ${taste.skippedMeal}
- Flavours to reuse: ${taste.topIngredients.map(([ingredient]) => ingredient).join(", ") || "Still learning"}

### Family Wins

${favorites || "- No favourite meals saved yet."}

### Skips

${skips || "- No skipped meals saved yet."}

### Notes

${notes || "- No family notes saved yet."}
`;
}

function filteredMeals(type) {
  return MEALS.filter((meal) => {
    if (type && meal.type !== type) return false;
    if (state.avoid.some((avoid) => meal.ingredients.includes(avoid))) return false;
    const activeTags = Object.entries(state.profile)
      .filter(([, enabled]) => enabled)
      .map(([tag]) => tag);
    const requiredTags = activeTags.filter((tag) => tag === "toddler" || tag === "lowSugar");
    return requiredTags.every((tag) => meal.tags.includes(tag));
  });
}

function rankMealsForGroceries(meals) {
  const pantry = new Set(state.pantry);
  const plannedCounts = ingredientCounts(getPlannedMeals());
  return [...meals].sort((a, b) => scoreMeal(b, pantry, plannedCounts) - scoreMeal(a, pantry, plannedCounts));
}

function scoreMeal(meal, pantry, plannedCounts) {
  const promises = state.settings.promises;
  const groceryScore = meal.ingredients.reduce((score, ingredient) => {
    const pantryBoost = promises.useGroceriesFirst && pantry.has(ingredient) ? 5 : 0;
    const reuseBoost = promises.avoidWaste ? plannedCounts.get(ingredient) || 0 : 0;
    return score + pantryBoost + reuseBoost;
  }, 0);
  const profileScore = Object.entries(state.profile).reduce((score, [tag, enabled]) => {
    const toddlerDisabled = tag === "toddler" && !promises.keepToddlerFriendly;
    const quickDisabled = tag === "quick" && !promises.balanceQuickAndBatch;
    return score + (enabled && meal.tags.includes(tag) && !toddlerDisabled && !quickDisabled ? 2 : 0);
  }, 0);
  const memoryScore = promises.learnFromFeedback
    ? (state.memory.favorites[meal.id] || 0) * 4 - (state.memory.skips[meal.id] || 0) * 3
    : 0;
  return groceryScore + profileScore + memoryScore;
}

function rotateMeals(meals, day, type) {
  const offset = DAYS.indexOf(day) + MEAL_TYPES.indexOf(type);
  return [...meals.slice(offset % meals.length), ...meals.slice(0, offset % meals.length)];
}

function getPlannedMeals() {
  const plan = currentPlan();
  return DAYS.flatMap((day) => MEAL_TYPES.map((type) => mealById.get(plan[day]?.[type]))).filter(Boolean);
}

function ingredientCounts(meals) {
  return meals.reduce((map, meal) => {
    meal.ingredients.forEach((ingredient) => map.set(ingredient, (map.get(ingredient) || 0) + 1));
    return map;
  }, new Map());
}

function findFirstOpenSlot(type) {
  const plan = currentPlan();
  const locked = currentLocked();
  for (const day of DAYS) {
    if (!plan[day][type] && !locked[slotKey(day, type)]) return { day, type };
  }
  return null;
}

function findNextUnlockedSlot(type) {
  const todayIndex = new Date().getDay();
  const startIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  const orderedDays = [...DAYS.slice(startIndex), ...DAYS.slice(0, startIndex)];
  return orderedDays
    .map((day) => ({ day, type }))
    .find(({ day, type: mealType }) => !currentLocked()[slotKey(day, mealType)]);
}

function shiftWeek(days) {
  state.weekStart = weekKey(addDays(dateFromWeekKey(state.weekStart), days));
  ensureCurrentWeek();
  render();
}

function suggestWeekPlan(key) {
  const pantry = new Set(state?.pantry || DEFAULT_PANTRY);
  const memory = state?.memory || createMemory();
  const promises = state?.settings?.promises || DEFAULT_SETTINGS.promises;
  const weekOffset = hashString(key);

  return DAYS.reduce((plan, day, dayIndex) => {
    plan[day] = {};
    MEAL_TYPES.forEach((type, typeIndex) => {
      const candidates = MEALS.filter((meal) => meal.type === type && !hasAvoidedIngredient(meal))
        .map((meal) => ({
          meal,
          score:
            (promises.useGroceriesFirst ? meal.ingredients.filter((ingredient) => pantry.has(ingredient)).length * 4 : 0) +
            (promises.learnFromFeedback ? (memory.favorites[meal.id] || 0) * 5 - (memory.skips[meal.id] || 0) * 4 : 0) +
            (promises.keepToddlerFriendly && meal.tags.includes("toddler") ? 2 : 0) +
            (promises.balanceQuickAndBatch && meal.tags.includes("quick") ? 1 : 0),
        }))
        .sort((a, b) => b.score - a.score || a.meal.name.localeCompare(b.meal.name))
        .map(({ meal }) => meal);
      const index = (weekOffset + dayIndex + typeIndex) % Math.max(candidates.length, 1);
      plan[day][type] = candidates[index]?.id || DEFAULT_PLAN[day][type];
    });
    return plan;
  }, {});
}

function hasAvoidedIngredient(meal) {
  return (state?.avoid || []).some((avoid) => meal.ingredients.includes(avoid));
}

function hashString(value) {
  return [...String(value)].reduce((hash, character) => hash + character.charCodeAt(0), 0);
}

function chipTemplate(item, action) {
  return `
    <span class="chip">
      ${escapeHtml(item)}
      <button type="button" data-action="${action}" data-value="${escapeHtml(item)}" aria-label="Remove ${escapeHtml(item)}">×</button>
    </span>
  `;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function normalizeInput(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function getMonday(date) {
  const next = new Date(date);
  const day = next.getDay();
  const diff = next.getDate() - day + (day === 0 ? -6 : 1);
  next.setHours(0, 0, 0, 0);
  next.setDate(diff);
  return next;
}

function weekKey(date) {
  const monday = getMonday(date instanceof Date ? date : new Date(date));
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, "0");
  const day = String(monday.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeWeekKey(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? weekKey(new Date()) : weekKey(date);
}

function dateFromWeekKey(key) {
  const [year, month, day] = normalizeWeekKey(key).split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function isSameDate(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function labelForTag(tag) {
  const option = PROFILE_OPTIONS.find((item) => item.id === tag);
  return option ? option.label : titleCase(tag);
}

function slotKey(day, type) {
  return `${day}:${type}`;
}
