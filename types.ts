
export interface OpenMoji {
  emoji: string;
  hexcode: string;
  group: string;
  subgroups: string;
  annotation: string; // Will hold the English annotation
  tags: string[]; 
  openmoji_tags: string[]; // Original OpenMoji tags
  order?: number;
  skintone_base_hexcode?: string;
  skintone_base_emoji?: string;
  skintone_combination?: string;
}

export interface EmojiCategory {
  key: string; 
  name: string; // Display name in English
  openMojiGroup: string; 
}