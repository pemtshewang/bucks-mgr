import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Card } from '../components/Common';
import { useDatabase } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function Goals() {
  const db = useDatabase();
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    setGoals(db.exec('SELECT * FROM goals'));
  }, [db]);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: '700' }}>Savings Goals</Text>
        <View
          style={{
            padding: 8,
            backgroundColor: tokens.colors.primary,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            +
          </Text>
        </View>
      </View>

      {goals.map((goal) => {
        const percent = (goal.current_amount / goal.target_amount) * 100;
        return (
          <Card key={goal.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                {goal.name}
              </Text>
              <Text style={{ color: tokens.colors.primary, fontWeight: '600' }}>
                {Math.round(percent)}%
              </Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: '#F3F4F6',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: `${percent}%`,
                  height: '100%',
                  backgroundColor: tokens.colors.primary,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>
                  ${goal.current_amount}
                </Text>
                <Text
                  style={{ fontSize: 12, color: tokens.colors.textSecondary }}
                >
                  of ${goal.target_amount}
                </Text>
              </View>
              <Button
                title="Contribute"
                onPress={() => {}}
                style={{ paddingVertical: 8, paddingHorizontal: 16 }}
              />
            </View>
          </Card>
        );
      })}

      {goals.length === 0 && (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Text style={{ color: '#6B7280', fontSize: 16 }}>
            No active goals. Start saving today!
          </Text>
        </View>
      )}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
