import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tokens } from '../../constants/Tokens';

export default function Reports() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, padding: Tokens.spacing.l }]}>
      <Text style={styles.title}>Reports</Text>
      <Text style={{ color: Tokens.colors.textSecondary }}>View your financial reports here.</Text>
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
