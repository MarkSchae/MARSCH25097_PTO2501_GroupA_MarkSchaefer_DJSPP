## Podcast App — DJS-PP
Overview

This is a dynamic podcast web application built with React and Tailwind CSS. It fetches live data from an external API and displays it in a responsive grid layout.

The app demonstrates React component architecture, data management with hooks, and maintainable functional code. Functional programming principles are applied by separating data manipulation logic from rendering, improving clarity, scalability, and pure data practices.

Technologies Used

React (Vite / JSX) — Component-based UI with hooks for state and lifecycle management.
Tailwind CSS — Utility-first styling framework for rapid, responsive design.
JavaScript (ES6+) — Functional data mapping and transformation logic.
External API — Fetches real-time podcast data (https://podcast-api.netlify.app/
).

Core Features

Landing Page

Displays all podcasts in a responsive grid.

Each podcast card includes:

Cover image

Title

Number of seasons

Associated genre names

“Last updated” in a human-readable format

Data Fetching & State Management

Fetches live data using an async API function (fetchData).

Maps and merges genre data with podcast data via apiDataMapping.

Implements loading and error states for user feedback.

Styling & Responsiveness

Built with Tailwind CSS, ensuring:

Clean, consistent typography and spacing

Adaptive layouts across mobile, tablet, and desktop

Utility classes for hover states, shadows, borders, and flex/grid layouts

Code Architecture

RenderComponent.jsx — Parent component handles fetching, error/loading states, data mapping, and passes data as props

RenderDetailedPage.jsx — Child component responsible for displaying show data

RenderSeasons.jsx — Child component responsible for displaying seasons data

Helper Modules — Contain logic for date formatting, API mapping, and utility functions

Design & Workflow

React Hooks for lifecycle management (useState, useEffect)

Functional data transformation separates logic from UI rendering

Centralized error and loading handling in the parent component

Reusable component design ensures each podcast card is dynamic and easily maintainable

Navigation and routing use react-router-dom with dynamic routes (/podcast/:podcastId)

State persistence through useState and navigate state object

All non-UI logic (data formatting, genre lookups, timestamps) is handled in utility modules.

Reusable Component Design

Each card uses props to render dynamic podcast data.

How to Run the Project

Clone the repository

git clone <repository-url>
cd <repository-folder>


Install dependencies

npm install


Run the development server

npm run dev


Open in browser
Visit the local development URL https://marsch-25097-pto-2501-group-a-mark.vercel.app/

Future Improvements

Add genre-based filtering and sorting

Implement detailed podcast modal view

Improve accessibility (ARIA roles, keyboard navigation)

Optimize handling of large datasets

Add user preferences (theme toggle, sorting options)

Auto-refresh every 2 minutes using setInterval in useEffect

Integrate third-party state management

Lazy loading and memoization to optimize searches and renders

Reduce unnecessary re-renders for better performance