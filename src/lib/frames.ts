export type CharacterTheme = 
  | 'traditional_mosque' 
  | 'ramadan_lantern'
  | 'eid_cow'
  | 'barbie_star' 
  | 'barbie_friends' 
  | 'barbie_glamor' 
  | 'avengers_assemble' 
  | 'avengers_action' 
  | 'doraemon_fun' 
  | 'tomjerry_chase'
  | 'anime_hero';

export interface FrameOption {
  id: CharacterTheme;
  label: string;
  category: 'Princesses' | 'Cartoons' | 'Traditional';
  colors: {
    border: string;
    bg: string;
    text: string;
  };
  icon: string;
  bgImage?: string;
}

const basePath = '/templates/ramadancard';

export const frameOptions: FrameOption[] = [
  // Traditional
  { 
    id: 'traditional_mosque', 
    label: 'Beautiful Mosque', 
    category: 'Traditional', 
    icon: '🕌', 
    bgImage: `${basePath}/ram4.jpg`,
    colors: { border: 'border-emerald-500/70', bg: 'bg-transparent', text: 'text-emerald-900 dark:text-emerald-100' } 
  },
  { 
    id: 'ramadan_lantern', 
    label: 'Festive Lanterns', 
    category: 'Traditional', 
    icon: '🏮', 
    bgImage: `${basePath}/ram1.jpg`,
    colors: { border: 'border-amber-500/70', bg: 'bg-transparent', text: 'text-amber-900 dark:text-amber-100' } 
  },
  { 
    id: 'eid_cow', 
    label: 'Qurbani Cow', 
    category: 'Traditional', 
    icon: '🐄', 
    bgImage: `${basePath}/cow1.webp`,
    colors: { border: 'border-orange-500/70', bg: 'bg-transparent', text: 'text-orange-900 dark:text-orange-100' } 
  },
  
  // Princesses
  { 
    id: 'barbie_star', 
    label: 'Barbie Glow', 
    category: 'Princesses', 
    icon: '🎀', 
    bgImage: `${basePath}/barb1.webp`,
    colors: { border: 'border-pink-400', bg: 'bg-transparent', text: 'text-pink-900 dark:text-pink-100' } 
  },
  { 
    id: 'barbie_friends', 
    label: 'Barbie Dream', 
    category: 'Princesses', 
    icon: '⭐', 
    bgImage: `${basePath}/barb2.jpg`,
    colors: { border: 'border-fuchsia-400', bg: 'bg-transparent', text: 'text-fuchsia-900 dark:text-fuchsia-100' } 
  },
  { 
    id: 'barbie_glamor', 
    label: 'Barbie Glam', 
    category: 'Princesses', 
    icon: '✨', 
    bgImage: `${basePath}/barb4.jpg`,
    colors: { border: 'border-rose-400', bg: 'bg-transparent', text: 'text-rose-900 dark:text-rose-100' } 
  },
  
  // Cartoons
  { 
    id: 'avengers_assemble', 
    label: 'Avengers Strike', 
    category: 'Cartoons', 
    icon: '🛡️', 
    bgImage: `${basePath}/avan1.webp`,
    colors: { border: 'border-blue-600', bg: 'bg-transparent', text: 'text-blue-900 dark:text-blue-100' } 
  },
  { 
    id: 'avengers_action', 
    label: 'Avengers Base', 
    category: 'Cartoons', 
    icon: '⚡', 
    bgImage: `${basePath}/avan2.jpg`,
    colors: { border: 'border-red-600', bg: 'bg-transparent', text: 'text-red-900 dark:text-red-100' } 
  },
  { 
    id: 'doraemon_fun', 
    label: 'Doraemon Magic', 
    category: 'Cartoons', 
    icon: '🛸', 
    bgImage: `${basePath}/dor1.jpg`,
    colors: { border: 'border-sky-400', bg: 'bg-transparent', text: 'text-sky-900 dark:text-sky-100' } 
  },
  { 
    id: 'tomjerry_chase', 
    label: 'Tom & Jerry', 
    category: 'Cartoons', 
    icon: '🧀', 
    bgImage: `${basePath}/tomj1.jpg`,
    colors: { border: 'border-amber-600', bg: 'bg-transparent', text: 'text-orange-900 dark:text-orange-100' } 
  },
  { 
    id: 'anime_hero', 
    label: 'Anime Style', 
    category: 'Cartoons', 
    icon: '⚔️', 
    bgImage: `${basePath}/ani6.jpg`,
    colors: { border: 'border-indigo-500', bg: 'bg-transparent', text: 'text-indigo-900 dark:text-indigo-100' } 
  },
];
