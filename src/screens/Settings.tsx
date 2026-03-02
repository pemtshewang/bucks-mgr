import { Card } from '../components/Common';
import { tokens } from '../styles/tokens';

export function Settings() {
  return (
    <scroll-view style={{ flex: 1, padding: 16 }}>
      <text style={{ fontSize: 24, fontWeight: '700', marginBottom: 24 }}>
        Settings
      </text>

      <text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: tokens.colors.primary,
          marginBottom: 12,
          marginLeft: 4,
        }}
      >
        PREFERENCES
      </text>
      <Card style={{ padding: 0 }}>
        <view
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <text style={{ fontWeight: '500' }}>Currency</text>
          <text style={{ color: tokens.colors.textSecondary }}>USD ($)</text>
        </view>
        <view
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <text style={{ fontWeight: '500' }}>Appearance</text>
          <text style={{ color: tokens.colors.textSecondary }}>System</text>
        </view>
        <view
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <text style={{ fontWeight: '500' }}>Monthly Reminder</text>
          <view
            style={{
              width: 40,
              height: 24,
              backgroundColor: '#D1D5DB',
              borderRadius: 12,
            }}
          />
        </view>
      </Card>

      <text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: tokens.colors.primary,
          marginBottom: 12,
          marginTop: 24,
          marginLeft: 4,
        }}
      >
        DATA MANAGEMENT
      </text>
      <Card style={{ padding: 0 }}>
        <view
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
          }}
        >
          <text style={{ fontWeight: '500' }}>Export Data as CSV</text>
        </view>
        <view style={{ padding: 16 }}>
          <text style={{ fontWeight: '500', color: tokens.colors.danger }}>
            Reset All Data
          </text>
        </view>
      </Card>

      <view style={{ alignItems: 'center', marginTop: 40 }}>
        <text style={{ fontSize: 12, color: tokens.colors.textSecondary }}>
          Version 1.0.0
        </text>
        <text
          style={{
            fontSize: 12,
            color: tokens.colors.textSecondary,
            marginTop: 4,
          }}
        >
          Built with LynxJS
        </text>
      </view>
      <view style={{ height: 100 }} />
    </scroll-view>
  );
}
