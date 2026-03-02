import { View, Text, ScrollView } from 'react-native';
import { Card } from '../components/Common';
import { tokens } from '../styles/tokens';

export function Settings() {
  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginBottom: 24 }}>
        Settings
      </Text>

      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: tokens.colors.primary,
          marginBottom: 12,
          marginLeft: 4,
        }}
      >
        PREFERENCES
      </Text>
      <Card style={{ padding: 0 }}>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '500' }}>Currency</Text>
          <Text style={{ color: tokens.colors.textSecondary }}>USD ($)</Text>
        </View>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '500' }}>Appearance</Text>
          <Text style={{ color: tokens.colors.textSecondary }}>System</Text>
        </View>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '500' }}>Monthly Reminder</Text>
          <View
            style={{
              width: 40,
              height: 24,
              backgroundColor: '#D1D5DB',
              borderRadius: 12,
            }}
          />
        </View>
      </Card>

      <Text
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
      </Text>
      <Card style={{ padding: 0 }}>
        <View
          style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
          }}
        >
          <Text style={{ fontWeight: '500' }}>Export Data as CSV</Text>
        </View>
        <View style={{ padding: 16 }}>
          <Text style={{ fontWeight: '500', color: tokens.colors.danger }}>
            Reset All Data
          </Text>
        </View>
      </Card>

      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{ fontSize: 12, color: tokens.colors.textSecondary }}>
          Version 1.0.0
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: tokens.colors.textSecondary,
            marginTop: 4,
          }}
        >
          Built with LynxJS
        </Text>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
