import { View, Text, ScrollView } from 'react-native';
import { Card } from '../components/Common';

export function AnnualOverview() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {months.map((m) => (
          <Card
            key={m}
            style={{
              width: '48%',
              height: 120,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>
              {m}
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Income: $0</Text>
            <Text style={{ fontSize: 12, color: '#6B7280' }}>Spent: $0</Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#1B5E20',
                marginTop: 8,
              }}
            >
              +$0.00
            </Text>
          </Card>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
