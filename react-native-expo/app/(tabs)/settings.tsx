import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tokens } from '../../constants/Tokens';

export default function Settings() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, padding: Tokens.spacing.l }]}>
      <Text style={styles.title}>Settings</Text>
      <Text style={{ color: Tokens.colors.textSecondary }}>Adjust your app settings here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Tokens.colors.backgroundLight,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
});
