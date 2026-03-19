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
  | 'anime_hero'
  | 'premium_emerald'
  | 'premium_gold'
  | 'premium_sapphire'
  | 'premium_ruby'
  | 'premium_amethyst'
  // New Eid Festive
  | 'festive_ramadan5'
  | 'festive_barbie3'
  | 'festive_barbie5'
  | 'festive_barbie6'
  | 'festive_avengers3'
  | 'festive_avengers4'
  | 'festive_avengers5'
  | 'festive_shinchan'
  // New Elegant
  | 'elegant_midnight'
  | 'elegant_ocean'
  | 'elegant_desert'
  | 'elegant_forest'
  | 'elegant_twilight'
  | 'elegant_ivory'
  | 'elegant_bronze'
  | 'elegant_slate'
  // New Pastel
  | 'pastel_cotton'
  | 'pastel_mint'
  | 'pastel_peach'
  | 'pastel_lavender'
  | 'pastel_sky'
  | 'pastel_blush'
  | 'pastel_lemon'
  // New Bold
  | 'bold_neon'
  | 'bold_cherry'
  | 'bold_electric'
  | 'bold_sunset'
  | 'bold_cosmic'
  | 'bold_magma'
  | 'bold_aurora';

export interface FrameOption {
  id: CharacterTheme;
  label: string;
  category: 'Premium' | 'Princesses' | 'Cartoons' | 'Traditional' | 'Eid Festive' | 'Elegant' | 'Pastel' | 'Bold';
  colors: {
    border: string;
    bg: string;
    text: string;
    gradient?: string;
  };
  icon: string;
  bgImage?: string;
}

const basePath = '/templates/ramadancard';

export const frameOptions: FrameOption[] = [
  // ═══════════════════════════════════════
  // PREMIUM (5)
  // ═══════════════════════════════════════
  { 
    id: 'premium_emerald', 
    label: 'Emerald Peace', 
    category: 'Premium', 
    icon: '🌿', 
    colors: { border: 'border-emerald-700/80', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900', text: 'text-emerald-900 dark:text-emerald-50' } 
  },
  { 
    id: 'premium_gold', 
    label: 'Royal Gold', 
    category: 'Premium', 
    icon: '👑', 
    colors: { border: 'border-amber-500/80', bg: 'bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950 dark:to-orange-950', text: 'text-amber-900 dark:text-amber-100' } 
  },
  { 
    id: 'premium_sapphire', 
    label: 'Sapphire Calm', 
    category: 'Premium', 
    icon: '💎', 
    colors: { border: 'border-blue-700/80', bg: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-blue-950', text: 'text-blue-900 dark:text-blue-100' } 
  },
  { 
    id: 'premium_ruby', 
    label: 'Ruby Warmth', 
    category: 'Premium', 
    icon: '🌹', 
    colors: { border: 'border-rose-700/80', bg: 'bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-950 dark:to-red-950', text: 'text-rose-900 dark:text-rose-100' } 
  },
  { 
    id: 'premium_amethyst', 
    label: 'Amethyst Night', 
    category: 'Premium', 
    icon: '🌌', 
    colors: { border: 'border-purple-700/80', bg: 'bg-gradient-to-br from-purple-50 to-fuchsia-100 dark:from-purple-950 dark:to-fuchsia-950', text: 'text-purple-900 dark:text-purple-100' } 
  },

  // ═══════════════════════════════════════
  // TRADITIONAL (3)
  // ═══════════════════════════════════════
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

  // ═══════════════════════════════════════
  // PRINCESSES (3)
  // ═══════════════════════════════════════
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

  // ═══════════════════════════════════════
  // CARTOONS (5)
  // ═══════════════════════════════════════
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

  // ═══════════════════════════════════════
  // EID FESTIVE — 8 new (using unused images)
  // ═══════════════════════════════════════
  {
    id: 'festive_ramadan5',
    label: 'Ramadan Night',
    category: 'Eid Festive',
    icon: '🌙',
    bgImage: `${basePath}/ram5.avif`,
    colors: { border: 'border-indigo-500/70', bg: 'bg-transparent', text: 'text-indigo-900 dark:text-indigo-100' }
  },
  {
    id: 'festive_barbie3',
    label: 'Princess Eid',
    category: 'Eid Festive',
    icon: '👸',
    bgImage: `${basePath}/barb3.jpg`,
    colors: { border: 'border-pink-500/70', bg: 'bg-transparent', text: 'text-pink-900 dark:text-pink-100' }
  },
  {
    id: 'festive_barbie5',
    label: 'Fairytale Eid',
    category: 'Eid Festive',
    icon: '🦋',
    bgImage: `${basePath}/barb5.jpg`,
    colors: { border: 'border-fuchsia-500/70', bg: 'bg-transparent', text: 'text-fuchsia-900 dark:text-fuchsia-100' }
  },
  {
    id: 'festive_barbie6',
    label: 'Royal Princess',
    category: 'Eid Festive',
    icon: '💫',
    bgImage: `${basePath}/barb6.jpg`,
    colors: { border: 'border-rose-500/70', bg: 'bg-transparent', text: 'text-rose-900 dark:text-rose-100' }
  },
  {
    id: 'festive_avengers3',
    label: 'Hero Eid',
    category: 'Eid Festive',
    icon: '🦸',
    bgImage: `${basePath}/avan3.jpg`,
    colors: { border: 'border-blue-500/70', bg: 'bg-transparent', text: 'text-blue-900 dark:text-blue-100' }
  },
  {
    id: 'festive_avengers4',
    label: 'Power Strike',
    category: 'Eid Festive',
    icon: '💥',
    bgImage: `${basePath}/avan4.jpg`,
    colors: { border: 'border-red-500/70', bg: 'bg-transparent', text: 'text-red-900 dark:text-red-100' }
  },
  {
    id: 'festive_avengers5',
    label: 'Action Eid',
    category: 'Eid Festive',
    icon: '🔥',
    bgImage: `${basePath}/avan5.jpg`,
    colors: { border: 'border-orange-500/70', bg: 'bg-transparent', text: 'text-orange-900 dark:text-orange-100' }
  },
  {
    id: 'festive_shinchan',
    label: 'Shin-chan Fun',
    category: 'Eid Festive',
    icon: '🎈',
    bgImage: `${basePath}/shr1.png`,
    colors: { border: 'border-yellow-500/70', bg: 'bg-transparent', text: 'text-yellow-900 dark:text-yellow-100' }
  },

  // ═══════════════════════════════════════
  // ELEGANT — 8 new (gradient-only, no images)
  // ═══════════════════════════════════════
  {
    id: 'elegant_midnight',
    label: 'Midnight Jazz',
    category: 'Elegant',
    icon: '🎷',
    colors: { 
      border: 'border-slate-700/80', 
      bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900', 
      text: 'text-slate-100',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)'
    }
  },
  {
    id: 'elegant_ocean',
    label: 'Ocean Breeze',
    category: 'Elegant',
    icon: '🌊',
    colors: { 
      border: 'border-cyan-600/80', 
      bg: 'bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-950 dark:to-blue-950', 
      text: 'text-cyan-900 dark:text-cyan-100',
      gradient: 'linear-gradient(135deg, #ecfeff 0%, #dbeafe 100%)'
    }
  },
  {
    id: 'elegant_desert',
    label: 'Desert Sand',
    category: 'Elegant',
    icon: '🏜️',
    colors: { 
      border: 'border-amber-600/80', 
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950 dark:to-yellow-950', 
      text: 'text-amber-900 dark:text-amber-100',
      gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)'
    }
  },
  {
    id: 'elegant_forest',
    label: 'Forest Mist',
    category: 'Elegant',
    icon: '🌲',
    colors: { 
      border: 'border-green-700/80', 
      bg: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950', 
      text: 'text-green-900 dark:text-green-100',
      gradient: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)'
    }
  },
  {
    id: 'elegant_twilight',
    label: 'Twilight Glow',
    category: 'Elegant',
    icon: '🌅',
    colors: { 
      border: 'border-violet-600/80', 
      bg: 'bg-gradient-to-br from-violet-50 to-pink-100 dark:from-violet-950 dark:to-pink-950', 
      text: 'text-violet-900 dark:text-violet-100',
      gradient: 'linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)'
    }
  },
  {
    id: 'elegant_ivory',
    label: 'Ivory Classic',
    category: 'Elegant',
    icon: '🕊️',
    colors: { 
      border: 'border-stone-400/80', 
      bg: 'bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800', 
      text: 'text-stone-900 dark:text-stone-100',
      gradient: 'linear-gradient(135deg, #fafaf9 0%, #f5f5f4 100%)'
    }
  },
  {
    id: 'elegant_bronze',
    label: 'Bronze Luxury',
    category: 'Elegant',
    icon: '🏅',
    colors: { 
      border: 'border-yellow-700/80', 
      bg: 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-950', 
      text: 'text-yellow-900 dark:text-yellow-100',
      gradient: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)'
    }
  },
  {
    id: 'elegant_slate',
    label: 'Slate Modern',
    category: 'Elegant',
    icon: '🪨',
    colors: { 
      border: 'border-slate-500/80', 
      bg: 'bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800 dark:to-gray-900', 
      text: 'text-slate-900 dark:text-slate-100',
      gradient: 'linear-gradient(135deg, #f1f5f9 0%, #e5e7eb 100%)'
    }
  },

  // ═══════════════════════════════════════
  // PASTEL — 7 new (gradient-only)
  // ═══════════════════════════════════════
  {
    id: 'pastel_cotton',
    label: 'Cotton Candy',
    category: 'Pastel',
    icon: '🍬',
    colors: { 
      border: 'border-pink-300/80', 
      bg: 'bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950', 
      text: 'text-pink-900 dark:text-pink-100',
      gradient: 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 100%)'
    }
  },
  {
    id: 'pastel_mint',
    label: 'Mint Fresh',
    category: 'Pastel',
    icon: '🍃',
    colors: { 
      border: 'border-teal-300/80', 
      bg: 'bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950 dark:to-emerald-950', 
      text: 'text-teal-900 dark:text-teal-100',
      gradient: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)'
    }
  },
  {
    id: 'pastel_peach',
    label: 'Peach Dream',
    category: 'Pastel',
    icon: '🍑',
    colors: { 
      border: 'border-orange-300/80', 
      bg: 'bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950 dark:to-rose-950', 
      text: 'text-orange-900 dark:text-orange-100',
      gradient: 'linear-gradient(135deg, #fff7ed 0%, #fff1f2 100%)'
    }
  },
  {
    id: 'pastel_lavender',
    label: 'Lavender Mist',
    category: 'Pastel',
    icon: '💜',
    colors: { 
      border: 'border-violet-300/80', 
      bg: 'bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950 dark:to-indigo-950', 
      text: 'text-violet-900 dark:text-violet-100',
      gradient: 'linear-gradient(135deg, #f5f3ff 0%, #eef2ff 100%)'
    }
  },
  {
    id: 'pastel_sky',
    label: 'Sky Serenity',
    category: 'Pastel',
    icon: '☁️',
    colors: { 
      border: 'border-sky-300/80', 
      bg: 'bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950', 
      text: 'text-sky-900 dark:text-sky-100',
      gradient: 'linear-gradient(135deg, #f0f9ff 0%, #eff6ff 100%)'
    }
  },
  {
    id: 'pastel_blush',
    label: 'Blush Rose',
    category: 'Pastel',
    icon: '🌸',
    colors: { 
      border: 'border-rose-300/80', 
      bg: 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950', 
      text: 'text-rose-900 dark:text-rose-100',
      gradient: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 100%)'
    }
  },
  {
    id: 'pastel_lemon',
    label: 'Lemon Sorbet',
    category: 'Pastel',
    icon: '🍋',
    colors: { 
      border: 'border-yellow-300/80', 
      bg: 'bg-gradient-to-br from-yellow-50 to-lime-50 dark:from-yellow-950 dark:to-lime-950', 
      text: 'text-yellow-900 dark:text-yellow-100',
      gradient: 'linear-gradient(135deg, #fefce8 0%, #f7fee7 100%)'
    }
  },

  // ═══════════════════════════════════════
  // BOLD — 7 new (vivid gradient-only)
  // ═══════════════════════════════════════
  {
    id: 'bold_neon',
    label: 'Neon Glow',
    category: 'Bold',
    icon: '💡',
    colors: { 
      border: 'border-lime-500/80', 
      bg: 'bg-gradient-to-br from-lime-400 to-green-500 dark:from-lime-900 dark:to-green-950', 
      text: 'text-lime-950 dark:text-lime-100',
      gradient: 'linear-gradient(135deg, #a3e635 0%, #22c55e 100%)'
    }
  },
  {
    id: 'bold_cherry',
    label: 'Cherry Blast',
    category: 'Bold',
    icon: '🍒',
    colors: { 
      border: 'border-red-500/80', 
      bg: 'bg-gradient-to-br from-red-400 to-rose-500 dark:from-red-900 dark:to-rose-950', 
      text: 'text-red-950 dark:text-red-100',
      gradient: 'linear-gradient(135deg, #f87171 0%, #f43f5e 100%)'
    }
  },
  {
    id: 'bold_electric',
    label: 'Electric Blue',
    category: 'Bold',
    icon: '⚡',
    colors: { 
      border: 'border-blue-500/80', 
      bg: 'bg-gradient-to-br from-blue-400 to-cyan-500 dark:from-blue-900 dark:to-cyan-950', 
      text: 'text-blue-950 dark:text-blue-100',
      gradient: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%)'
    }
  },
  {
    id: 'bold_sunset',
    label: 'Sunset Fire',
    category: 'Bold',
    icon: '🌇',
    colors: { 
      border: 'border-orange-500/80', 
      bg: 'bg-gradient-to-br from-orange-400 to-red-500 dark:from-orange-900 dark:to-red-950', 
      text: 'text-orange-950 dark:text-orange-100',
      gradient: 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)'
    }
  },
  {
    id: 'bold_cosmic',
    label: 'Cosmic Purple',
    category: 'Bold',
    icon: '🔮',
    colors: { 
      border: 'border-purple-500/80', 
      bg: 'bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-purple-900 dark:to-indigo-950', 
      text: 'text-purple-50 dark:text-purple-100',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #4f46e5 100%)'
    }
  },
  {
    id: 'bold_magma',
    label: 'Magma Flow',
    category: 'Bold',
    icon: '🌋',
    colors: { 
      border: 'border-amber-600/80', 
      bg: 'bg-gradient-to-br from-amber-500 to-red-600 dark:from-amber-900 dark:to-red-950', 
      text: 'text-amber-50 dark:text-amber-100',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)'
    }
  },
  {
    id: 'bold_aurora',
    label: 'Aurora Lights',
    category: 'Bold',
    icon: '🌌',
    colors: { 
      border: 'border-teal-500/80', 
      bg: 'bg-gradient-to-br from-teal-400 to-violet-500 dark:from-teal-900 dark:to-violet-950', 
      text: 'text-teal-950 dark:text-teal-100',
      gradient: 'linear-gradient(135deg, #2dd4bf 0%, #8b5cf6 100%)'
    }
  },
];
