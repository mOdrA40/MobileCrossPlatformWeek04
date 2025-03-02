import { CATEGORIES, GRADIENTS } from './constants';
import { GradientColors } from '../types';

export function getRandomCategory(): string {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

export function getRandomPhotoUrl(): string {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${randomId % 100}.jpg`;
}


export function getGradientForName(name: string): GradientColors {
  
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
}