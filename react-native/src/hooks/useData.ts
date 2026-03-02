import { useEffect, useState } from 'react';
import { AppDatabase } from '../database/db';

export function useDatabase() {
  const [db, setDb] = useState<AppDatabase | null>(null);

  useEffect(() => {
    AppDatabase.getInstance().then(setDb);
  }, []);

  return db;
}

export function useTransactions() {
  const db = useDatabase();
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = () => {
    if (!db) return;
    const res = db.exec(`
      SELECT t.*, c.name as category_name, c.icon as category_icon, c.color as category_color
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY date DESC
    `);
    setTransactions(res);
  };

  useEffect(() => {
    fetchTransactions();
  }, [db]);

  const addTransaction = (
    amount: number,
    categoryId: number,
    date: string,
    notes: string,
    tag: string,
  ) => {
    if (!db) return;
    db.run(
      'INSERT INTO transactions (amount, category_id, date, notes, tag) VALUES (?, ?, ?, ?, ?)',
      [amount, categoryId, date, notes, tag],
    );
    fetchTransactions();
  };

  const deleteTransaction = (id: number) => {
    if (!db) return;
    db.run('DELETE FROM transactions WHERE id = ?', [id]);
    fetchTransactions();
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

  const fetchCategories = () => {
    if (!db) return;
    // Calculate spent per category for current month
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const res = db.exec(
      `
      SELECT c.*,
      (SELECT SUM(amount) FROM transactions WHERE category_id = c.id AND strftime('%m', date) = ? AND strftime('%Y', date) = ?) as spent
      FROM categories c
    `,
      [currentMonth.toString().padStart(2, '0'), currentYear.toString()],
    );
    setCategories(res);
  };

  useEffect(() => {
    fetchCategories();
  }, [db]);

  return { categories, refresh: fetchCategories };
}
