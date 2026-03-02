import { useEffect, useState } from '@lynx-js/react';
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
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <view
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <text style={{ fontSize: 24, fontWeight: '700' }}>Savings Goals</text>
        <view
          style={{
            padding: 8,
            backgroundColor: tokens.colors.primary,
            borderRadius: 8,
          }}
        >
          <text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            +
          </text>
        </view>
      </view>

      {goals.map((goal) => {
        const percent = (goal.current_amount / goal.target_amount) * 100;
        return (
          <Card key={goal.id}>
            <view
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}
            >
              <text style={{ fontSize: 18, fontWeight: '700' }}>
                {goal.name}
              </text>
              <text style={{ color: tokens.colors.primary, fontWeight: '600' }}>
                {Math.round(percent)}%
              </text>
            </view>
            <view
              style={{
                height: 8,
                backgroundColor: '#F3F4F6',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 12,
              }}
            >
              <view
                style={{
                  width: `${percent}%`,
                  height: '100%',
                  backgroundColor: tokens.colors.primary,
                }}
              />
            </view>
            <view
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <view>
                <text style={{ fontSize: 14, fontWeight: '600' }}>
                  ${goal.current_amount}
                </text>
                <text
                  style={{ fontSize: 12, color: tokens.colors.textSecondary }}
                >
                  of ${goal.target_amount}
                </text>
              </view>
              <Button
                title="Contribute"
                onPress={() => {}}
                style={{ paddingVertical: 8, paddingHorizontal: 16 }}
              />
            </view>
          </Card>
        );
      })}

      {goals.length === 0 && (
        <view style={{ alignItems: 'center', marginTop: 60 }}>
          <text style={{ color: '#6B7280', fontSize: 16 }}>
            No active goals. Start saving today!
          </text>
        </view>
      )}

      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
