import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Card } from '../components/Common';
import { useDatabase } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function NetWorth() {
  const db = useDatabase();
  const [assets, setAssets] = useState<any[]>([]);
  const [liabilities, setLiabilities] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    setAssets(db.exec('SELECT * FROM assets'));
    setLiabilities(db.exec('SELECT * FROM liabilities'));
  }, [db]);

  const totalAssets = assets.reduce((acc, curr) => acc + curr.value, 0);
  const totalLiabilities = liabilities.reduce(
    (acc, curr) => acc + curr.amount_owed,
    0,
  );
  const netWorth = totalAssets - totalLiabilities;

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ alignItems: 'center', marginTop: 32, marginBottom: 32 }}>
        <Text style={{ fontSize: 14, color: tokens.colors.textSecondary }}>
          Total Net Worth
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '800',
            color: tokens.colors.textPrimaryLight,
          }}
        >
          ${netWorth.toLocaleString()}
        </Text>
      </View>

      <Card>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 16 }}>
          Trend
        </Text>
        <View
          style={{ height: 120, backgroundColor: '#F3F4F6', borderRadius: 8 }}
        />
      </Card>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          marginTop: 24,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Assets</Text>
        <Text style={{ color: tokens.colors.success, fontWeight: '700' }}>
          ${totalAssets}
        </Text>
      </View>
      {assets.map((a) => (
        <Card key={a.id} style={{ marginBottom: 8, padding: 12 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontWeight: '600' }}>{a.name}</Text>
            <Text style={{ fontWeight: '700' }}>${a.value}</Text>
          </View>
        </Card>
      ))}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          marginTop: 32,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Liabilities</Text>
        <Text style={{ color: tokens.colors.danger, fontWeight: '700' }}>
          -${totalLiabilities}
        </Text>
      </View>
      {liabilities.map((l) => (
        <Card key={l.id} style={{ marginBottom: 8, padding: 12 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontWeight: '600' }}>{l.name}</Text>
            <Text style={{ fontWeight: '700' }}>${l.amount_owed}</Text>
          </View>
        </Card>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
