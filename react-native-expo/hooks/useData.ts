import { useState, useEffect, useCallback } from 'react';
import { useDatabase } from '../database/db';

export function useTransactions() {
  const db = useDatabase();
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = useCallback(async () => {
    if (!db) return;
    const res = await db.getAllAsync(`
      SELECT t.*, c.name as category_name, c.icon as category_icon, c.color as category_color
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY date DESC
    `);
    setTransactions(res);
  }, [db]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (
    amount: number,
    categoryId: number,
    date: string,
    notes: string,
    tag: string,
  ) => {
    if (!db) return;
    await db.runAsync(
      'INSERT INTO transactions (amount, category_id, date, notes, tag) VALUES (?, ?, ?, ?, ?)',
      [amount, categoryId, date, notes, tag],
    );
    await fetchTransactions();
  };

  const deleteTransaction = async (id: number) => {
    if (!db) return;
    await db.runAsync('DELETE FROM transactions WHERE id = ?', [id]);
    await fetchTransactions();
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    refresh: fetchTransactions,
  };
}

export function useBudget() {
  const db = useDatabase();
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = useCallback(async () => {
    if (!db) return;
    // Calculate spent per category for current month
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const res = await db.getAllAsync(
      `
      SELECT c.*,
      (SELECT SUM(amount) FROM transactions WHERE category_id = c.id AND strftime('%m', date) = ? AND strftime('%Y', date) = ?) as spent
      FROM categories c
    `,
      [currentMonth.toString().padStart(2, '0'), currentYear.toString()],
    );
    setCategories(res);
  }, [db]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, refresh: fetchCategories };
}

export function useDashboardStats() {
  const db = useDatabase();
  const [stats, setStats] = useState({
    income: 0,
    spent: 0,
    saved: 0,
    netWorth: 0,
  });

  const fetchStats = useCallback(async () => {
    if (!db) return;

    const incomeRes = await db.getFirstAsync<{ total: number }>('SELECT SUM(amount) as total FROM income');
    const spentRes = await db.getFirstAsync<{ total: number }>('SELECT SUM(amount) as total FROM transactions');
    const assetsRes = await db.getFirstAsync<{ total: number }>('SELECT SUM(value) as total FROM assets');
    const liabilitiesRes = await db.getFirstAsync<{ total: number }>('SELECT SUM(amount_owed) as total FROM liabilities');

    const income = incomeRes?.total || 0;
    const spent = spentRes?.total || 0;
    const assets = assetsRes?.total || 0;
    const liabilities = liabilitiesRes?.total || 0;

    setStats({
      income,
      spent,
      saved: income - spent,
      netWorth: assets - liabilities,
    });
  }, [db]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return stats;
}
