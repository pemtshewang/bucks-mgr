import { AppDatabase } from './database/db';

async function test() {
  console.log('Starting functional test...');
  try {
    const db = await AppDatabase.getInstance();

    // Test Category Seeding
    const cats = db.exec('SELECT * FROM categories');
    console.log(`Seeded categories: ${cats.length}`);
    if (cats.length === 0) throw new Error('Categories not seeded');

    // Test Transaction Insertion
    db.run(
      'INSERT INTO transactions (amount, category_id, date, notes, tag) VALUES (?, ?, ?, ?, ?)',
      [10.5, 1, '2023-10-01', 'Test Transaction', 'essential'],
    );

    const trans = db.exec('SELECT * FROM transactions');
    console.log(`Transactions: ${trans.length}`);
    if (trans.length === 0) throw new Error('Transaction not saved');

    // Test Net Worth
    db.run('INSERT INTO assets (name, value, type) VALUES (?, ?, ?)', [
      'Cash',
      1000,
      'cash',
    ]);
    const assets = db.exec('SELECT SUM(value) as total FROM assets')[0].total;
    console.log(`Total Assets: ${assets}`);
    if (assets !== 1000) throw new Error('Asset value mismatch');

    console.log('Functional test PASSED ✅');
  } catch (e) {
    console.error('Functional test FAILED ❌:', e);
    process.exit(1);
  }
}

test();
