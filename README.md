# 🐾 Missing Podo: The Ankara Case (Jotform Frontend Challenge)

Welcome to my solution for the **"Missing Podo: The Ankara Case"** frontend challenge. This project is a React-based investigation dashboard built to aggregate, link, and analyze multi-source intelligence data to track down Podo.

## 🚀 Project Overview

The objective of this dashboard is to provide a clean, data-driven, and highly linked interface for investigators. It fetches live data from five separate Jotform submissions (Check-ins, Messages, Sightings, Notes, and Tips) and synthesizes them into a single timeline of events. 

### Key Features Implemented:
- **Unified Data Aggregation:** Fetches data from 5 different API endpoints concurrently using `Promise.all` and merges them chronologically.
- **Record Linking (Relational Data):** Automatically links separate records based on the "Person" field. Investigators can click on any suspect's name to view their complete interaction history.
- **Dynamic Investigation UI:** - **Dashboard:** A unified timeline of all events.
  - **Suspect Profile:** Filtered view for specific individuals.
  - **Raw Detail View:** Deep dive into the precise Jotform submission data, filtering out unnecessary system fields (like empty Submit buttons) for better readability.
- **Summary Intelligence Panel:** A dynamic analytics panel that instantly calculates the "Most Suspicious" person (excluding the victim, Podo), total clues found, and the last known location.
- **Map View Integration (Bonus):** Automatically extracts geographic coordinates from raw data and renders a live, interactive map for precise location tracking.
- **Clean Architecture:** Refactored the monolithic application into modular React components (`Record`, `RecordDetail`, `SummaryPanel`, `Person`) and implemented modular CSS for maintainability.

## 🛠️ Tech Stack & Architecture

- **Framework:** React.js (via Vite)
- **Styling:** Modular CSS (Separation of Concerns)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Data Fetching:** Native `fetch` API handling asynchronous requests.
- **Mapping:** Embedded dynamic Google Maps `<iframe>` based on dynamic coordinate extraction.

## ⚙️ How to Run the Project Locally

Follow these steps to run the investigation dashboard on your local machine:

1. Clone the repository:
```bash
git clone https://github.com/mahirkocak1/2026-frontend-challenge-ankara.git

**2. Navigate to the project directory:** 
Bash
cd 2026-frontend-challenge-ankara/2026-frontend-challange-ankara-mahir-kocak
3. Install dependencies and start the server:

Bash
npm install
npm run dev 
4. Open the application:
Open your browser and navigate to http://localhost:5173 (or the port specified in your terminal).


👨‍💻 Developer Notes
This challenge was completed within the 3-hour time constraint. The primary focus was on ensuring robust data fetching, seamless state transitions, and a clean, maintainable component structure.
Thank you for reviewing my submission. I look forward to discussing the architecture and the case further! 🕵️‍♂️