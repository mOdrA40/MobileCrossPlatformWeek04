import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No contacts found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptySubtext: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default memo(EmptyState);