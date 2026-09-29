# AgriNexus

AgriNexus is an interoperable agricultural intelligence platform designed around the BRICS Cooperation theme.

## Core Concept

```text
Weather
Soil
Satellite
Crop
Farm History
Agricultural Knowledge
        ↓
  Intelligence Engine
        ↓
Risk + Recommendation
        ↓
AI Explanation
        ↓
Actionable Advisory
```

## Technology

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript

### Authentication
- Firebase Authentication

### Database
- Firebase Firestore
- Firebase Admin SDK for server-side access

### AI
- Provider-agnostic LLM
- Provider-agnostic vision model
- Retrieval layer

### Deployment
- Docker
- Cloud Run / Render
- Firebase project
- Firestore
- Optional Firebase Storage for uploaded crop images

## Repository

```text
AgriNexus/
├── frontend/
├── backend/
├── docs/
│   ├── PRD.md
│   ├── SRS.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATABASE.md
│   ├── AI.md
│   ├── DATA_SOURCES.md
│   ├── SECURITY.md
│   ├── AGENTS.md
│   └── IMPLEMENTATION_PLAN.md
└── README.md
```

## Important

Never represent simulated agricultural data as live data.

Never claim that a disease model is a guaranteed diagnostic system.

Never claim live cross-country government integration unless it actually exists.

## Development

1. Read `AGENTS.md`.
2. Read `ARCHITECTURE.md`.
3. Read `SRS.md`.
4. Read `DATA_SOURCES.md`.
5. Follow `IMPLEMENTATION_PLAN.md`.
6. Keep APIs and database models synchronized.


## Firebase Setup

Required services:
1. Firebase Authentication
2. Cloud Firestore
3. Firebase Admin SDK
4. Firebase Storage only if image persistence is enabled

### Frontend

Configure the Firebase Web SDK using environment variables appropriate for Next.js, for example:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

Do not place server credentials in `NEXT_PUBLIC_*` variables.

### Backend

The Express backend uses Firebase Admin SDK. Configure the project ID and privileged credentials through deployment secrets/environment variables. Never commit a service-account JSON file.

### Authentication flow

```text
User
 ↓
Next.js Firebase Auth
 ↓
Firebase ID Token
 ↓
Express Authorization: Bearer <token>
 ↓
Firebase Admin verifyIdToken()
 ↓
Firestore
```

For local development, use Firebase Emulator Suite where practical.
