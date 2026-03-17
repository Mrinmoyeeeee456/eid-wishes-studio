export const getAnonymousId = (): string => {
  if (typeof window === 'undefined') return 'server-id';
  
  const STORAGE_KEY = 'eid_mubarak_anon_id';
  let anonId = localStorage.getItem(STORAGE_KEY);
  
  if (!anonId) {
    // Generate a quick UUID v4 equivalent
    anonId = crypto.randomUUID ? crypto.randomUUID() : 
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
      
    localStorage.setItem(STORAGE_KEY, anonId);
  }
  
  return anonId;
};
