import { useState } from '@lynx-js/react';
import { Budget } from '../screens/Budget';
import { Dashboard } from '../screens/Dashboard';
import { Goals } from '../screens/Goals';
import { Reports } from '../screens/Reports';
import { Settings } from '../screens/Settings';

export function TabNavigator() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <Dashboard />;
      case 'Budget':
        return <Budget />;
      case 'Goals':
        return <Goals />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <view style={{ flex: 1 }}>
      <view style={{ flex: 1 }}>{renderScreen()}</view>
      <view className="TabBar" style={styles.tabBar as any}>
        {['Home', 'Budget', 'Goals', 'Reports', 'Settings'].map((tab) => (
          <view
            key={tab}
            bindtap={() => setActiveTab(tab)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <text
              style={{
                fontSize: 10,
                color: activeTab === tab ? '#1B5E20' : '#6B7280',
                fontWeight: activeTab === tab ? '700' : '400',
              }}
            >
              {tab}
            </text>
          </view>
        ))}
      </view>
    </view>
  );
}

const styles = {
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 5,
  },
};
