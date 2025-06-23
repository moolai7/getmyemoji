
import type { EmojiCategory } from './types.ts';

// export const OPENMOJI_JSON_URL = 'https://unpkg.com/openmoji@latest/data/openmoji.json'; // Original URL causing issues

// Alternative for base JSON if needed:
export const OPENMOJI_JSON_URL = 'https://raw.githubusercontent.com/hfg-gmuend/openmoji/master/data/openmoji.json';


// Set to null as Arabic translations are not being used for the English version of the site.
export const OPENMOJI_AR_JSON_URL: string | null = null;


export const EMOJI_CATEGORIES_ORDER: EmojiCategory[] = [
  { key: 'cat-smileys-emotion', name: 'Smileys & Emotion', openMojiGroup: 'smileys-emotion' },
  { key: 'cat-people-body', name: 'People & Body', openMojiGroup: 'people-body' },
  { key: 'cat-animals-nature', name: 'Animals & Nature', openMojiGroup: 'animals-nature' },
  { key: 'cat-food-drink', name: 'Food & Drink', openMojiGroup: 'food-drink' },
  { key: 'cat-travel-places', name: 'Travel & Places', openMojiGroup: 'travel-places' },
  { key: 'cat-activities', name: 'Activities', openMojiGroup: 'activities' },
  { key: 'cat-objects', name: 'Objects', openMojiGroup: 'objects' },
  { key: 'cat-symbols', name: 'Symbols', openMojiGroup: 'symbols' },
  { key: 'cat-flags', name: 'Flags', openMojiGroup: 'flags' },
  // Note: 'component' group is typically filtered out as it contains modifiers
];

export const OPENMOJI_SVG_CDN_URL = 'https://cdn.jsdelivr.net/npm/openmoji@latest/color/svg/';