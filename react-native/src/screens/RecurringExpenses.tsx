import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Card } from '../components/Common';
import { useDatabase } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function RecurringExpenses() {
  const db = useDatabase();
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    setExpenses(
      db.exec(`
      SELECT r.*, c.name as category_name, c.icon as category_icon, c.color as category_color
      FROM recurring_expenses r
      LEFT JOIN categories c ON r.category_id = c.id
    `),
    );
  }, [db]);

  const total = expenses.reduce(
    (acc, curr) => acc + (curr.is_active ? curr.amount : 0),
    0,
  );

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
        Recurring
      </Text>

      <Card
        style={{ backgroundColor: 'rgba(27, 94, 32, 0.1)', border: 'none' }}
      >
        <Text style={{ fontSize: 14, color: tokens.colors.textSecondary }}>
          Total Monthly Fixed
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: tokens.colors.primary,
            marginTop: 4,
          }}
        >
          ${total.toFixed(2)}
        </Text>
      </Card>

      {expenses.map((exp) => (
        <View
          key={exp.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 16,
            backgroundColor: 'white',
            borderRadius: 16,
            marginBottom: 12,
            opacity: exp.is_active ? 1 : 0.6,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: `${exp.category_color}20`,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 16,
            }}
          >
            <Text style={{ color: exp.category_color, fontWeight: 'bold' }}>
              {exp.category_name?.[0]}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '700' }}>{exp.name}</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>
              Due: {exp.day_of_month}th of month
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: '700' }}>${exp.amount}</Text>
            <View
              style={{
                width: 36,
                height: 20,
                backgroundColor: exp.is_active
                  ? tokens.colors.primary
                  : '#D1D5DB',
                borderRadius: 10,
                marginTop: 4,
              }}
            />
          </View>
        </View>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
