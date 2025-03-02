import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_DURATION } from '../utils/constants';

export function useFadeInAnimation(duration: number = ANIMATION_DURATION) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, []);

  return fadeAnim;
}