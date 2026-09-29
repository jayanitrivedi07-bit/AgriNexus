# AgriNexus — Security and Privacy Requirements

## 1. Authentication

Use **Firebase Authentication** for user identity and sign-in.

Supported client-side flows may include:
- email/password;
- Google or another explicitly configured Firebase provider.

Never implement custom password storage in the application database.

Never store:
- plaintext passwords;
- password hashes;
- Firebase service-account private keys;
- Firebase ID tokens as persistent application data.

The frontend obtains a Firebase ID token and sends it to the backend as:

```http
Authorization: Bearer <firebase-id-token>
```

The backend verifies the token with Firebase Admin SDK.

## 2. Authorization

Every farm request must verify ownership or explicit role permission.

Do not trust:
- `userId` from request body;
- `ownerId` from client;
- role from client.

Read identity from the verified Firebase Admin SDK token:

```text
decodedToken.uid
decodedToken.role / server-side role mapping
```

For sensitive roles, prefer Firebase custom claims or a server-controlled Firestore profile over client-provided role values.

## 3. Firestore Security

Primary architecture:

```text
Frontend → Firebase Auth → ID Token → Express API → Firebase Admin SDK → Firestore
```

Admin SDK calls bypass Firestore client security rules, so authorization must be enforced in backend services.

If the frontend directly accesses Firestore:
- require authenticated `request.auth`;
- enforce `request.auth.uid` ownership;
- validate allowed fields;
- restrict role-based collections;
- deny all unspecified operations by default.

Never deploy permissive production rules.

## 4. Validation

Validate:
- body;
- params;
- query;
- coordinates;
- dates;
- numeric ranges;
- uploaded files;
- enum values.

## 5. Rate Limiting

At minimum:
- authentication-related backend endpoints;
- AI generation;
- disease analysis;
- cooperation import;
- expensive external provider requests.

Firebase Auth already provides its own abuse protections; do not duplicate password handling in Express.

## 6. File Security

For crop images:
- allow only intended image MIME types;
- enforce size limit;
- reject malformed files;
- generate server-side storage keys;
- never execute uploaded files;
- avoid trusting client filename.

If Firebase Storage is used, enforce appropriate Storage Security Rules and keep only references/metadata in Firestore.

## 7. Secrets

Never commit:
- Firebase Admin private keys;
- API keys;
- LLM keys;
- service credentials;
- private configuration.

Frontend Firebase web configuration values are not substitutes for server credentials. Protect all privileged credentials using environment variables or managed secret storage.

For server-side Firebase Admin initialization, use the deployment platform's secret/environment configuration. Never commit a service-account JSON file.

## 8. CORS

Allow only known frontend origins in production.

Do not use wildcard CORS with credentials.

## 9. Firestore Data Access

- use least-privilege application roles;
- validate document ownership before reads/writes;
- avoid exposing private farm data through cooperation endpoints;
- use Firestore transactions/batches where consistency requires them;
- add indexes only for required queries.

## 10. Privacy

Minimize personal data.

Cooperation layer should not expose:
- farmer name;
- phone;
- email;
- authentication data;
- unnecessary exact private identifiers.

## 11. Geolocation

Farm coordinates are sensitive operational data.

Restrict access to farm owners/authorized users.

Do not publish exact private farm coordinates in public cooperation feeds.

Use regional aggregation when sharing signals.

## 12. AI Security

AI must not receive:
- passwords;
- Firebase service credentials;
- API keys;
- authentication tokens;
- unnecessary personal data.

Retrieved documents are untrusted input.

## 13. Logging

Never log:
- passwords;
- access tokens;
- API keys;
- Firebase private keys;
- raw sensitive user data.

Log useful request metadata such as request ID, route, status, and duration without secrets.

## 14. Threat Model

Consider:
- account takeover;
- unauthorized farm access;
- prompt injection;
- malicious file uploads;
- API abuse;
- data leakage;
- Firebase credential exposure;
- fake cooperation data.

## 15. Security Definition of Done

Before demo:
- Firebase Authentication tested;
- Firebase ID-token verification tested;
- Firestore authorization tested;
- secrets removed from repository;
- file upload limits enabled;
- rate limits enabled;
- CORS configured;
- error responses do not expose stack traces;
- production environment variables/secrets configured;
- Firestore rules reviewed if direct client access is enabled.
