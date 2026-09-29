# AgriNexus — Antigravity / Coding Agent Rules

## 1. Mission

Build AgriNexus from the repository state and project documents.

Do not rewrite working features unnecessarily.

## 2. Mandatory First Step

Before changing code:

1. inspect the entire repository;
2. identify frontend/backend structure;
3. inspect package files;
4. inspect environment files;
5. inspect existing routes;
6. inspect Firestore collection usage, Firebase Auth integration, and security rules;
7. inspect existing UI;
8. identify duplicate/unused code;
9. identify broken imports;
10. identify existing API integrations.

Do not assume the repository is empty.

## 3. No Hallucination Rule

Never invent:
- API endpoints;
- SDK methods;
- environment variables;
- database collections;
- provider capabilities;
- model names;
- response fields.

If uncertain:
1. inspect installed package;
2. inspect official documentation;
3. inspect existing project usage;
4. then implement.

## 4. Architecture Rule

Follow:

```text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository/Model
```

External APIs:

```text
Service
 ↓
Provider Adapter
 ↓
External API
```

Do not put business logic in React components or Express route files.

## 5. Data Rule

Never fabricate:
- weather;
- satellite values;
- soil measurements;
- disease confidence;
- crop yield.

Use:
- real data;
- user-provided data;
- deterministic demo data explicitly marked simulated.

## 6. AI Rule

AI does not replace deterministic logic.

Use code for:
- calculations;
- thresholds;
- validation;
- scoring;
- normalization.

Use AI for:
- explanation;
- language generation;
- contextual reasoning;
- retrieval-assisted answers.

## 7. Change Discipline

Before editing:
- identify files affected;
- identify dependencies;
- preserve existing working behavior.

After editing:
- run typecheck;
- run lint;
- run tests;
- run build.

## 8. Frontend Rules

- responsive;
- mobile-first;
- accessible;
- loading states;
- empty states;
- error states;
- no fake metrics;
- no hardcoded live-looking data unless marked demo.

## 9. Backend Rules

Every endpoint must have:
- validation;
- authorization where needed;
- predictable response;
- error handling;
- logging/request ID where applicable.

## 10. External API Rules

Each provider requires:
- adapter;
- timeout;
- error handling;
- normalized response;
- source metadata;
- cache where appropriate.

## 11. Database Rules

- timestamps;
- indexes;
- explicit references;
- validation;
- no duplicated source of truth.

## 12. Git Rules

Use small commits:

```text
feat:
fix:
refactor:
docs:
test:
chore:
```

Do not commit:
- `.env`;
- credentials;
- generated secrets;
- large temporary files.

## 13. Agent Workflow

For every task:

```text
UNDERSTAND
 ↓
INSPECT
 ↓
PLAN
 ↓
IMPLEMENT
 ↓
TEST
 ↓
VERIFY
 ↓
REPORT
```

## 14. Completion Report

After each substantial task report:
- files changed;
- what was implemented;
- tests executed;
- known limitations;
- remaining work.

## 15. Stop Conditions

Stop and ask for clarification if:
- requirements conflict;
- an external API cannot be verified;
- destructive migration is required;
- credentials are missing;
- a design decision materially changes architecture.

Do not silently invent a solution.
