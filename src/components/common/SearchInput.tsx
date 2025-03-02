import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Search contacts..."
        onChangeText={onChangeText}
        value={value}
        style={styles.searchBar}
        icon="magnify"
        clearIcon="close"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  searchBar: {
    borderRadius: 8,
    elevation: 0,
    backgroundColor: '#f0f0f0',
  },
});

export default memo(SearchInput);