import { tokens } from '../styles/tokens';

export function Card({ children, style }: { children: any; style?: any }) {
  return (
    <view
      style={{
        borderRadius: 16,
        padding: 16,
        backgroundColor: 'white', // Should be token-based but simplified for now
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </view>
  );
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger';
  style?: any;
}) {
  return (
    <view
      bindtap={onPress}
      style={{
        borderRadius: 12,
        padding: 12,
        backgroundColor:
          variant === 'primary' ? tokens.colors.primary : tokens.colors.danger,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
        {title}
      </text>
    </view>
  );
}

export function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <Card style={{ flex: 1, marginHorizontal: 4 }}>
      <text style={{ fontSize: 12, color: tokens.colors.textSecondary }}>
        {label}
      </text>
      <text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: color || tokens.colors.textPrimaryLight,
          marginTop: 4,
        }}
      >
        {value}
      </text>
    </Card>
  );
}
