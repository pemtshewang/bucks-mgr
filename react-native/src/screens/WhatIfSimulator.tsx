import { View, Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { Card } from '../components/Common';
import { tokens } from '../styles/tokens';

export function WhatIfSimulator() {
  const [extra, _setExtra] = useState(200);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Card>
        <Text
          style={{
            fontSize: 14,
            color: tokens.colors.textSecondary,
            marginBottom: 8,
          }}
        >
          If I save an extra
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: '800',
              color: tokens.colors.primary,
            }}
          >
            ${extra}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: tokens.colors.textSecondary,
              marginLeft: 4,
            }}
          >
            / month
          </Text>
        </View>
        <View style={{ height: 40, justifyContent: 'center', marginTop: 16 }}>
          <View
            style={{ height: 4, backgroundColor: '#E5E7EB', borderRadius: 2 }}
          >
            <View
              style={{
                width: '40%',
                height: '100%',
                backgroundColor: tokens.colors.primary,
                borderRadius: 2,
              }}
            />
          </View>
        </View>
      </Card>

      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        Projected Impact
      </Text>

      <Card>
        <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 4 }}>
          Emergency Fund
        </Text>
        <Text
          style={{
            color: tokens.colors.success,
            fontWeight: '600',
            fontSize: 14,
          }}
        >
          3 months faster
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: tokens.colors.textSecondary }}>
              Current
            </Text>
            <Text style={{ fontWeight: '500' }}>Oct 2024</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: tokens.colors.primary }}>
              New
            </Text>
            <Text style={{ fontWeight: '700' }}>July 2024</Text>
          </View>
        </View>
      </Card>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}
