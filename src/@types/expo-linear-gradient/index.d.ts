declare module 'expo-linear-gradient' {
  import { ViewProps } from 'react-native';
  import * as React from 'react';

  export interface LinearGradientProps extends ViewProps {
    colors: readonly string[] | string[];
    locations?: number[] | null;
    start?: { x: number; y: number } | null;
    end?: { x: number; y: number } | null;
  }

  export class LinearGradient extends React.Component<LinearGradientProps> {}
  export default LinearGradient;
}
