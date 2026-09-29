# AgriNexus — Implementation Plan

## Phase 0 — Repository Audit

Antigravity must:
- inspect repository;
- detect current stack;
- identify working/broken areas;
- produce a short architecture report;
- avoid changing code.

## Phase 1 — Foundation

Implement:
- TypeScript configuration;
- Express application;
- environment validation;
- Firebase Admin SDK initialization;
- Firestore connectivity;
- environment validation;
- logging;
- error middleware;
- request IDs;
- health endpoint.

## Phase 2 — Firebase Authentication

Implement:
- Firebase Authentication on the frontend;
- Firebase ID-token acquisition;
- Firebase Admin SDK initialization in the backend;
- ID-token verification middleware;
- current-user endpoint;
- Firestore `users/{uid}` profile synchronization;
- role-based authorization.

Do not implement custom password hashing or password storage.

## Phase 3 — Farms

Implement:
- farm CRUD;
- GeoJSON location;
- crop selection;
- farm dashboard.

## Phase 4 — Soil

Implement:
- manual soil observations;
- source/provenance;
- normalized schema.

## Phase 5 — Weather

Implement:
- provider adapter;
- forecast fetch;
- normalization;
- caching;
- failure fallback.

## Phase 6 — Satellite

Implement:
- provider adapter;
- observation search;
- vegetation index processing;
- provenance;
- historical trend.

If live satellite integration is too time-consuming for MVP, use a clearly labeled deterministic demo adapter without pretending it is live.

## Phase 7 — Digital Farm Twin

Aggregate:
- farm;
- soil;
- weather;
- vegetation;
- risks;
- recent changes.

## Phase 8 — Risk Engine

Implement deterministic first version.

Examples:
- rainfall risk;
- water stress;
- heat stress;
- vegetation stress.

Store calculation version.

## Phase 9 — Crop Engine

Implement crop profiles and factor-based comparison.

Do not train a complex ML model unless there is enough validated data.

## Phase 10 — Advisory

Implement:
- context builder;
- knowledge retrieval;
- LLM adapter;
- structured output;
- validation;
- evidence rendering.

## Phase 11 — Disease

Implement:
- secure upload;
- vision adapter;
- model result;
- contextual enrichment;
- limitations.

## Phase 12 — Scenario Simulator

Implement two/three-option comparison.

## Phase 13 — Cooperation Exchange

Implement:
- schema;
- country/demo datasets;
- import validation;
- aggregation;
- status/provenance.

## Phase 14 — Notifications

Implement:
- risk events;
- user notifications;
- read state.

## Phase 15 — Testing

Minimum:
- unit;
- API integration;
- auth;
- authorization;
- provider failure;
- AI schema validation;
- file upload validation.

## Phase 16 — Deployment

Build:
- Dockerfile;
- environment configuration;
- health check;
- production logging;
- Firebase project configuration;
- Firebase Admin SDK secrets;
- Firestore indexes/rules where required;
- Cloud Run/Render deployment;
- Cloud Run/Render deployment.

## Phase 17 — Demo Hardening

Test the full story:

```text
Register
→ Farm
→ Weather
→ Soil
→ Vegetation
→ Risk
→ Advisory
→ Crop Scenario
→ Disease
→ Cooperation
```

Remove:
- dead pages;
- fake buttons;
- duplicate components;
- broken links;
- placeholder data that looks real.
