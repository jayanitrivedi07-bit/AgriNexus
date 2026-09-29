# AgriNexus — System Architecture

## 1. Architecture Decision

Use a **modular monolith** for the hackathon.

Do not start with microservices.

Reason:
- faster development;
- one deployment unit;
- simpler debugging;
- shared domain models;
- easier local development;
- can later extract heavy workloads.

## 2. High-Level Architecture

```text
                    ┌─────────────────────┐
                    │     Web / Mobile    │
                    │ Next.js + TypeScript│
                    └──────────┬──────────┘
                               │ HTTPS
                               ├──────────────► Firebase Authentication
                               │                (sign-in / sign-up)
                               ▼
                    ┌─────────────────────────────┐
                    │       Express API         │
                    │ Validation • Authorization│
                    │ Rate limiting • Services  │
                    └────────────┬────────────────┘
                                 │ Firebase Admin SDK
                                 ▼
                    ┌─────────────────────────────┐
                    │         Firestore            │
                    │  users / farms / observations│
                    │  risks / advisories / etc.  │
                    └─────────────────────────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       ▼                       ▼                        ▼
 Farm Intelligence       Decision Engine          Cooperation
       │                       │                        │
 ┌─────┼─────┐          ┌──────┼──────┐          ┌──────┴──────┐
 ▼     ▼     ▼          ▼      ▼      ▼          ▼             ▼
Soil Weather Satellite Risk   Crop   Advisory   Schema       Signals
                              │       │
                              ▼       ▼
                           AI/LLM  Vision


```

## 3. Firebase Architecture

Authentication is handled by **Firebase Authentication**. The frontend signs users in and obtains a Firebase ID token.

For protected API calls:

```text
Next.js
  ↓ Authorization: Bearer <Firebase ID token>
Express API
  ↓ Firebase Admin SDK
verifyIdToken()
  ↓
Firestore
```

The backend must never trust a `userId` supplied by the client. Use the verified Firebase token `uid` as the authenticated identity.

Firestore is the primary application database. Use the Firebase Admin SDK from the backend for privileged server-side reads/writes.

## 4. Backend Modules

```text
auth
users
farms
fieldZones
soil
weather
satellite
crops
risks
advisory
disease
scenarios
cooperation
notifications
dataSources
```

## 5. Layering

Each module follows:

```text
route
  ↓
controller
  ↓
service
  ↓
repository/model
  ↓
database
```

External integrations use:

```text
controller
  ↓
domain service
  ↓
provider adapter
  ↓
external API
```

## 6. Provider Abstraction

Interfaces:

```ts
interface WeatherProvider {
  getForecast(input: WeatherQuery): Promise<NormalizedWeather>;
}

interface SatelliteProvider {
  getVegetationObservations(
    input: SatelliteQuery
  ): Promise<NormalizedVegetation[]>;
}

interface AIProvider {
  generateAdvisory(
    context: AdvisoryContext
  ): Promise<StructuredAdvisory>;
}

interface VisionProvider {
  analyzeCropImage(
    input: DiseaseImageInput
  ): Promise<DiseaseAssessment>;
}
```

Do not import provider-specific SDKs into controllers.

## 7. Data Flow

```text
External API
  ↓
Provider Adapter
  ↓
Normalizer
  ↓
Validation
  ↓
Persistence
  ↓
Feature Engine
  ↓
Risk/Recommendation Engine
  ↓
AI Explanation
  ↓
Frontend
```

## 8. Digital Farm Twin

The twin is a **derived view**, not one giant mutable document.

It should be assembled from:
- farm metadata;
- latest soil;
- latest weather;
- latest satellite observation;
- latest risks;
- recent events;
- latest advisory.

Cache the result if necessary.

## 9. Heavy Processing

Future extraction candidates:
- satellite processing;
- image inference;
- large model inference;
- batch regional aggregation.

For MVP, keep them behind service interfaces.
