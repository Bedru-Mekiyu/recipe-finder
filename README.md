# 🍳 Recipe Finder

A modern, responsive web application for discovering recipes from around the world, built with **React 19**, **Vite**, **Tailwind CSS 4**, and **Framer Motion**.

[![CI](https://github.com/Bedru-Mekiyu/recipe-finder/actions/workflows/ci.yml/badge.svg)](https://github.com/Bedru-Mekiyu/recipe-finder/actions/workflows/ci.yml)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Continuous Integration](#-continuous-integration)
- [License](#-license)

---

## 🔍 Overview

**Recipe Finder** allows users to search for culinary recipes in real time using external meal data. The application features search debouncing and request cancellation to minimize unnecessary API calls, smooth modal interactions for detailed recipe views, and custom light/dark theme support with local storage persistence.

---

## ✨ Key Features

- 🔎 **Real-Time Recipe Search** — Search recipes by name or ingredient with automatic debouncing (400ms) and request abort controller management.
- 📱 **Responsive Recipe Cards** — Grid layout designed to present recipe thumbnails and details cleanly across screens of all sizes.
- 📖 **Interactive Recipe Modal** — Detailed popup displaying dynamically parsed ingredients with measurements and step-by-step preparation instructions.
- 🌙 **Dark Mode Toggle** — Seamless switching between light and dark visual themes, persisted across browser sessions via `localStorage`.
- 🎨 **Fluid Animations** — Micro-interactions and transition animations powered by Framer Motion.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Frontend UI Framework |
| **[Vite 7](https://vitejs.dev/)** | Frontend Build Tooling & Local Server |
| **[Tailwind CSS 4](https://tailwindcss.com/)** | Utility-First CSS Styling |
| **[Framer Motion 12](https://www.framer.com/motion/)** | Declarative Animation Library |
| **[ESLint 9](https://eslint.org/)** | Code Quality and Linting |

---

## 📁 Project Structure

```text
recipe-finder/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── RecipeCard.jsx     # Recipe grid item card component
│   │   └── RecipeModal.jsx    # Recipe detailed modal component
│   ├── pages/
│   │   └── RecipeFinder.jsx   # Main page & API search implementation
│   ├── App.jsx                # Root application wrapper
│   ├── index.css              # Global styles & Tailwind CSS imports
│   └── main.jsx               # React DOM entry point
├── eslint.config.js           # ESLint flat configuration
├── index.html                 # HTML template entry
├── package.json               # Dependencies and npm scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind configuration
└── vite.config.js             # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) and npm installed on your machine.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bedru-Mekiyu/recipe-finder.git
   cd recipe-finder
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` — Launches the application in development mode with Hot Module Replacement (HMR).
- `npm run build` — Compiles and optimizes production assets into the `dist` folder.
- `npm run lint` — Runs ESLint to check for code formatting and potential errors.
- `npm run preview` — Serves the production build locally for verification.

---

## 🌐 API Reference

Recipe Finder integrates with the free **[TheMealDB API](https://www.themealdb.com/api.php)**.

- **Endpoint**: `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- **Method**: `GET`
- **Authentication**: None required for test key (`1`).

---

## ⚙️ Continuous Integration

Automated testing and build validation are configured via GitHub Actions in `.github/workflows/ci.yml`. On every push and pull request targeting the `main` branch, the workflow executes:
1. Clean dependency installation (`npm install`)
2. Code linting (`npm run lint`)
3. Production build (`npm run build`)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
