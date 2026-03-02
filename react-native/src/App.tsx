import { View } from 'react-native';
import { TabNavigator } from './navigation/TabNavigator';

export function App() {
  return (
    <View style={{ flex: 1 }}>
      <TabNavigator />
    </View>
  );
}
