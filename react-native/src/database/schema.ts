export const SCHEMA = `
CREATE TABLE IF NOT EXISTS income (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  source TEXT,
  date TEXT NOT NULL,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  monthly_limit REAL,
  type TEXT CHECK(type IN ('strict','flexible')) DEFAULT 'flexible',
  color TEXT,
  icon TEXT,
  is_recurring INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount REAL NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  date TEXT NOT NULL,
  notes TEXT,
  tag TEXT CHECK(tag IN ('essential','treat','regret')),
  is_recurring INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recurring_expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  day_of_month INTEGER,
  start_date TEXT,
  end_date TEXT,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS monthly_summary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  total_income REAL,
  total_expenses REAL,
  total_saved REAL,
  budget_status TEXT CHECK(budget_status IN ('under','over')),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS savings_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  amount_saved REAL,
  target_amount REAL,
  goal_reached INTEGER DEFAULT 0,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS goals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  target_amount REAL NOT NULL,
  current_amount REAL DEFAULT 0,
  deadline TEXT,
  status TEXT CHECK(status IN ('active','completed','paused')) DEFAULT 'active',
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS goal_contributions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  goal_id INTEGER REFERENCES goals(id),
  amount REAL NOT NULL,
  month INTEGER,
  year INTEGER,
  date TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS net_worth_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  total_assets REAL,
  total_liabilities REAL,
  net_worth REAL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  value REAL,
  type TEXT CHECK(type IN ('cash','investment','property')),
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS liabilities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount_owed REAL,
  type TEXT CHECK(type IN ('loan','credit','mortgage')),
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`;

export const DEFAULT_CATEGORIES = [
  {
    name: 'Food',
    color: '#FF5722',
    icon: 'restaurant',
    type: 'flexible',
    monthly_limit: 500,
  },
  {
    name: 'Transport',
    color: '#2196F3',
    icon: 'directions_car',
    type: 'flexible',
    monthly_limit: 200,
  },
  {
    name: 'Housing',
    color: '#4CAF50',
    icon: 'home',
    type: 'strict',
    monthly_limit: 1500,
  },
  {
    name: 'Entertainment',
    color: '#9C27B0',
    icon: 'movie',
    type: 'flexible',
    monthly_limit: 100,
  },
  {
    name: 'Health',
    color: '#E91E63',
    icon: 'monitor_heart',
    type: 'strict',
    monthly_limit: 100,
  },
  {
    name: 'Shopping',
    color: '#FFC107',
    icon: 'shopping_bag',
    type: 'flexible',
    monthly_limit: 200,
  },
  {
    name: 'Savings',
    color: '#1B5E20',
    icon: 'savings',
    type: 'strict',
    monthly_limit: 1000,
  },
];
