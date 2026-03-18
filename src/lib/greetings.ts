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

export const loadGreetings = (): SavedGreeting[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveGreetings = (greetings: SavedGreeting[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(greetings));
};

export const defaultMessage =
  'May this blessed occasion of Eid-ul-Adha bring you joy, peace, and prosperity. May Allah accept your prayers and sacrifices. Eid Mubarak!';
