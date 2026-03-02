import initSqlJs, { type Database } from 'sql.js';
import { DEFAULT_CATEGORIES, SCHEMA } from './schema';

// Mock for NativeModules if not available
const NativeModules = (globalThis as any).NativeModules || {
  NativeLocalStorageModule: {
    setStorageItem: (key: string, _value: string) => {
      console.log(`Mock storage set: ${key}`);
    },
    getStorageItem: (_key: string, callback: (val: string) => void) => {
      callback('');
    },
  },
};

const DB_STORAGE_KEY = 'budget_db_base64';

export class AppDatabase {
  private db: Database | null = null;
  private static instance: AppDatabase;

  private constructor() {}

  static async getInstance(): Promise<AppDatabase> {
    if (!AppDatabase.instance) {
      AppDatabase.instance = new AppDatabase();
      await AppDatabase.instance.init();
    }
    return AppDatabase.instance;
  }

  private async init() {
    const SQL = await initSqlJs();

    return new Promise<void>((resolve) => {
      NativeModules.NativeLocalStorageModule.getStorageItem(
        DB_STORAGE_KEY,
        (savedBase64: string) => {
          if (savedBase64) {
            const binary = Buffer.from(savedBase64, 'base64');
            this.db = new SQL.Database(new Uint8Array(binary));
          } else {
            this.db = new SQL.Database();
            this.setupNewDb();
          }
          resolve();
        },
      );
    });
  }

  private setupNewDb() {
    if (!this.db) return;
    this.db.run(SCHEMA);

    // Seed categories
    const stmt = this.db.prepare(
      'INSERT INTO categories (name, color, icon, type, monthly_limit) VALUES (?, ?, ?, ?, ?)',
    );
    for (const cat of DEFAULT_CATEGORIES) {
      stmt.run([cat.name, cat.color, cat.icon, cat.type, cat.monthly_limit]);
    }
    stmt.free();
    this.persist();
  }

  persist() {
    if (!this.db) return;
    const binary = this.db.export();
    const base64 = Buffer.from(binary).toString('base64');
    NativeModules.NativeLocalStorageModule.setStorageItem(
      DB_STORAGE_KEY,
      base64,
    );
  }

  run(sql: string, params?: any[]) {
    if (!this.db) return;
    this.db.run(sql, params);
    this.persist();
  }

  exec(sql: string, params?: any[]): any[] {
    if (!this.db) return [];
    const results = this.db.exec(sql, params);
    if (results.length === 0) return [];

    const columns = results[0].columns;
    return results[0].values.map((row) => {
      const obj: any = {};
      columns.forEach((col, i) => {
        obj[col] = row[i];
      });
      return obj;
    });
  }
}
