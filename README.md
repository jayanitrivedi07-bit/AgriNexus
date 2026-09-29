# AgriNexus

**Cooperative Agricultural Intelligence Network**

AgriNexus is a comprehensive, end-to-end digital agriculture platform designed to provide actionable intelligence for farmers. It combines hyper-local climate data, satellite imagery, soil intelligence, and generative AI to create a **Digital Farm Twin** for optimized decision-making and sustainable agriculture.

## 🌟 Key Features

*   **Digital Farm Twin:** Centralized dashboard reflecting the real-time state of the farm.
*   **AI Advisory:** Context-aware, generative AI recommendations (powered by Gemini) utilizing live weather, soil, and crop data.
*   **Disease Intelligence:** Multi-signal disease detection via crop imagery upload, enriched by environmental factors.
*   **Climate Intelligence:** 7-day hyper-local forecasts integrated directly from Open-Meteo and Copernicus data.
*   **BRICS Cooperative Network:** A decentralized data model respecting regional data sovereignty and cooperative analytics.
*   **Modular Architecture:** A scalable Express.js backend and a fast, responsive Next.js frontend with Tailwind CSS v4.

## 🏗️ Architecture

The project is built as a Modular Monolith, split into two primary applications:

### 1. Frontend (Next.js 16 + React 19)
*   **Framework:** Next.js with App Router
*   **Styling:** Tailwind CSS v4 (Glassmorphism, dynamic gradients, rich aesthetics)
*   **Icons:** Lucide React
*   **Authentication:** Firebase Auth
*   **Directory:** `/frontend`

### 2. Backend (Express.js + TypeScript)
*   **Framework:** Express.js
*   **Database:** Firebase Admin SDK (Firestore)
*   **AI Engine:** Google Gen AI SDK (Gemini 2.5 Pro)
*   **Validation:** Zod for environment and request validation
*   **Directory:** `/backend`

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Firebase Project
*   A Google Gemini API Key

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Copy `.env.example` to `.env` and fill in your Firebase Admin credentials and Gemini API Key.
    ```bash
    cp .env.example .env
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The backend will run on `http://localhost:5000`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env.local` file with your Firebase Client configuration:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:3000`.

## 📚 Documentation
Detailed specifications and architecture decisions can be found in the `/docs` directory:
*   `PRD.md`: Product Requirements Document
*   `ARCHITECTURE.md`: High-level system design
*   `DATABASE.md`: Firestore schema design
*   `design.md`: Visual and UI/UX guidelines
*   `SECURITY.md`: Authentication and data protection rules
*   `AI.md`: Prompts and AI integration logic

## 📄 License
This project is licensed under the MIT License.
