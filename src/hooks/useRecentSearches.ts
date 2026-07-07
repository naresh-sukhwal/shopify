import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RECENT_SEARCHES_KEY = '@recent_searches';
const MAX_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    loadSearches();
  }, []);

  const loadSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load recent searches', e);
    }
  };

  const addSearch = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) return;

      setRecentSearches(prev => {
        // Remove existing if it matches to move it to the top
        const filtered = prev.filter(
          item => item.toLowerCase() !== trimmedQuery.toLowerCase(),
        );
        // Add to the end and keep only the latest MAX_SEARCHES
        const updated = [...filtered, trimmedQuery].slice(-MAX_SEARCHES);
        
        AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated)).catch(
          e => console.error('Failed to save recent search', e),
        );
        
        return updated;
      });
    },
    [],
  );

  const clearSearches = useCallback(async () => {
    setRecentSearches([]);
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch (e) {
      console.error('Failed to clear recent searches', e);
    }
  }, []);

  return { recentSearches, addSearch, clearSearches };
}
