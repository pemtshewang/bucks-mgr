import { useState } from '@lynx-js/react';
import { tokens } from '../styles/tokens';
import { AnnualOverview } from './AnnualOverview';
import { MonthlyReport } from './MonthlyReport';
import { SavingsTracker } from './SavingsTracker';
import { WhatIfSimulator } from './WhatIfSimulator';

export function Reports() {
  const [reportTab, setReportTab] = useState('Monthly');

  return (
    <view style={{ flex: 1 }}>
      <view
        style={{
          flexDirection: 'row',
          padding: 16,
          backgroundColor: 'white',
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        }}
      >
        {['Monthly', 'Annual', 'Savings', 'What-If'].map((t) => (
          <view
            key={t}
            bindtap={() => setReportTab(t)}
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
            <text
              style={{
                fontSize: 12,
                color: reportTab === t ? 'white' : tokens.colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {t}
            </text>
          </view>
        ))}
      </view>

      <view style={{ flex: 1 }}>
        {reportTab === 'Monthly' && <MonthlyReport />}
        {reportTab === 'Annual' && <AnnualOverview />}
        {reportTab === 'Savings' && <SavingsTracker />}
        {reportTab === 'What-If' && <WhatIfSimulator />}
      </view>
    </view>
  );
}
