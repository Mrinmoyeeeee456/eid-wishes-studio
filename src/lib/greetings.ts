import { supabase } from './supabase';

export interface SavedGreeting {
  id: string;
  recipientName: string;
  senderName: string;
  message: string;
  template: string;
  frameId: string;
  cardSize: string;
  eidType?: 'fitar' | 'azha';
  createdAt: number;
}

const STORAGE_KEY = 'eid-wishes';

// Always load from localStorage first for instant UX
const loadFromLocal = (): SavedGreeting[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToLocal = (greetings: SavedGreeting[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(greetings));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
};

export const loadGreetings = async (): Promise<SavedGreeting[]> => {
  // Always return local data first (reliable)
  const local = loadFromLocal();
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from('wishes_history')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        const remote = data.map(d => ({
          id: d.id,
          recipientName: d.recipient_name,
          senderName: d.sender_name,
          message: d.message,
          template: d.template,
          frameId: d.frame_id,
          cardSize: d.card_size,
          eidType: d.eid_type || 'fitar',
          createdAt: new Date(d.created_at).getTime(),
        }));
        // Merge: remote takes priority, supplement with local
        const allIds = new Set(remote.map(r => r.id));
        const merged = [...remote, ...local.filter(l => !allIds.has(l.id))];
        saveToLocal(merged);
        return merged;
      }
    }
  } catch {
    // No auth / offline — just return local
  }
  
  return local;
};

export const saveGreetings = async (greetings: SavedGreeting[]) => {
  // ALWAYS save to localStorage first — this is the primary storage
  saveToLocal(greetings);

  // Try Supabase sync if logged in (non-blocking)
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user && greetings.length > 0) {
      const g = greetings[0];
      await supabase.from('wishes_history').upsert({
        id: g.id,
        user_id: session.user.id,
        recipient_name: g.recipientName,
        sender_name: g.senderName,
        message: g.message,
        template: g.template,
        frame_id: g.frameId,
        card_size: g.cardSize,
        eid_type: g.eidType || 'fitar',
      });
    }
  } catch {
    // Silent fail — local save already done
  }
};

export const deleteGreetingFromDb = async (id: string) => {
  // Remove from local first
  const current = loadFromLocal();
  saveToLocal(current.filter(g => g.id !== id));

  // Then try remote
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('wishes_history').delete().eq('id', id);
    }
  } catch {
    // Silent fail
  }
};

export const getDefaultMessage = (type: 'fitar' | 'azha') => 
  type === 'azha' 
    ? 'May this blessed occasion of Eid-ul-Adha bring you joy, peace, and prosperity. May Allah accept your prayers and sacrifices. Eid Mubarak!'
    : 'May the magic of this Eid bring lots of happiness in your life. Ramadan Mubarak and Eid-ul-Fitr Mubarak to you and your family!';
