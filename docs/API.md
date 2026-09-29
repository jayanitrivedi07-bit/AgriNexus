# AgriNexus — API Contract

Base URL:

```text
/api/v1
```

## Authentication

AgriNexus uses **Firebase Authentication**. Registration, sign-in, password reset, and client session management are handled by Firebase Auth on the frontend.

The frontend sends the Firebase ID token with protected API requests:

```http
Authorization: Bearer <firebase-id-token>
```

The Express backend verifies the token with the Firebase Admin SDK before accessing protected resources.

### POST /auth/session

Optional endpoint used to validate the Firebase token and synchronize the user's profile document in `users/{uid}`.

Requires:

```http
Authorization: Bearer <firebase-id-token>
```

### GET /auth/me

Requires authentication.

Response should return the authenticated Firebase user identity and the corresponding Firestore profile:

```json
{
  "success": true,
  "data": {
    "uid": "firebase_uid",
    "email": "user@example.com",
    "name": "Aditya",
    "role": "farmer",
    "countryCode": "IN",
    "language": "en"
  }
}
```

### Authentication rules

Do **not** implement custom `/auth/register` or `/auth/login` password handling in Express.

Do **not** store passwords in Firestore.

Use Firebase Auth on the client for:
- email/password sign-up;
- email/password sign-in;
- sign-out;
- password reset;
- optional Google or other configured providers.

The backend uses the verified token `uid` as the authenticated identity.

## Farms

### POST /farms

Requires authentication. `ownerId` is derived from the Firebase token and must not be accepted from the client.

```json
{
  "name": "Farm 1",
  "countryCode": "IN",
  "regionCode": "MH",
  "location": {
    "latitude": 20.0,
    "longitude": 73.78
  },
  "area": 2.5,
  "areaUnit": "acre",
  "soilType": "loamy",
  "irrigationType": "rainfed",
  "currentCropId": "soybean",
  "growthStage": "vegetative"
}
```

### GET /farms/:farmId/twin

Returns:
- farm metadata
- latest soil
- current weather
- vegetation
- risks
- recent changes
- latest advisory

Authorization must verify ownership or authorized role.

## Weather

### GET /farms/:farmId/weather

Query:

```text
?days=7
```

Provider-specific responses must be normalized before returning.

## Vegetation

### GET /farms/:farmId/vegetation

Query:

```text
?from=2026-09-01&to=2026-09-29
```

## Crop Recommendation

### POST /crops/recommend

```json
{
  "farmId": "farm_123",
  "candidateCropIds": [
    "soybean",
    "millet",
    "maize"
  ]
}
```

Response must include:
- suitability score
- reasons
- risks
- engine version
- input snapshot

## Advisory

### POST /farms/:farmId/advisories/generate

The backend builds the context from authorized Firestore data.

Do not allow the client to send arbitrary system prompts.

## Disease

### POST /disease/analyze

Multipart form:

```text
image=<file>
farmId=<optional>
crop=<required>
```

If Firebase Storage is used for image persistence, store the resulting Storage reference in Firestore.

Response:

```json
{
  "success": true,
  "data": {
    "potentialCondition": "possible leaf disease",
    "confidence": 0.91,
    "limitations": [
      "Image-based assessment is not a guaranteed diagnosis."
    ]
  }
}
```

## Scenario

### POST /scenarios/compare

```json
{
  "farmId": "farm_123",
  "scenarios": [
    {"cropId": "soybean"},
    {"cropId": "millet"}
  ]
}
```

## Cooperation

### GET /cooperation/schema

Returns current AgriXchange schema version.

### GET /cooperation/countries

Returns participating/demo datasets and their data status.

### GET /cooperation/signals

Query:

```text
?countryCode=IN&regionCode=MH
```

### POST /cooperation/import

Accepts validated standardized exchange payload.

## Error Codes

```text
AUTH_REQUIRED
INVALID_FIREBASE_TOKEN
FORBIDDEN
VALIDATION_ERROR
RESOURCE_NOT_FOUND
EXTERNAL_PROVIDER_ERROR
AI_PROVIDER_ERROR
IMAGE_INVALID
RATE_LIMITED
INTERNAL_ERROR
```
