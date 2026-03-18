import { supabase } from './supabase';

export interface SavedGreeting {
  id: string;
  recipientName: string;
  senderName: string;
  message: string;
  template: string;
  frameId: string;
  cardSize: string;
  createdAt: number;
}

const STORAGE_KEY = 'eid-wishes';

export const loadGreetings = async (): Promise<SavedGreeting[]> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    const { data, error } = await supabase.from('wishes_history').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map(d => ({
        id: d.id,
        recipientName: d.recipient_name,
        senderName: d.sender_name,
        message: d.message,
        template: d.template,
        frameId: d.frame_id,
        cardSize: d.card_size,
        createdAt: new Date(d.created_at).getTime(),
      }));
    }
  }
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveGreetings = async (greetings: SavedGreeting[]) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.user && greetings.length > 0) {
    // Sync the most recent one (the one just added)
    const g = greetings[0];
    const { error } = await supabase.from('wishes_history').upsert({
      id: g.id,
      user_id: session.user.id,
      recipient_name: g.recipientName,
      sender_name: g.senderName,
      message: g.message,
      template: g.template,
      frame_id: g.frameId,
      card_size: g.cardSize,
    });
    if (error) console.error('Supabase Sync Error:', error);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(greetings));
};

export const deleteGreetingFromDb = async (id: string) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.user) {
    await supabase.from('wishes_history').delete().eq('id', id);
  }
};

export const defaultMessage =
  'May this blessed occasion of Eid-ul-Adha bring you joy, peace, and prosperity. May Allah accept your prayers and sacrifices. Eid Mubarak!';
