import React, { createContext, useContext, ReactNode, useState, useMemo, useCallback, useEffect } from 'react';
import { User, SortType } from '../types';
import { getRandomCategory, getRandomPhotoUrl } from '../utils/helpers';
import useCategory from '../hooks/useCategory';

interface ContactsContextProps {
  
  users: User[];
  filteredUsers: User[];
  favorites: string[];
  searchQuery: string;
  showFavoritesOnly: boolean;
  sortType: SortType;
  groupByCategory: boolean;
  categories: string[];
  emptyContact: User;
  newContactTemplate: User;
  
  
  setSearchQuery: (query: string) => void;
  toggleFavorite: (name: string) => void;
  sortByName: () => void;
  sortByRecent: () => void;
  toggleGroupByCategory: () => void;
  addContact: (contact: User) => boolean;
  updateContact: (name: string, updatedContact: Partial<User>) => boolean;
  deleteContact: (name: string) => boolean;
  toggleFavoritesOnly: () => void;
  
  
  availableCategories: string[];
  usedCategories: string[];
  assignCategory: (contact: User, category: string) => User;
}


const ContactsContext = createContext<ContactsContextProps | undefined>(undefined);


export const ContactsProvider: React.FC<{ children: ReactNode; initialUsers: User[] }> = ({ 
  children, 
  initialUsers 
}) => {
  
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortType, setSortType] = useState<SortType>('name');
  
 
  const {
    groupByCategory,
    availableCategories,
    usedCategories,
    filteredCategories,
    toggleGroupByCategory,
    assignCategory
  } = useCategory(users);
  
  
  useEffect(() => {
    sortByName();
  }, []);
  
  
  const newContactTemplate = useMemo<User>(() => ({
    name: '',
    email: '',
    phone: '',
    location: '',
    photo_url: getRandomPhotoUrl(),
    category: getRandomCategory(),
    timestamp: Date.now()
  }), []);
  
  
  const emptyContact = useMemo(() => {
    return JSON.parse(JSON.stringify(newContactTemplate));
  }, [newContactTemplate]);
  
  
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
    return filteredCategories;
  }, [filteredCategories]);
  
  
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
    setUsers(prevUsers => [...prevUsers].sort((a, b) => a.name.localeCompare(b.name)));
  }, []);
  
  
  const sortByRecent = useCallback(() => {
    setSortType('recent');
    setUsers(prevUsers => [...prevUsers].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
  }, []);
  
  
  const addContact = useCallback((newContact: User) => {
    
    if (!newContact.name || !newContact.email || !newContact.phone || !newContact.location) {
      return false;
    }
    
    
    setUsers(prevUsers => [
      {
        ...newContact,
        photo_url: newContact.photo_url || getRandomPhotoUrl(),
        timestamp: Date.now(),
        category: newContact.category || getRandomCategory()
      },
      ...prevUsers
    ]);
    
    return true;
  }, []);
  
  
  const updateContact = useCallback((name: string, updatedContact: Partial<User>) => {
    
    const userIndex = users.findIndex(user => user.name === name);
    if (userIndex === -1) return false;
    
    
    const updatedUsers = [...users];
    
   
    updatedUsers[userIndex] = {
      ...updatedUsers[userIndex],
      ...updatedContact,
      timestamp: Date.now()
    };
    
   
    setUsers(updatedUsers);
    return true;
  }, [users]);
  
 
  const deleteContact = useCallback((name: string) => {
    const userIndex = users.findIndex(user => user.name === name);
    if (userIndex === -1) return false;
    
    
    setUsers(prevUsers => prevUsers.filter(user => user.name !== name));
    
    
    if (favorites.includes(name)) {
      setFavorites(prevFavorites => prevFavorites.filter(item => item !== name));
    }
    
    return true;
  }, [users, favorites]);
  
  const toggleFavoritesOnly = useCallback(() => {
    setShowFavoritesOnly(prev => !prev);
  }, []);
  
  
  const contextValue: ContactsContextProps = {
    users,
    filteredUsers,
    favorites,
    searchQuery,
    showFavoritesOnly,
    sortType,
    groupByCategory,
    categories,
    emptyContact,
    newContactTemplate,
    setSearchQuery,
    toggleFavorite,
    sortByName,
    sortByRecent,
    toggleGroupByCategory,
    addContact,
    updateContact,
    deleteContact,
    toggleFavoritesOnly,
    availableCategories,
    usedCategories,
    assignCategory
  };
  
  
  return (
    <ContactsContext.Provider value={contextValue}>
      {children}
    </ContactsContext.Provider>
  );
};


export const useContactsContext = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContactsContext must be used within a ContactsProvider');
  }
  return context;
};

export default ContactsContext;