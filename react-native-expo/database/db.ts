import * as SQLite from 'expo-sqlite';
import { DEFAULT_CATEGORIES, SCHEMA } from './schema';

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version',
  );
  let currentDbVersion = result?.user_version ?? 0;

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(SCHEMA);

    for (const cat of DEFAULT_CATEGORIES) {
      await db.runAsync(
        'INSERT INTO categories (name, color, icon, type, monthly_limit) VALUES (?, ?, ?, ?, ?)',
        [cat.name, cat.color, cat.icon, cat.type, cat.monthly_limit]
      );
    }

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}

export function useDatabase() {
  return SQLite.useSQLiteContext();
}
