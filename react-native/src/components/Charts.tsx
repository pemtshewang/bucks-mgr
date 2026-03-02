import { View } from 'react-native';
export function BarChart({
  data,
  height = 200,
}: {
  data: number[];
  height?: number;
}) {
  const max = Math.max(...data, 1);
  const width = 300;
  const barWidth = width / data.length - 4;

  return (
    <View
      style={{
        height,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {data.map((val, i) => (
        <View
          key={i}
          style={{
            width: barWidth,
            height: (val / max) * height,
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
  // SVG points might be tricky if polyline isn't in JSX types, using simple bars for now or investigating better SVG support
  const max = Math.max(...data, 1);
  const width = 300;
  const barWidth = width / data.length - 4;

  return (
    <View
      style={{
        height,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      {data.map((val, i) => (
        <View
          key={i}
          style={{
            width: barWidth,
            height: (val / max) * height,
            backgroundColor: '#1B5E20',
            borderRadius: 4,
            opacity: 0.5,
          }}
        />
      ))}
    </View>
  );
}
