import React, { useState, useCallback, memo } from 'react';
import { StyleSheet, View, Animated, FlatList } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from '../types';
import useContacts from '../hooks/useContacts';
import { useFadeInAnimation } from '../hooks/useAnimation';
import AppHeader from '../components/common/AppHeader';
import SearchInput from '../components/common/SearchInput';
import EmptyState from '../components/common/EmptyState';
import ContactCard from '../components/cards/ContactCard';
import OptionsModal from '../components/modals/OptionsModal';
import theme from '../theme';

interface ContactsScreenProps {
  initialUsers: User[];
}

const ContactsScreen: React.FC<ContactsScreenProps> = ({ initialUsers }) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const fadeAnim = useFadeInAnimation();
  
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    showFavoritesOnly,
    sortType,
    groupByCategory,
    categories: possiblyUndefinedCategories,
    toggleFavorite,
    sortByName,
    sortByRecent,
    toggleGroupByCategory,
    toggleFavoritesOnly
  } = useContacts(initialUsers);

 
  const categories = possiblyUndefinedCategories.filter((category): category is string => 
    category !== undefined
  );


  const showOptionsModal = () => setOptionsModalVisible(true);
  const hideOptionsModal = () => setOptionsModalVisible(false);
  
  const handleSortByName = () => {
    sortByName();
    hideOptionsModal();
  };
  
  const handleSortByRecent = () => {
    sortByRecent();
    hideOptionsModal();
  };
  
  const handleGroupByCategories = () => {
    toggleGroupByCategory();
    hideOptionsModal();
  };

  
  const renderCategorySection = useCallback(({ item: category }: { item: string }) => {
    const categoryUsers = filteredUsers.filter(user => user.category === category);
    
    return (
      <View key={category}>
        <View style={styles.categoryHeader}>
          <Chip icon="tag" style={styles.categoryChip}>{category}</Chip>
        </View>
        {categoryUsers.map(user => (
          <ContactCard
            key={user.name}
            name={user.name}
            email={user.email}
            photoUrl={user.photo_url}
            phone={user.phone}
            location={user.location}
            isFavorite={false}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </View>
    );
  }, [filteredUsers, toggleFavorite]);

  const renderItem = useCallback(({ item }: { item: User }) => (
    <ContactCard
      key={item.name}
      name={item.name}
      email={item.email}
      photoUrl={item.photo_url}
      phone={item.phone}
      location={item.location}
      isFavorite={false}
      onToggleFavorite={toggleFavorite}
    />
  ), [toggleFavorite]);

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        sortType={sortType}
        groupByCategory={groupByCategory}
        showFavoritesOnly={showFavoritesOnly}
        onFavoritesToggle={toggleFavoritesOnly}
        onOptionsPress={showOptionsModal}
      />
      
      <SearchInput
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {filteredUsers.length > 0 ? (
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          {!groupByCategory ? (
            <FlatList
              data={filteredUsers}
              renderItem={renderItem}
              keyExtractor={(item) => item.name}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
              removeClippedSubviews={true}
            />
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategorySection}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </Animated.View>
      ) : (
        <EmptyState />
      )}
      
      <OptionsModal
        visible={optionsModalVisible}
        onDismiss={hideOptionsModal}
        sortType={sortType}
        groupByCategory={groupByCategory}
        onSortByName={handleSortByName}
        onSortByRecent={handleSortByRecent}
        onGroupByCategories={handleGroupByCategories}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  categoryHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: theme.colors.surfaceVariant,
  },
});

export default ContactsScreen;