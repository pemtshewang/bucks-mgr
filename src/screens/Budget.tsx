import { Card } from '../components/Common';
import { useBudget } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function Budget() {
  const { categories } = useBudget();

  return (
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
        Budget
      </text>

      <view
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
              <view
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
                <text style={{ color: 'white', fontWeight: 'bold' }}>
                  {cat.name[0]}
                </text>
              </view>
              <text style={{ fontWeight: '700', marginBottom: 4 }}>
                {cat.name}
              </text>
              <view
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <text
                  style={{ fontSize: 12, color: tokens.colors.textSecondary }}
                >
                  ${spent}
                </text>
                <text
                  style={{ fontSize: 12, color: tokens.colors.textSecondary }}
                >
                  of ${cat.monthly_limit}
                </text>
              </view>
              <view
                style={{
                  height: 4,
                  backgroundColor: '#E5E7EB',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <view
                  style={{
                    width: `${percent}%`,
                    height: '100%',
                    backgroundColor:
                      percent > 90
                        ? tokens.colors.danger
                        : tokens.colors.primary,
                  }}
                />
              </view>
            </Card>
          );
        })}
      </view>

      <view
        style={{
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: '#D1D5DB',
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
        }}
      >
        <text style={{ color: '#6B7280', fontWeight: '600' }}>
          + Add New Category
        </text>
      </view>

      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
