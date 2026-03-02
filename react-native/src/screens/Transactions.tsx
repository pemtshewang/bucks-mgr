import { View, Text, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { useTransactions } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function Transactions() {
  const { transactions } = useTransactions();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(
    (t) =>
      t.notes?.toLowerCase().includes(search.toLowerCase()) ||
      t.category_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
        Transactions
      </Text>

      <View
        style={{
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      >
        <TextInput
          placeholder="Search transactions..."
          onChangeText={(value) => setSearch(value)}
          style={{ fontSize: 14, color: '#111827' }}
        />
      </View>

      <ScrollView style={{ flex: 1 }}>
        {filtered.map((t) => (
          <View
            key={t.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              backgroundColor: 'white',
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: t.category_color || '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {t.category_name?.[0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{t.notes || 'No notes'}</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>
                {t.category_name} • {t.date}
              </Text>
            </View>
            <Text style={{ fontWeight: '700', color: tokens.colors.danger }}>
              -${t.amount}
            </Text>
          </View>
        ))}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#6B7280' }}>No transactions found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
