import { AppDatabase } from '../database/db';

export async function exportToCSV(): Promise<string> {
  const db = await AppDatabase.getInstance();
  const tables = [
    'income',
    'categories',
    'transactions',
    'recurring_expenses',
    'monthly_summary',
    'savings_log',
    'goals',
    'goal_contributions',
    'net_worth_snapshots',
    'assets',
    'liabilities',
  ];

  let csvContent = '';

  for (const table of tables) {
    const data = db.exec(`SELECT * FROM ${table}`);
    if (data.length === 0) continue;

    csvContent += `--- ${table.toUpperCase()} ---\n`;
    const headers = Object.keys(data[0]);
    csvContent += `${headers.join(',')}\n`;

    for (const row of data) {
      csvContent += `${headers
        .map((h) => {
          const val = row[h];
          if (
            typeof val === 'string' &&
            (val.includes(',') || val.includes('\n'))
          ) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(',')}\n`;
    }
    csvContent += '\n';
  }

  return csvContent;
}
