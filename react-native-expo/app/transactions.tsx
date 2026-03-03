import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTransactions } from '../hooks/useData';
import { Tokens } from '../constants/Tokens';

export default function Transactions() {
  const insets = useSafeAreaInsets();
  const { transactions } = useTransactions();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(
    (t) =>
      t.notes?.toLowerCase().includes(search.toLowerCase()) ||
      t.category_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={{ padding: Tokens.spacing.l }}>
        <Text style={styles.title}>
          Transactions
        </Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search transactions..."
            onChangeText={setSearch}
            value={search}
            style={styles.searchInput}
          />
        </View>

        <ScrollView style={{ flex: 1 }}>
          {filtered.map((t) => (
            <View key={t.id} style={styles.transactionItem}>
              <View
                style={[styles.categoryIcon, { backgroundColor: t.category_color || '#E5E7EB' }]}
              >
                <Text style={styles.categoryIconText}>
                  {t.category_name?.[0]}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>{t.notes || 'No notes'}</Text>
                <Text style={{ fontSize: 12, color: Tokens.colors.textSecondary }}>
                  {t.category_name} • {t.date}
                </Text>
              </View>
              <Text style={styles.amount}>
                -${t.amount}
              </Text>
            </View>
          ))}
          {filtered.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={{ color: Tokens.colors.textSecondary }}>No transactions found</Text>
            </View>
          )}
        </ScrollView>
      </View>
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
    color: Tokens.colors.textPrimaryLight,
  },
  searchContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 14,
    color: '#111827',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryIconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  amount: {
    fontWeight: '700',
    color: Tokens.colors.danger,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
});
