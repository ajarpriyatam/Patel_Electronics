// Centralized category configuration for the entire application
export const CATEGORIES = {
  // Main categories with consistent naming
  ALL: "all",
  LAPTOPS: "laptop",
  SMARTPHONES: "smartphones",
  AUDIO: "audio",
  ACCESSORIES: "accessories",
  GAMING: "gaming",
  CAMERAS: "camera",
  WEARABLES: "wearables"
};

// Category display configuration
export const CATEGORY_CONFIG = {
  [CATEGORIES.ALL]: {
    title: "Our Collections",
    subtitle: "Discover premium electronics for every need",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
  },
  [CATEGORIES.LAPTOPS]: {
    title: "Laptops & Computers",
    subtitle: "High performance machines for work and play",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
  },
  [CATEGORIES.SMARTPHONES]: {
    title: "Smartphones",
    subtitle: "Latest technology in your pocket",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop"
  },
  [CATEGORIES.AUDIO]: {
    title: "Audio & Headphones",
    subtitle: "Immersive sound experiences",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
  },
  [CATEGORIES.ACCESSORIES]: {
    title: "Tech Accessories",
    subtitle: "Essentials to power your lifestyle",
    image: "https://images.unsplash.com/photo-1625766763788-95dcce9bf5ac?q=80&w=2070&auto=format&fit=crop"
  },
  [CATEGORIES.GAMING]: {
    title: "Gaming Gear",
    subtitle: "Level up your gaming setup",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
  },
  [CATEGORIES.CAMERAS]: {
    title: "Cameras & Photography",
    subtitle: "Capture moments in perfect detail",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1638&auto=format&fit=crop"
  },
  [CATEGORIES.WEARABLES]: {
    title: "Wearable Tech",
    subtitle: "Smart watches and fitness trackers",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=2127&auto=format&fit=crop"
  }
};

// Legacy category mapping for backward compatibility and migration
export const LEGACY_CATEGORY_MAP = {
  "jar_candles": CATEGORIES.SMARTPHONES,
  "pillar_candles": CATEGORIES.LAPTOPS,
  "arome_gift_sets": CATEGORIES.AUDIO,
  "t_light": CATEGORIES.ACCESSORIES,
  "home_decor": CATEGORIES.GAMING,
  "raw_material": CATEGORIES.CAMERAS,
  "humidifiers": CATEGORIES.WEARABLES,
  "hvac": CATEGORIES.ALL,
};

// Helper function to normalize category names
export const normalizeCategory = (category) => {
  if (!category) return CATEGORIES.ALL;

  // Check if it's already a valid category
  if (Object.values(CATEGORIES).includes(category)) {
    return category;
  }

  // Check legacy mapping
  if (LEGACY_CATEGORY_MAP[category]) {
    return LEGACY_CATEGORY_MAP[category];
  }

  // Log unmapped categories for debugging
  console.log(`Unmapped category: "${category}" - defaulting to "all"`);

  // Default to all if not found
  return CATEGORIES.ALL;
};

// Helper function to get category content
export const getCategoryContent = (category) => {
  const normalizedCategory = normalizeCategory(category);
  return CATEGORY_CONFIG[normalizedCategory] || CATEGORY_CONFIG[CATEGORIES.ALL];
};

// All available categories for dropdowns/forms
export const ALL_CATEGORIES = Object.values(CATEGORIES).filter(cat => cat !== CATEGORIES.ALL);

// Category options for forms
export const CATEGORY_OPTIONS = ALL_CATEGORIES.map(category => ({
  value: category,
  label: CATEGORY_CONFIG[category]?.title || category
}));
