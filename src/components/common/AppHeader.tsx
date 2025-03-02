import React, { memo } from 'react';
import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Appbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SortType } from '../../types';
import { HEADER_GRADIENT } from '../../utils/constants';

interface AppHeaderProps {
  sortType: SortType;
  groupByCategory: boolean;
  showFavoritesOnly: boolean;
  onFavoritesToggle: () => void;
  onOptionsPress: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  sortType, 
  groupByCategory, 
  showFavoritesOnly, 
  onFavoritesToggle, 
  onOptionsPress 
}) => {
  return (
    <Appbar.Header statusBarHeight={Platform.OS === 'android' ? RNStatusBar.currentHeight : undefined}>
      <LinearGradient
        colors={HEADER_GRADIENT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Appbar.Content 
          title="My Contacts" 
          titleStyle={styles.headerTitle}
          subtitle={`${sortType === 'name' ? 'Sorted by name' : 'Sorted by recent'}${groupByCategory ? ' • Grouped by category' : ''}`}
          subtitleStyle={styles.headerSubtitle}
        />
        <Appbar.Action 
          icon={showFavoritesOnly ? "star" : "star-outline"} 
          color="#fff"
          onPress={onFavoritesToggle} 
        />
        <Appbar.Action 
          icon="dots-vertical" 
          color="#fff"
          onPress={onOptionsPress} 
        />
      </LinearGradient>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default memo(AppHeader);