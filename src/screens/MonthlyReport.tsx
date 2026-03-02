import { useEffect, useState } from '@lynx-js/react';
import { Card } from '../components/Common';
import { useDatabase } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function MonthlyReport() {
  const db = useDatabase();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!db) return;
    const currentMonth = new Date().getMonth() + 1;
    const res = db.exec(
      `
      SELECT c.name, c.color, SUM(t.amount) as spent
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE strftime('%m', t.date) = ?
      GROUP BY c.id
    `,
      [currentMonth.toString().padStart(2, '0')],
    );
    setData(res);
  }, [db]);

  const total = data.reduce((acc, curr) => acc + curr.spent, 0);

  return (
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <text style={{ fontSize: 20, fontWeight: '700', marginBottom: 16 }}>
        Category Breakdown
      </text>

      {data.map((item) => (
        <view
          key={item.name}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <view
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: item.color,
              marginRight: 12,
            }}
          />
          <text style={{ flex: 1, fontWeight: '600' }}>{item.name}</text>
          <text style={{ fontWeight: '700', marginRight: 12 }}>
            ${item.spent.toFixed(2)}
          </text>
          <text style={{ color: tokens.colors.textSecondary, fontSize: 12 }}>
            {((item.spent / total) * 100).toFixed(0)}%
          </text>
        </view>
      ))}

      <Card style={{ marginTop: 20 }}>
        <text style={{ fontWeight: '700', marginBottom: 8 }}>Insight</text>
        <text
          style={{
            fontSize: 14,
            color: tokens.colors.textSecondary,
            lineHeight: 20,
          }}
        >
          You've spent most of your budget on {data[0]?.name || '...'} this
          month. Try to reduce flexible spending to reach your savings goal
          faster!
        </text>
      </Card>

      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
