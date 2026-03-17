export type ThemeContextType = 'light' | 'dark';

export interface UserPreference {
  id: string; // UUID
  theme: ThemeContextType;
  updated_at?: string;
}

export type FrameType = 'classic' | 'barbie' | 'naruto' | 'islamic' | 'floral' | 'modern';

export interface GreetingCard {
  id: string;
  sender_name: string;
  receiver_name: string;
  frame_type: FrameType;
  slug: string;
  created_at?: string;
}
