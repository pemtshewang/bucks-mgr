import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { BarChart } from '../components/Charts';
import { Card, StatCard } from '../components/Common';
import { useDatabase } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function Dashboard() {
  const db = useDatabase();
  const [stats, setStats] = useState({
    income: 0,
    spent: 0,
    saved: 0,
    netWorth: 0,
  });
  const [savingsHistory] = useState([100, 200, 150, 300, 250, 400]);

  useEffect(() => {
    if (!db) return;
    // Simple mock queries for stats
    const income =
      db.exec('SELECT SUM(amount) as total FROM income')[0]?.total || 0;
    const spent =
      db.exec('SELECT SUM(amount) as total FROM transactions')[0]?.total || 0;
    const assets =
      db.exec('SELECT SUM(value) as total FROM assets')[0]?.total || 0;
    const liabilities =
      db.exec('SELECT SUM(amount_owed) as total FROM liabilities')[0]?.total ||
      0;

    setStats({
      income,
      spent,
      saved: income - spent,
      netWorth: assets - liabilities,
    });
  }, [db]);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
        Dashboard
      </Text>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <StatCard
          label="Income"
          value={`$${stats.income}`}
          color={tokens.colors.success}
        />
        <StatCard
          label="Spent"
          value={`$${stats.spent}`}
          color={tokens.colors.danger}
        />
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <StatCard label="Saved" value={`$${stats.saved}`} />
        <StatCard label="Balance" value={`$${stats.income - stats.spent}`} />
      </View>

      <Card>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 12 }}>
          Monthly Savings
        </Text>
        <BarChart data={savingsHistory} height={150} />
      </Card>

      <Card style={{ backgroundColor: tokens.colors.primary }}>
        <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
          Net Worth
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: 'white',
            marginTop: 4,
          }}
        >
          ${stats.netWorth}
        </Text>
      </Card>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
