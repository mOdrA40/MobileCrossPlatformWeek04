import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Divider } from 'react-native-paper';
import { SortType } from '../../types';
import theme from '../../theme';

interface OptionsModalProps {
  visible: boolean;
  onDismiss: () => void;
  sortType: SortType;
  groupByCategory: boolean;
  onSortByName: () => void;
  onSortByRecent: () => void;
  onGroupByCategories: () => void;
}

const OptionsModal: React.FC<OptionsModalProps> = ({
  visible,
  onDismiss,
  sortType,
  groupByCategory,
  onSortByName,
  onSortByRecent,
  onGroupByCategories,
}) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
        <Text variant="headlineSmall" style={styles.modalTitle}>Options</Text>
        <Divider style={styles.modalDivider} />
        <Button 
          icon="sort-alphabetical-ascending" 
          mode={sortType === 'name' && !groupByCategory ? "contained" : "text"} 
          style={styles.modalButton} 
          onPress={onSortByName}
        >
          Sort by name
        </Button>
        <Button 
          icon="sort-calendar-descending" 
          mode={sortType === 'recent' && !groupByCategory ? "contained" : "text"} 
          style={styles.modalButton} 
          onPress={onSortByRecent}
        >
          Sort by recent
        </Button>
        <Button 
          icon="account-group" 
          mode={groupByCategory ? "contained" : "text"} 
          style={styles.modalButton} 
          onPress={onGroupByCategories}
        >
          Group by category
        </Button>
        <Button icon="close" mode="contained" style={styles.closeButton} onPress={onDismiss}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 16,
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalDivider: {
    marginBottom: 16,
    height: 1,
  },
  modalButton: {
    marginVertical: 4,
    justifyContent: 'flex-start',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
  },
});

export default memo(OptionsModal);