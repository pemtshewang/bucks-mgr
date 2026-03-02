import { useEffect, useState } from '@lynx-js/react';
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
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <view style={{ alignItems: 'center', marginTop: 32, marginBottom: 32 }}>
        <text style={{ fontSize: 14, color: tokens.colors.textSecondary }}>
          Total Net Worth
        </text>
        <text
          style={{
            fontSize: 40,
            fontWeight: '800',
            color: tokens.colors.textPrimaryLight,
          }}
        >
          ${netWorth.toLocaleString()}
        </text>
      </view>

      <Card>
        <text style={{ fontSize: 16, fontWeight: '700', marginBottom: 16 }}>
          Trend
        </text>
        <view
          style={{ height: 120, backgroundColor: '#F3F4F6', borderRadius: 8 }}
        />
      </Card>

      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          marginTop: 24,
        }}
      >
        <text style={{ fontSize: 20, fontWeight: '700' }}>Assets</text>
        <text style={{ color: tokens.colors.success, fontWeight: '700' }}>
          ${totalAssets}
        </text>
      </view>
      {assets.map((a) => (
        <Card key={a.id} style={{ marginBottom: 8, padding: 12 }}>
          <view
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <text style={{ fontWeight: '600' }}>{a.name}</text>
            <text style={{ fontWeight: '700' }}>${a.value}</text>
          </view>
        </Card>
      ))}

      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          marginTop: 32,
        }}
      >
        <text style={{ fontSize: 20, fontWeight: '700' }}>Liabilities</text>
        <text style={{ color: tokens.colors.danger, fontWeight: '700' }}>
          -${totalLiabilities}
        </text>
      </view>
      {liabilities.map((l) => (
        <Card key={l.id} style={{ marginBottom: 8, padding: 12 }}>
          <view
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <text style={{ fontWeight: '600' }}>{l.name}</text>
            <text style={{ fontWeight: '700' }}>${l.amount_owed}</text>
          </view>
        </Card>
      ))}

      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
