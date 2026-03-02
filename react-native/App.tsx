import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Tab = 'Home' | 'Budget' | 'Goals' | 'Reports' | 'Settings';
type ReportTab = 'Monthly' | 'Annual' | 'Savings' | 'What-If';

type BudgetCategory = {
  id: number;
  name: string;
  color: string;
  monthlyLimit: number;
  spent: number;
};

const theme = {
  primary: '#1B5E20',
  danger: '#DC2626',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  card: '#FFFFFF',
  background: '#F8FAFC',
  border: '#E5E7EB',
};

const categories: BudgetCategory[] = [
  { id: 1, name: 'Food', color: '#EF4444', monthlyLimit: 600, spent: 385 },
  { id: 2, name: 'Transport', color: '#3B82F6', monthlyLimit: 300, spent: 165 },
  { id: 3, name: 'Utilities', color: '#10B981', monthlyLimit: 240, spent: 220 },
  { id: 4, name: 'Shopping', color: '#8B5CF6', monthlyLimit: 250, spent: 145 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>{renderTab(activeTab)}</View>
      <View style={styles.tabBar}>
        {(['Home', 'Budget', 'Goals', 'Reports', 'Settings'] as Tab[]).map(
          (tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab && styles.tabLabelActive,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ),
        )}
      </View>
    </SafeAreaView>
  );
}

function renderTab(activeTab: Tab) {
  if (activeTab === 'Home') return <DashboardScreen />;
  if (activeTab === 'Budget') return <BudgetScreen />;
  if (activeTab === 'Goals') return <GoalsScreen />;
  if (activeTab === 'Reports') return <ReportsScreen />;
  return <SettingsScreen />;
}

function DashboardScreen() {
  const stats = useMemo(() => {
    const income = 7200;
    const spent = categories.reduce((sum, c) => sum + c.spent, 0);
    return {
      income,
      spent,
      saved: income - spent,
      balance: income - spent,
      netWorth: 116200,
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.row}>
        <StatCard label="Income" value={`$${stats.income}`} color={theme.primary} />
        <StatCard label="Spent" value={`$${stats.spent}`} color={theme.danger} />
      </View>
      <View style={styles.row}>
        <StatCard label="Saved" value={`$${stats.saved}`} />
        <StatCard label="Balance" value={`$${stats.balance}`} />
      </View>
      <Card>
        <Text style={styles.sectionTitle}>Monthly Savings</Text>
        <Text style={styles.bodyMuted}>Chart placeholder for React Native version.</Text>
      </Card>
      <Card style={{ backgroundColor: theme.primary }}>
        <Text style={[styles.bodyMuted, { color: 'rgba(255,255,255,0.85)' }]}>Net Worth</Text>
        <Text style={[styles.title, { color: 'white', marginBottom: 0 }]}>${stats.netWorth}</Text>
      </Card>
    </ScrollView>
  );
}

function BudgetScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Budget</Text>
      <View style={[styles.row, { flexWrap: 'wrap' }]}>
        {categories.map((cat) => {
          const pct = Math.min((cat.spent / cat.monthlyLimit) * 100, 100);
          return (
            <Card key={cat.id} style={styles.budgetCard}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}> 
                <Text style={styles.categoryIconText}>{cat.name[0]}</Text>
              </View>
              <Text style={styles.cardHeading}>{cat.name}</Text>
              <Text style={styles.bodyMuted}>
                ${cat.spent} of ${cat.monthlyLimit}
              </Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${pct}%`,
                      backgroundColor: pct > 90 ? theme.danger : theme.primary,
                    },
                  ]}
                />
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

function GoalsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Goals</Text>
      <Card>
        <Text style={styles.cardHeading}>Emergency Fund</Text>
        <Text style={styles.bodyMuted}>$8,200 / $10,000</Text>
      </Card>
      <Card>
        <Text style={styles.cardHeading}>Vacation</Text>
        <Text style={styles.bodyMuted}>$1,450 / $2,500</Text>
      </Card>
    </ScrollView>
  );
}

function ReportsScreen() {
  const [reportTab, setReportTab] = useState<ReportTab>('Monthly');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.reportsTabs}>
        {(['Monthly', 'Annual', 'Savings', 'What-If'] as ReportTab[]).map((tab) => (
          <Pressable
            key={tab}
            style={[
              styles.reportsTabButton,
              reportTab === tab && { backgroundColor: theme.primary },
            ]}
            onPress={() => setReportTab(tab)}
          >
            <Text
              style={[
                styles.reportsTabLabel,
                reportTab === tab && { color: 'white' },
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.title}>{reportTab} Report</Text>
        <Card>
          <Text style={styles.bodyMuted}>
            This section mirrors the Lynx report tabs and can be wired to live data.
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Settings</Text>
      <Card>
        <Text style={styles.cardHeading}>Currency</Text>
        <TextInput defaultValue="USD" style={styles.input} />
      </Card>
      <Card>
        <Text style={styles.cardHeading}>Monthly Budget Limit</Text>
        <TextInput defaultValue="2000" keyboardType="numeric" style={styles.input} />
      </Card>
    </ScrollView>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function StatCard({
  label,
  value,
  color = theme.textPrimary,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <Card style={styles.statCard}>
      <Text style={styles.bodyMuted}>{label}</Text>
      <Text style={[styles.cardHeading, { color }]}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.background },
  content: { flex: 1 },
  screen: { padding: 16, paddingBottom: 120 },
  title: { fontSize: 24, fontWeight: '700', color: theme.textPrimary, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 8 },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: theme.card,
    borderColor: theme.border,
    borderWidth: 1,
    marginBottom: 12,
  },
  statCard: { flex: 1 },
  cardHeading: { fontSize: 16, fontWeight: '700', color: theme.textPrimary, marginBottom: 6 },
  bodyMuted: { color: theme.textSecondary, fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: theme.textPrimary },
  tabBar: {
    flexDirection: 'row',
    height: 62,
    borderTopColor: theme.border,
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 11, color: theme.textSecondary, fontWeight: '500' },
  tabLabelActive: { color: theme.primary, fontWeight: '700' },
  budgetCard: { width: '48%' },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryIconText: { color: 'white', fontWeight: '700' },
  progressTrack: {
    marginTop: 8,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  progressFill: { height: '100%' },
  reportsTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: 'white',
  },
  reportsTabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  reportsTabLabel: { color: theme.textSecondary, fontSize: 12, fontWeight: '600' },
  input: {
    marginTop: 8,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: theme.textPrimary,
  },
});
