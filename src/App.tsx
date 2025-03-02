import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { User } from './types';
import { getRandomCategory } from './utils/helpers';
import theme from './theme';
import ContactsScreen from './screens/ContactsScreen';
import { ContactsProvider } from './context/ContactsContext';
import userData from './assets/data/data.json';


const usersWithTimestamp: User[] = userData.map((user: any, index: number) => ({
  ...user,
  timestamp: Date.now() - (index * 86400000), 
  category: getRandomCategory()
}));

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <ContactsProvider initialUsers={usersWithTimestamp}>
          <ContactsScreen initialUsers={usersWithTimestamp} />
        </ContactsProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}