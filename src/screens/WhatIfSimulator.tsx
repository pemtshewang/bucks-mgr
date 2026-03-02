import { useState } from '@lynx-js/react';
import { Card } from '../components/Common';
import { tokens } from '../styles/tokens';

export function WhatIfSimulator() {
  const [extra, _setExtra] = useState(200);

  return (
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <Card>
        <text
          style={{
            fontSize: 14,
            color: tokens.colors.textSecondary,
            marginBottom: 8,
          }}
        >
          If I save an extra
        </text>
        <view style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <text
            style={{
              fontSize: 36,
              fontWeight: '800',
              color: tokens.colors.primary,
            }}
          >
            ${extra}
          </text>
          <text
            style={{
              fontSize: 18,
              color: tokens.colors.textSecondary,
              marginLeft: 4,
            }}
          >
            / month
          </text>
        </view>
        <view style={{ height: 40, justifyContent: 'center', marginTop: 16 }}>
          <view
            style={{ height: 4, backgroundColor: '#E5E7EB', borderRadius: 2 }}
          >
            <view
              style={{
                width: '40%',
                height: '100%',
                backgroundColor: tokens.colors.primary,
                borderRadius: 2,
              }}
            />
          </view>
        </view>
      </Card>

      <text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        Projected Impact
      </text>

      <Card>
        <text style={{ fontWeight: '700', fontSize: 16, marginBottom: 4 }}>
          Emergency Fund
        </text>
        <text
          style={{
            color: tokens.colors.success,
            fontWeight: '600',
            fontSize: 14,
          }}
        >
          3 months faster
        </text>
        <view style={{ flexDirection: 'row', marginTop: 12 }}>
          <view style={{ flex: 1 }}>
            <text style={{ fontSize: 12, color: tokens.colors.textSecondary }}>
              Current
            </text>
            <text style={{ fontWeight: '500' }}>Oct 2024</text>
          </view>
          <view style={{ flex: 1 }}>
            <text style={{ fontSize: 12, color: tokens.colors.primary }}>
              New
            </text>
            <text style={{ fontWeight: '700' }}>July 2024</text>
          </view>
        </view>
      </Card>

      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
