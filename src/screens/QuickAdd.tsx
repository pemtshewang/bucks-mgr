import { useState } from '@lynx-js/react';
import { Button } from '../components/Common';
import { useDatabase } from '../hooks/useData';
import { tokens } from '../styles/tokens';

export function QuickAdd({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const db = useDatabase();
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!db || !amount) return;
    db.run(
      'INSERT INTO transactions (amount, category_id, date, notes, tag) VALUES (?, ?, ?, ?, ?)',
      [
        parseFloat(amount),
        1, // Default category for now
        new Date().toISOString().split('T')[0],
        notes,
        'essential',
      ],
    );
    onSave();
  };

  return (
    <view
      style={{
        padding: 24,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      <text
        style={{
          fontSize: 20,
          fontWeight: '700',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        Add Transaction
      </text>

      <view style={{ alignItems: 'center', marginBottom: 32 }}>
        <input
          placeholder="0.00"
          type="number"
          bindinput={(e) => setAmount(e.detail.value)}
          style={
            {
              fontSize: 48,
              fontWeight: '800',
              color: tokens.colors.primary,
              textAlign: 'center',
              width: '100%',
            } as any
          }
        />
      </view>

      <view style={{ marginBottom: 24 }}>
        <text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
          Notes
        </text>
        <input
          placeholder="What was this for?"
          bindinput={(e) => setNotes(e.detail.value)}
          style={
            {
              backgroundColor: '#F3F4F6',
              borderRadius: 12,
              padding: 12,
              fontSize: 16,
            } as any
          }
        />
      </view>

      <view style={{ flexDirection: 'row', gap: 12 }}>
        <Button
          title="Cancel"
          onPress={onCancel}
          style={{ flex: 1, backgroundColor: '#E5E7EB' }}
        />
        <Button title="Save" onPress={handleSave} style={{ flex: 2 }} />
      </view>
    </view>
  );
}
