# React Native version

This folder contains a React Native implementation of the current Lynx budgeting app with the same core information architecture:

- Bottom tabs: Home, Budget, Goals, Reports, Settings
- Report sub-tabs: Monthly, Annual, Savings, What-If
- Reusable card/stat-card patterns and visual style aligned to the Lynx app

## Quick start (Expo)

1. Create a new Expo app and copy `App.tsx` from this folder into the project root.
2. Run:

```bash
npm install
npm run start
```

> Note: this first pass keeps the UI/flow in sync and uses local mock data. You can wire it to your database layer (SQLite/Realm/API) next.
