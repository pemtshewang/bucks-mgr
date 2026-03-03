import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../components/Common';
import { useBudget } from '../../hooks/useData';
import { Tokens } from '../../constants/Tokens';

export default function Budget() {
  const insets = useSafeAreaInsets();
  const { categories } = useBudget();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ padding: Tokens.spacing.l }}
    >
      <Text style={styles.title}>
        Budget
      </Text>

      <View style={styles.categoriesContainer}>
        {categories.map((cat) => {
          const spent = cat.spent || 0;
          const limit = cat.monthly_limit || 1;
          const percent = Math.min((spent / limit) * 100, 100);

          return (
            <Card key={cat.id} style={styles.categoryCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: cat.color }]}
              >
                <Text style={styles.iconText}>
                  {cat.name[0]}
                </Text>
              </View>
              <Text style={styles.categoryName}>
                {cat.name}
              </Text>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetText}>
                  ${spent}
                </Text>
                <Text style={styles.budgetText}>
                  of ${cat.monthly_limit}
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <View
                  style={{
                    width: `${percent}%`,
                    height: '100%',
                    backgroundColor:
                      percent > 90
                        ? Tokens.colors.danger
                        : Tokens.colors.primary,
                  }}
                />
              </View>
            </Card>
          );
        })}
      </View>

      <View style={styles.addCategory}>
        <Text style={styles.addCategoryText}>
          + Add New Category
        </Text>
      </View>

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
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  categoryName: {
    fontWeight: '700',
    marginBottom: 4,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 12,
    color: Tokens.colors.textSecondary,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  addCategory: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  addCategoryText: {
    color: '#6B7280',
    fontWeight: '600',
  },
});
