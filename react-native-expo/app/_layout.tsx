import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { migrateDbIfNeeded } from '../database/db';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName="budget_app.db" onInit={migrateDbIfNeeded}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
