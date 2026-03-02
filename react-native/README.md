# React Native standalone app (Expo)

This folder is now a **standalone React Native application** that mirrors the root Lynx app structure and features.

## What is mirrored from root

- `src/screens/*` same screen set (Dashboard, Budget, Goals, Reports, Settings, Transactions, QuickAdd, Monthly/Annual reports, What-If, Net Worth, Recurring Expenses, Savings Tracker)
- `src/components/*` shared UI components and chart placeholders
- `src/navigation/*` bottom tab navigator
- `src/hooks/*` data hooks
- `src/database/*` same schema + category seeding + SQL-based DB wrapper
- `src/utils/*` formatter/export helpers
- `src/styles/*` same token model

## Run as standalone app (Bun)

```bash
cd react-native
bun install
bun run dev
```

You can also run the existing Expo scripts with Bun:

```bash
bun run android
bun run ios
bun run web
```

Then open with Expo Go (or run Android/iOS targets).

## Notes

- The folder has its own `package.json`, `app.json`, `babel.config.js`, `tsconfig.json`, and entrypoints (`index.js`, `App.tsx`).
- Database layer is included under `src/database` and keeps the same schema contract used by the Lynx app.
