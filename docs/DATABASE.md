# AgriNexus — Database Design

**Database:** Firebase Firestore  
**Authentication:** Firebase Authentication  
**Server SDK:** Firebase Admin SDK

Firestore is the primary application database. Firebase Authentication owns credentials and identity. **Do not store passwords or password hashes in Firestore.**

## Firebase Data Model

Use top-level collections for independently queried resources and subcollections where ownership/lifecycle is naturally scoped.

```text
users/{uid}
farms/{farmId}
farms/{farmId}/fieldZones/{zoneId}
farms/{farmId}/soilRecords/{recordId}
farms/{farmId}/weatherRecords/{recordId}
farms/{farmId}/satelliteObservations/{observationId}
cropProfiles/{cropId}
farms/{farmId}/riskEvents/{riskId}
farms/{farmId}/advisories/{advisoryId}
diseaseAnalyses/{analysisId}
farms/{farmId}/scenarioComparisons/{scenarioId}
cooperationSignals/{signalId}
users/{uid}/notifications/{notificationId}
dataSources/{sourceId}
```

## 1. users/{uid}

The document ID must equal the Firebase Authentication `uid`.

```json
{
  "name": "string",
  "email": "user@example.com",
  "role": "farmer|advisor|admin",
  "countryCode": "IN",
  "language": "en",
  "createdAt": "Firestore Timestamp",
  "updatedAt": "Firestore Timestamp"
}
```

Rules:
- Never store `password` or `passwordHash`.
- `email` should normally mirror the Firebase Auth user.
- The server derives identity from the verified Firebase ID token.
- Role changes must be performed by authorized server/admin workflows.

## 2. farms/{farmId}

```json
{
  "ownerId": "firebase_uid",
  "name": "Main Farm",
  "countryCode": "IN",
  "regionCode": "MH",
  "location": {
    "type": "Point",
    "coordinates": [73.78, 20.00]
  },
  "area": 2.5,
  "areaUnit": "acre",
  "soilType": "loamy",
  "irrigationType": "rainfed",
  "currentCropId": "soybean",
  "growthStage": "vegetative",
  "sowingDate": "2026-06-20",
  "createdAt": "Firestore Timestamp",
  "updatedAt": "Firestore Timestamp"
}
```

Recommended indexes:
- `ownerId + createdAt`
- `countryCode + regionCode`
- queries combining farm ownership/status fields as required by the UI.

Authorization rule:
- a user may access a farm only when their verified `uid` matches `ownerId`, or their server-side role grants access.

## 3. farms/{farmId}/fieldZones/{zoneId}

Fields:
- `name`
- `geometry`
- `status`
- `latestVegetation`
- `latestRisk`
- `createdAt`
- `updatedAt`

## 4. farms/{farmId}/soilRecords/{recordId}

Fields:
- `ph`
- `nitrogen`
- `phosphorus`
- `potassium`
- `organicCarbon`
- `moisture`
- `soilType`
- `depth`
- `source`
- `dataStatus`
- `measuredAt`
- `createdAt`

## 5. farms/{farmId}/weatherRecords/{recordId}

Fields:
- `provider`
- `location`
- `forecastDate`
- `temperature`
- `humidity`
- `precipitationMm`
- `precipitationProbability`
- `evapotranspiration`
- `soilMoisture`
- `dataStatus`
- `retrievedAt`

Use a deterministic document ID or deduplication key where repeated provider fetches could otherwise create duplicate records.

## 6. farms/{farmId}/satelliteObservations/{observationId}

Fields:
- `zoneId`
- `provider`
- `satellite`
- `observationDate`
- `ndvi`
- `cloudCoverage`
- `quality`
- `sourceProductId`
- `dataStatus`

Recommended composite indexes:
- `observationDate + zoneId`
- `observationDate + dataStatus`

## 7. cropProfiles/{cropId}

Fields:
- `cropCode`
- `cropName`
- `seasons`
- `soilPHRange`
- `waterRequirement`
- `temperatureRange`
- `growthDurationDays`
- `soilPreferences`
- `climateRisks`
- `sustainabilityFactors`
- `source`
- `version`

## 8. farms/{farmId}/riskEvents/{riskId}

Fields:
- `zoneId`
- `type`
- `severity`
- `score`
- `factors`
- `engineVersion`
- `calculatedAt`
- `status`

## 9. farms/{farmId}/advisories/{advisoryId}

Fields:
- `title`
- `priority`
- `recommendation`
- `evidence`
- `risks`
- `confidence`
- `generatedBy`
- `sourceSnapshot`
- `createdAt`

## 10. diseaseAnalyses/{analysisId}

Fields:
- `userId`
- `farmId`
- `imageReference`
- `crop`
- `potentialCondition`
- `confidence`
- `visualIndicators`
- `environmentalContext`
- `model`
- `modelVersion`
- `limitations`
- `createdAt`

Store an image reference rather than raw image bytes in Firestore. If image uploads are required, use Firebase Storage and store only the Storage path/metadata in Firestore.

## 11. farms/{farmId}/scenarioComparisons/{scenarioId}

Fields:
- `inputSnapshot`
- `scenarios`
- `comparison`
- `engineVersion`
- `createdAt`

## 12. cooperationSignals/{signalId}

Fields:
- `countryCode`
- `regionCode`
- `signalType`
- `value`
- `unit`
- `source`
- `dataStatus`
- `schemaVersion`
- `observedAt`

Do not expose private farmer/farm identifiers through cooperation endpoints.

## 13. users/{uid}/notifications/{notificationId}

Fields:
- `farmId`
- `type`
- `severity`
- `title`
- `message`
- `readAt`
- `createdAt`

## 14. dataSources/{sourceId}

Track provenance metadata for external providers and knowledge sources.

Fields:
- `name`
- `provider`
- `url`
- `version`
- `license`
- `retrievedAt`
- `status`

## Firestore Data Integrity Rules

- All timestamps use Firestore Timestamp/server timestamps.
- Store UTC-equivalent timestamps.
- Coordinates use WGS84.
- Units must be explicit.
- `source` and `dataStatus` are required for external observations.
- Simulated records must never masquerade as observed records.
- References must be validated before writes.
- Do not trust client-supplied `ownerId`; derive it from the verified Firebase Auth `uid`.
- Use transactions/batched writes when multiple documents must remain consistent.
- Create Firestore composite indexes only for queries actually required by the application.
- Keep large binary files out of Firestore.

## Firebase Security Model

Preferred MVP pattern:

```text
Client
  ↓ Firebase Auth
Firebase ID Token
  ↓
Express API
  ↓ Firebase Admin SDK
Firestore
```

The backend is responsible for authorization and privileged writes.

If the frontend directly reads/writes Firestore for any feature, add explicit `firestore.rules` that enforce:
- authenticated access;
- `request.auth.uid` ownership;
- role restrictions;
- validation of allowed fields;
- least-privilege reads/writes.

Never use open rules such as `allow read, write: if true;` in production.
