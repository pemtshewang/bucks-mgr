import { Pressable, View, Text } from 'react-native';
import { useState } from 'react';
import { tokens } from '../styles/tokens';
import { AnnualOverview } from './AnnualOverview';
import { MonthlyReport } from './MonthlyReport';
import { SavingsTracker } from './SavingsTracker';
import { WhatIfSimulator } from './WhatIfSimulator';

export function Reports() {
  const [reportTab, setReportTab] = useState('Monthly');

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        {['Monthly', 'Annual', 'Savings', 'What-If'].map((t) => (
          <Pressable
            key={t}
            onPress={() => setReportTab(t)}
            style={{
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 12,
              paddingRight: 12,
              borderRadius: 20,
              backgroundColor:
                reportTab === t ? tokens.colors.primary : 'transparent',
              marginRight: 8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: reportTab === t ? 'white' : tokens.colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {t}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {reportTab === 'Monthly' && <MonthlyReport />}
        {reportTab === 'Annual' && <AnnualOverview />}
        {reportTab === 'Savings' && <SavingsTracker />}
        {reportTab === 'What-If' && <WhatIfSimulator />}
      </View>
    </View>
  );
}
