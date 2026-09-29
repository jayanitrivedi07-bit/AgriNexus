# AgriNexus — Software Requirements Specification

**Version:** 1.0  
**Status:** Build Specification  
**Architecture:** Modular Monolith  
**Frontend:** Next.js + TypeScript + Tailwind CSS  
**Backend:** Node.js + Express + TypeScript  
**Database:** Firebase Firestore  
**Authentication:** Firebase Authentication  
**AI:** Provider-agnostic LLM/Vision adapters

## 1. Functional Requirements

### FR-AUTH
- Firebase Authentication sign-up/sign-in
- Logout/client token removal
- Firebase ID-token verification
- Current-user endpoint
- Firestore user-profile synchronization
- Role-based authorization
- No application password storage

### FR-FARM
- Create farm
- List user's farms
- Retrieve farm
- Update farm
- Delete farm
- Store GeoJSON point
- Store crop and growth stage

### FR-SOIL
- Create soil observation
- List observations
- Store source and timestamp
- Support observed/estimated/simulated status

### FR-WEATHER
- Fetch normalized forecast
- Cache forecast
- Record provider and retrieval timestamp
- Return stale-cache indicator if provider fails

### FR-SATELLITE
- Query vegetation observations
- Store NDVI or equivalent index
- Store observation date and source
- Support cloud/data-quality metadata
- Never fabricate missing satellite data

### FR-TWIN
- Aggregate latest farm signals
- Calculate derived indicators
- Return current farm state
- Return recent changes
- Return active risks
- Return latest advisories

### FR-RISK
- Calculate deterministic MVP risks
- Store factors
- Store score/severity
- Store calculation version
- Allow future ML models

### FR-CROP
- Maintain crop profiles
- Compare crop suitability
- Return reasons
- Return risks
- Return calculation inputs/version

### FR-AI
- Build structured context
- Retrieve relevant agricultural knowledge
- Generate structured advisory
- Validate AI response
- Store advisory provenance
- Never invent missing measurements

### FR-DISEASE
- Accept image
- Validate file
- Run vision adapter
- Return potential condition
- Return confidence
- Store model/version
- Include limitations

### FR-SCENARIO
- Accept two or more scenarios
- Calculate normalized comparison
- Return factor-by-factor differences
- Preserve input snapshot

### FR-COOP
- Expose schema version
- List participating/demo datasets
- Import standardized records
- Validate schema
- Preserve source and data status
- Aggregate regional signals

### FR-NOTIFY
- Create event
- List notifications
- Mark read
- Link notification to farm/zone/risk

## 2. Data Status

Every external/derived value should use one of:

```text
observed
estimated
derived
recommended
simulated
```

## 3. Core API

Base path:

```text
/api/v1
```

### Auth
```text
POST /auth/session
GET  /auth/me
```

Firebase Authentication handles sign-up/sign-in on the client. Protected requests use a Firebase ID token.

### Farms
```text
GET    /farms
POST   /farms
GET    /farms/:farmId
PATCH  /farms/:farmId
DELETE /farms/:farmId
GET    /farms/:farmId/twin
```

### Soil
```text
GET  /farms/:farmId/soil
POST /farms/:farmId/soil
```

### Weather
```text
GET /farms/:farmId/weather
GET /farms/:farmId/weather/forecast
```

### Satellite
```text
GET /farms/:farmId/vegetation
GET /farms/:farmId/vegetation/history
```

### Risks
```text
GET /farms/:farmId/risks
POST /farms/:farmId/risks/recalculate
```

### Crop
```text
GET  /crops
GET  /crops/:cropId
POST /crops/recommend
```

### Advisory
```text
GET  /farms/:farmId/advisories
POST /farms/:farmId/advisories/generate
GET  /advisories/:advisoryId
```

### Disease
```text
POST /disease/analyze
GET  /disease/:analysisId
```

### Scenario
```text
POST /scenarios/compare
```

### Cooperation
```text
GET  /cooperation/schema
GET  /cooperation/countries
GET  /cooperation/signals
POST /cooperation/import
```

### Notifications
```text
GET   /notifications
PATCH /notifications/:notificationId/read
```

## 4. Standard Response

Success:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "req_123",
    "timestamp": "2026-09-29T00:00:00Z"
  }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid farm coordinates.",
    "details": []
  },
  "meta": {
    "requestId": "req_123"
  }
}
```

## 5. Farm Object

```json
{
  "id": "farm_123",
  "ownerId": "user_123",
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
  "currentCrop": "soybean",
  "growthStage": "vegetative",
  "sowingDate": "2026-06-20"
}
```

## 6. Evidence Object

```json
{
  "type": "weather",
  "source": "open-meteo",
  "observedAt": "2026-09-29T06:00:00Z",
  "value": 42,
  "unit": "mm",
  "dataStatus": "observed"
}
```

## 7. Advisory Object

```json
{
  "title": "Rainfall advisory",
  "priority": "medium",
  "recommendation": "Avoid unnecessary irrigation before the forecast rainfall.",
  "evidence": [],
  "risks": ["waterlogging"],
  "confidence": "medium",
  "generatedBy": {
    "type": "hybrid",
    "model": "configured-model",
    "version": "v1"
  }
}
```

## 8. Disease Result

```json
{
  "crop": "soybean",
  "potentialCondition": "possible leaf disease",
  "confidence": 0.91,
  "visualIndicators": [],
  "environmentalContext": [],
  "recommendedAction": "Inspect affected plants and consult local agricultural guidance.",
  "limitations": [
    "Image-based assessment is not a guaranteed diagnosis."
  ]
}
```

## 9. Non-Functional Requirements

### Performance
- Normal internal API target: under 500 ms where no external slow dependency is involved.
- AI and satellite calls must have timeout handling.
- Frontend must show loading states.

### Reliability
- Cache external data.
- Gracefully handle provider failure.
- Never substitute fake values for failed providers.

### Security
- Firebase Authentication
- Firebase ID-token verification
- Firestore authorization
- Rate limiting
- CORS restrictions
- Input validation
- File validation
- No privileged API keys/secrets in frontend

### Privacy
- Minimize personal data.
- Do not expose farmer identifiers through cooperation endpoints.
- Use aggregated/anonymized regional signals for exchange.

### Accessibility
- Keyboard navigation
- readable contrast
- semantic labels
- responsive mobile layout

## 10. Definition of Done

A feature is complete only when:
- API exists;
- validation exists;
- authorization is checked;
- database model exists;
- error state exists;
- frontend integration exists;
- loading/empty states exist;
- critical tests exist;
- source/provenance is recorded;
- simulated data is explicitly labeled.
