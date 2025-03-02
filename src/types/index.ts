export interface User {
  name: string;
  email: string;
  photo_url: string;
  phone: string;
  location: string;
  timestamp?: number;
  category?: string;
}

export interface ContactCardProps {
  name: string;
  email: string;
  photoUrl: string;
  phone: string;
  location: string;
  isFavorite: boolean;
  onToggleFavorite: (name: string) => void;
}

export type SortType = 'name' | 'recent';


export type GradientColors = readonly [string, string, ...string[]];