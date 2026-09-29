# AgriNexus — Firebase Setup

## Required Firebase Services

Enable:
- Firebase Authentication
- Cloud Firestore
- Firebase Admin SDK
- Firebase Storage only if crop/disease images need persistent storage

## 1. Firebase Authentication

In Firebase Console:

1. Create/select the AgriNexus Firebase project.
2. Open **Authentication → Sign-in method**.
3. Enable the providers required by the UI, such as:
   - Email/Password
   - Google (optional)
4. Configure authorized domains for local and production frontend URLs.

Authentication is handled by the Firebase Web SDK in Next.js.

## 2. Firestore

Create a production Firestore database in the required region.

The application data model is defined in `DATABASE.md`.

Primary collections include:

```text
users
farms
cropProfiles
diseaseAnalyses
cooperationSignals
dataSources
```

Farm-scoped subcollections include:

```text
farms/{farmId}/fieldZones
farms/{farmId}/soilRecords
farms/{farmId}/weatherRecords
farms/{farmId}/satelliteObservations
farms/{farmId}/riskEvents
farms/{farmId}/advisories
farms/{farmId}/scenarioComparisons
```

## 3. Frontend Firebase Configuration

For Next.js, configure the Firebase Web SDK with environment variables similar to:

```text
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

These values configure the client SDK. They are **not** server-admin credentials.

Never put Firebase Admin private keys in `NEXT_PUBLIC_*` variables.

## 4. Backend Firebase Admin Configuration

The Express backend must initialize Firebase Admin SDK using deployment secrets.

Recommended environment values:

```text
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

When storing `FIREBASE_PRIVATE_KEY` as an environment variable, preserve the PEM content correctly. If the deployment platform stores escaped newlines, the application may need to convert `\n` to actual newlines before initializing the credential.

Alternative: use the deployment platform's native service-account/secret integration if available.

Never commit:
- service-account JSON;
- private keys;
- `.env` files containing secrets.

## 5. Authentication Flow

```text
┌───────────────────┐
│      Next.js      │
│  Firebase Web SDK │
└─────────┬─────────┘
          │ signIn / signUp
          ▼
┌────────────────────────┐
│ Firebase Authentication│
└─────────┬──────────────┘
          │ Firebase ID Token
          ▼
┌────────────────────────┐
│      Express API       │
│ Firebase Admin SDK     │
│ verifyIdToken()        │
└─────────┬──────────────┘
          │ verified uid
          ▼
┌────────────────────────┐
│       Firestore        │
│ application data       │
└────────────────────────┘
```

The client must send:

```http
Authorization: Bearer <firebase-id-token>
```

The backend derives the authenticated user from the verified token.

## 6. User Profile Creation

Firebase Authentication stores identity data. AgriNexus stores application-specific profile data in:

```text
users/{firebaseUid}
```

On first authenticated session:
1. Verify Firebase ID token.
2. Read `users/{uid}`.
3. Create the profile if it does not exist.
4. Never overwrite trusted server-managed role fields from arbitrary client input.

## 7. Firestore Rules

The recommended MVP architecture sends application reads/writes through Express + Firebase Admin SDK.

In this mode, Firestore client rules should not be used as a substitute for backend authorization.

If direct browser access to Firestore is introduced later:
- write explicit `firestore.rules`;
- require `request.auth`;
- validate ownership using `request.auth.uid`;
- restrict writable fields;
- deny unspecified operations.

## 8. Local Development

Use Firebase Emulator Suite where practical for:
- Authentication;
- Firestore;
- Storage, if used.

Keep development and production Firebase projects/data separated when possible.

## 9. Verification Checklist

Before connecting the frontend:

- [ ] Firebase Auth sign-up works.
- [ ] Firebase Auth sign-in works.
- [ ] Firebase ID token is available after sign-in.
- [ ] Express rejects missing/invalid tokens.
- [ ] Express accepts valid Firebase ID tokens.
- [ ] `users/{uid}` is created/synchronized.
- [ ] Farm ownership uses the verified `uid`.
- [ ] Firestore reads/writes work through Firebase Admin SDK.
- [ ] No passwords are stored in Firestore.
- [ ] No Firebase Admin secrets are exposed to the browser.
- [ ] Production CORS contains only the real frontend origin.
