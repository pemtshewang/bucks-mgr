import { View, Text, ScrollView } from 'react-native';
import { Card } from '../components/Common';
import { useBudget } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function Budget() {
  const { categories } = useBudget();

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
        Budget
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {categories.map((cat) => {
          const spent = cat.spent || 0;
          const limit = cat.monthly_limit || 1;
          const percent = Math.min((spent / limit) * 100, 100);

          return (
            <Card key={cat.id} style={{ width: '48%' }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: cat.color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {cat.name[0]}
                </Text>
              </View>
              <Text style={{ fontWeight: '700', marginBottom: 4 }}>
                {cat.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: tokens.colors.textSecondary }}
                >
                  ${spent}
                </Text>
                <Text
                  style={{ fontSize: 12, color: tokens.colors.textSecondary }}
                >
                  of ${cat.monthly_limit}
                </Text>
              </View>
              <View
                style={{
                  height: 4,
                  backgroundColor: '#E5E7EB',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    width: `${percent}%`,
                    height: '100%',
                    backgroundColor:
                      percent > 90
                        ? tokens.colors.danger
                        : tokens.colors.primary,
                  }}
                />
              </View>
            </Card>
          );
        })}
      </View>

      <View
        style={{
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: '#D1D5DB',
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#6B7280', fontWeight: '600' }}>
          + Add New Category
        </Text>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
