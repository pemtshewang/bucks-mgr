import { BarChart } from '../components/Charts';
import { Card } from '../components/Common';

export function SavingsTracker() {
  const dummyData = [
    400, 300, 600, 800, 500, 700, 900, 1000, 850, 950, 1100, 1200,
  ];

  return (
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <Card>
        <text style={{ fontSize: 16, fontWeight: '700', marginBottom: 20 }}>
          Savings per Month
        </text>
        <BarChart data={dummyData} height={200} />
      </Card>

      <view style={{ marginTop: 24 }}>
        <text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16 }}>
          History
        </text>
        {dummyData
          .map((val, i) => (
            <view
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 12,
                paddingBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F3F4F6',
              }}
            >
              <text style={{ fontWeight: '500' }}>Month {i + 1}</text>
              <text style={{ fontWeight: '700', color: '#1B5E20' }}>
                ${val}
              </text>
            </view>
          ))
          .reverse()}
      </view>
      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
