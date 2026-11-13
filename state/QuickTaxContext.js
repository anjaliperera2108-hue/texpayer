import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

/** @type {import('react').Context<{ favoriteIds: Set<string>, toggleFavorite: (id: string) => void, foregroundReturns: number } | null>} */
const QuickTaxContext = createContext(null);

/** @param {{ children: import('react').ReactNode }} props */
export function QuickTaxProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => new Set());
  const [foregroundReturns, setForegroundReturns] = useState(0);
  const wasInBackground = useRef(AppState.currentState === 'background');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'background') {
        wasInBackground.current = true;
      }

      if (nextState === 'active' && wasInBackground.current) {
        wasInBackground.current = false;
        setForegroundReturns((count) => count + 1);
      }
    });

    return () => subscription.remove();
  }, []);

  /** @param {string} id */
  function toggleFavorite(id) {
    setFavoriteIds((previous) => {
      const updated = new Set(previous);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  }

  return (
    <QuickTaxContext.Provider value={{ favoriteIds, toggleFavorite, foregroundReturns }}>
      {children}
    </QuickTaxContext.Provider>
  );
}

export function useQuickTax() {
  const context = useContext(QuickTaxContext);
  if (!context) {
    throw new Error('QuickTax screens must be inside QuickTaxProvider.');
  }
  return context;
}
