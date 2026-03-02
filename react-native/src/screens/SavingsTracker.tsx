import { View, Text, ScrollView } from 'react-native';
import { BarChart } from '../components/Charts';
import { Card } from '../components/Common';

export function SavingsTracker() {
  const dummyData = [
    400, 300, 600, 800, 500, 700, 900, 1000, 850, 950, 1100, 1200,
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Card>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 20 }}>
          Savings per Month
        </Text>
        <BarChart data={dummyData} height={200} />
      </Card>

      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16 }}>
          History
        </Text>
        {dummyData
          .map((val, i) => (
            <View
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
              <Text style={{ fontWeight: '500' }}>Month {i + 1}</Text>
              <Text style={{ fontWeight: '700', color: '#1B5E20' }}>
                ${val}
              </Text>
            </View>
          ))
          .reverse()}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
