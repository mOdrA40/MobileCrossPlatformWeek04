import { useState, useCallback, useMemo } from 'react';
import { User, SortType } from '../types';

const useContacts = (initialUsers: User[]) => {
  const [users, setUsers] = useState(initialUsers);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortType, setSortType] = useState<SortType>('name');
  const [groupByCategory, setGroupByCategory] = useState(false);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (showFavoritesOnly) {
        return matchesSearch && favorites.includes(user.name);
      }
      
      return matchesSearch;
    });
  }, [users, searchQuery, favorites, showFavoritesOnly]);

  
  const categories = useMemo(() => {
    if (!groupByCategory) return [];
    return [...new Set(filteredUsers.map(user => user.category))];
  }, [filteredUsers, groupByCategory]);

  
  const toggleFavorite = useCallback((name: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(name)) {
        return prevFavorites.filter(item => item !== name);
      } else {
        return [...prevFavorites, name];
      }
    });
  }, []);

  
  const sortByName = useCallback(() => {
    setSortType('name');
    setGroupByCategory(false);
    setUsers(prevUsers => [...prevUsers].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);

  const sortByRecent = useCallback(() => {
    setSortType('recent');
    setGroupByCategory(false);
    setUsers(prevUsers => [...prevUsers].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
  }, []);

  const toggleGroupByCategory = useCallback(() => {
    setGroupByCategory(prev => !prev);
  }, []);

  const toggleFavoritesOnly = useCallback(() => {
    setShowFavoritesOnly(prev => !prev);
  }, []);

  return {
    users,
    filteredUsers,
    favorites,
    searchQuery,
    setSearchQuery,
    showFavoritesOnly,
    sortType,
    groupByCategory,
    categories,
    toggleFavorite,
    sortByName,
    sortByRecent,
    toggleGroupByCategory,
    toggleFavoritesOnly
  };
};

export default useContacts;