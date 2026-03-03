import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart } from '../../components/Charts';
import { Card, StatCard } from '../../components/Common';
import { useDashboardStats } from '../../hooks/useData';
import { Tokens } from '../../constants/Tokens';

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const stats = useDashboardStats();
  const [savingsHistory] = useState([100, 200, 150, 300, 250, 400]);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ padding: Tokens.spacing.l }}
    >
      <Text style={styles.title}>
        Dashboard
      </Text>

      <View style={styles.row}>
        <StatCard
          label="Income"
          value={`$${stats.income}`}
          color={Tokens.colors.success}
        />
        <StatCard
          label="Spent"
          value={`$${stats.spent}`}
          color={Tokens.colors.danger}
        />
      </View>

      <View style={styles.row}>
        <StatCard label="Saved" value={`$${stats.saved}`} />
        <StatCard label="Balance" value={`$${stats.income - stats.spent}`} />
      </View>

      <Card>
        <Text style={styles.cardTitle}>
          Monthly Savings
        </Text>
        <BarChart data={savingsHistory} height={150} />
      </Card>

      <Card style={{ backgroundColor: Tokens.colors.primary }}>
        <Text style={styles.netWorthLabel}>
          Net Worth
        </Text>
        <Text style={styles.netWorthValue}>
          ${stats.netWorth}
        </Text>
      </Card>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Tokens.colors.backgroundLight,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: Tokens.colors.textPrimaryLight,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Tokens.spacing.l,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  netWorthLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  netWorthValue: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginTop: 4,
  },
});
