# FITLOG — Workout Library

> **Train hard, log honest.**  
> FitLog is a dark-mode, high-contrast, no-nonsense workout tracking web application designed for gym enthusiasts to discover exercises, build daily workout plans, and track their sets efficiently.

---

## 🛠️ Technologies Used

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **State Management:** React Context API + LocalStorage Sync
- **Data Fetching:** Next.js `fetch` with Revalidation strategy
- **Image Optimization:** `next/image`

---

## ✨ Key Features

- **🏋️ Comprehensive Workout Library:** Browse a curated collection of lifts and exercises covering every major muscle group, complete with duration, calories burned, equipment needed, and rating metrics.
- **📅 Daily Workout Planner:** Add up to 5 exercises to "Today's Plan" with real-time stat aggregations (total exercises, total duration, and total estimated calories burned).
- **🔖 Saved for Later:** Bookmark exercises to your saved list to build future routines or keep track of secondary exercises.
- **⚡ Persistent State & Cap Safeguards:** Automatically syncs your active plan and saved list to `localStorage` with built-in daily limit safeguards (capped at 5 lifts to keep training focused).
- **🔄 Live Sorting & Filtering:** Toggle seamlessly between your active plan and saved list with URL query state support (`?tab=saved`), and sort exercises dynamically by duration, calorie burn, or rating.
- **📱 Responsive & High-Contrast UX:** Engineered with a sleek, dark gym aesthetic (`#0d0e12` with `#ccff00` accents), mobile hamburger navigation, active toast notification feedback, and smooth scrolling interactions.
