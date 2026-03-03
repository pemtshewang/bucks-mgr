import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Tokens } from '../constants/Tokens';

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger';
  style?: ViewStyle;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor:
            variant === 'primary' ? Tokens.colors.primary : Tokens.colors.danger,
        },
        style,
      ]}
    >
      <Text style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.statLabel}>
        {label}
      </Text>
      <Text
        style={[
          styles.statValue,
          { color: color || Tokens.colors.textPrimaryLight },
        ]}
      >
        {value}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Tokens.borderRadius.card,
    padding: Tokens.spacing.l,
    backgroundColor: Tokens.colors.cardLight,
    ...Tokens.shadow.soft,
    marginBottom: Tokens.spacing.l,
  },
  button: {
    borderRadius: Tokens.borderRadius.button,
    padding: Tokens.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
