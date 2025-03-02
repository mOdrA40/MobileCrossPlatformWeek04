import { GradientColors } from '../types';

export const CATEGORIES = ['Family', 'Work', 'Friends', 'School', 'Other'];

export const GRADIENTS: GradientColors[] = [
  ['#6200ee', '#9c64a6'] as const,
  ['#03dac6', '#018786'] as const,
  ['#f1c40f', '#f39c12'] as const,
  ['#3498db', '#2980b9'] as const,
  ['#e74c3c', '#c0392b'] as const,
  ['#1abc9c', '#16a085'] as const,
  ['#9b59b6', '#8e44ad'] as const,
];

export const HEADER_GRADIENT: GradientColors = ['#6200ee', '#9c64a6'] as const;

export const ANIMATION_DURATION = 1000;