# Discipline

A fitness app I'm building in my spare time to learn React Native. The goal is one place to track nutrition, workouts and progress. It runs on iOS, Android and the web from a single TypeScript codebase.

> **Status: work in progress.** Accounts, profiles and food search work. The Workouts and Progress tabs are placeholders for what comes next.

## Features

**Working now**
- **Sign up and log in** with email and password through Firebase Authentication. Forms are validated with Formik and Yup.
- **User profile** stored in Cloud Firestore. You can edit your name and date of birth, and sign out.
- **Food search** using the USDA [FoodData Central API](https://fdc.nal.usda.gov/api-guide.html), covering branded foods and the USDA survey database.
- **Nutrition details** for each food: the nutrition-label values, each with its own icon.

**Planned**
- Workout logging
- Progress tracking over time

## Tech stack

| | |
|---|---|
| App | React Native 0.74, Expo SDK 51, TypeScript |
| Navigation | Expo Router and React Navigation (stack + bottom tabs) |
| Backend | Firebase Authentication, Cloud Firestore |
| Data | USDA FoodData Central API, called with Axios |
| UI | React Native Paper, styled-components, Font Awesome |
| Forms | Formik and Yup |

## Running it locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create the two config files that are git-ignored so keys stay out of the repo. Both go in the project root.

   `firebaseConfig.ts` initializes your Firebase project and exports `auth` and `db`:
   ```ts
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";

   const app = initializeApp({ /* your Firebase web app config */ });
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

   `appConfig.ts` holds the USDA API settings ([free API key](https://fdc.nal.usda.gov/api-key-signup.html)):
   ```ts
   export const BASE_URL = "https://api.nal.usda.gov/fdc/v1/";
   export const USDA_FOOD_DATA_API_KEY = "your-key";
   ```
3. Start Expo:
   ```bash
   npm start          # then press i (iOS), a (Android) or w (web)
   ```

## Project structure

```
app/
  _layout.tsx           root layout and auth state
  screens/
    Login/, Signup/     authentication
    Profile/            view and edit profile (Firestore)
    Tabs/               Home, Nutrition, Workouts, Progress
    FoodInfo/           nutrient detail view for a food
  types.ts              shared types (USDA response shapes, navigation)
components/             reusable form inputs and cards
```
