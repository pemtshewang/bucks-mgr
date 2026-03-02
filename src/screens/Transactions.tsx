import { useState } from '@lynx-js/react';
import { useTransactions } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function Transactions() {
  const { transactions } = useTransactions();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(
    (t) =>
      t.notes?.toLowerCase().includes(search.toLowerCase()) ||
      t.category_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <view style={{ flex: 1, padding: 16 }}>
      <text style={{ fontSize: 24, fontWeight: '700', marginBottom: 20 }}>
        Transactions
      </text>

      <view
        style={{
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
      >
        <input
          placeholder="Search transactions..."
          bindinput={(e) => setSearch(e.detail.value)}
          style={{ fontSize: 14, color: '#111827' } as any}
        />
      </view>

      <scroll-view style={{ flex: 1 }}>
        {filtered.map((t) => (
          <view
            key={t.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              backgroundColor: 'white',
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <view
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: t.category_color || '#E5E7EB',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <text style={{ color: 'white', fontWeight: 'bold' }}>
                {t.category_name?.[0]}
              </text>
            </view>
            <view style={{ flex: 1 }}>
              <text style={{ fontWeight: '600' }}>{t.notes || 'No notes'}</text>
              <text style={{ fontSize: 12, color: '#6B7280' }}>
                {t.category_name} • {t.date}
              </text>
            </view>
            <text style={{ fontWeight: '700', color: tokens.colors.danger }}>
              -${t.amount}
            </text>
          </view>
        ))}
        {filtered.length === 0 && (
          <view style={{ alignItems: 'center', marginTop: 40 }}>
            <text style={{ color: '#6B7280' }}>No transactions found</text>
          </view>
        )}
      </scroll-view>
    </view>
  );
}
