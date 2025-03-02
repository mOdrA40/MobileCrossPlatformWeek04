import { useState, useMemo, useCallback } from 'react';
import { User } from '../types';
import { CATEGORIES } from '../utils/constants';
import { getRandomCategory } from '../utils/helpers';


const useCategory = (users: User[]) => {

  const [groupByCategory, setGroupByCategory] = useState(false);
  

  const availableCategories = useMemo(() => {
    return CATEGORIES;
  }, []);
  
  const usedCategories = useMemo(() => {
    if (!users.length) return [];
    return [...new Set(users.map(user => user.category))].filter(Boolean) as string[];
  }, [users]);
 
  const contactsByCategory = useMemo(() => {
    if (!groupByCategory || !users.length) return {};
    
    return users.reduce((acc, user) => {
     
      const category = user.category || 'Other';
      
      if (!acc[category]) {
        acc[category] = [];
      }
      
      acc[category].push(user);
      return acc;
    }, {} as Record<string, User[]>);
  }, [users, groupByCategory]);
  

  const filteredCategories = useMemo(() => {
    if (!groupByCategory) return [];
    return Object.keys(contactsByCategory).sort();
  }, [contactsByCategory, groupByCategory]);

  const toggleGroupByCategory = useCallback(() => {
    setGroupByCategory(prev => !prev);
  }, []);
  

  const assignCategory = useCallback((contact: User, category: string): User => {
    if (!CATEGORIES.includes(category)) {
      console.warn(`Category "${category}" is not a valid category`);
      return contact;
    }
    
    return {
      ...contact,
      category
    };
  }, []);
  
  const getNewContactCategory = useCallback(() => {
    return getRandomCategory();
  }, []);

  return {
    groupByCategory,
    availableCategories,
    usedCategories,
    filteredCategories,
    contactsByCategory,
    toggleGroupByCategory,
    assignCategory,
    getNewContactCategory
  };
};

export default useCategory;