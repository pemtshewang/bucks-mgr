import React from 'react';
import { View, StyleSheet } from 'react-native';

export function BarChart({
  data,
  height = 200,
}: {
  data: number[];
  height?: number;
}) {
  const max = Math.max(...data, 1);
  const barWidth = 100 / data.length - 2;

  return (
    <View
      style={[
        styles.container,
        { height },
      ]}
    >
      {data.map((val, i) => (
        <View
          key={i}
          style={{
            width: `${barWidth}%`,
            height: `${(val / max) * 100}%`,
            backgroundColor: '#1B5E20',
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
}

export function LineChart({
  data,
  height = 200,
}: {
  data: number[];
  height?: number;
}) {
  const max = Math.max(...data, 1);
  const barWidth = 100 / data.length - 2;

  return (
    <View
      style={[
        styles.container,
        { height },
      ]}
    >
      {data.map((val, i) => (
        <View
          key={i}
          style={{
            width: `${barWidth}%`,
            height: `${(val / max) * 100}%`,
            backgroundColor: '#1B5E20',
            borderRadius: 4,
            opacity: 0.5,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
