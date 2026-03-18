export type CharacterTheme = 
  | 'traditional' 
  | 'barbie' 
  | 'belle' 
  | 'rapunzel' 
  | 'cinderella' 
  | 'mickey' 
  | 'ben10' 
  | 'naruto' 
  | 'pokemon' 
  | 'tomjerry';

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
}

export const frameOptions: FrameOption[] = [
  // Traditional
  { id: 'traditional', label: 'Classic Mosque', category: 'Traditional', icon: '🕌', colors: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400' } },
  
  // Princesses
  { id: 'barbie', label: 'Barbie Pink', category: 'Princesses', icon: '🎀', colors: { border: 'border-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-300' } },
  { id: 'belle', label: 'Belle Yellow', category: 'Princesses', icon: '🌹', colors: { border: 'border-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300' } },
  { id: 'rapunzel', label: 'Rapunzel Purple', category: 'Princesses', icon: '☀️', colors: { border: 'border-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' } },
  { id: 'cinderella', label: 'Cinderella Blue', category: 'Princesses', icon: '🥿', colors: { border: 'border-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' } },
  
  // Cartoons
  { id: 'mickey', label: 'Mickey Mouse', category: 'Cartoons', icon: '🐭', colors: { border: 'border-red-500', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400' } },
  { id: 'ben10', label: 'Ben 10 Green', category: 'Cartoons', icon: '⌚', colors: { border: 'border-green-500', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' } },
  { id: 'naruto', label: 'Naruto Orange', category: 'Cartoons', icon: '🍥', colors: { border: 'border-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' } },
  { id: 'pokemon', label: 'Pokémon', category: 'Cartoons', icon: '⚡', colors: { border: 'border-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400' } },
  { id: 'tomjerry', label: 'Tom & Jerry', category: 'Cartoons', icon: '🧀', colors: { border: 'border-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-800 dark:text-amber-400' } },
];
