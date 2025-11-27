# app-react-products

This repository contains a React application for managing products.

If you see this README it was created and pushed from the local workspace by an automated helper.

## What I pushed
- `README.md` — this file
- `.gitignore` — standard Node/React ignores

## Next steps
- Add your project files, then run `git add .` and `git commit -m "Add project files"`.

## Run locally

Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

Note: this scaffold uses Vite + React. If you prefer Create React App, say so and I can switch scaffolding.

## React Query

This app now uses `@tanstack/react-query` to fetch and cache remote data (products). After pulling the latest files, run:

```powershell
npm install
```

If you are using a remote API, set `VITE_PRODUCTS_API` in `.env` or your local environment to point to the endpoint returning product records.
