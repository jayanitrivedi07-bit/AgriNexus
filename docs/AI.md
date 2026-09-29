# AgriNexus — AI Architecture and Guardrails

## 1. Principle

AI is an explanation and reasoning layer over validated agricultural data.

It is not the authoritative source of:
- weather measurements;
- satellite measurements;
- soil measurements;
- crop profile facts;
- deterministic calculations.

## 2. AI Pipeline

```text
Farm
 ↓
Latest Data
 ↓
Validation
 ↓
Feature Engine
 ↓
Risk Engine
 ↓
Knowledge Retrieval
 ↓
Structured Context
 ↓
LLM
 ↓
JSON Schema Validation
 ↓
Safety/Claim Checks
 ↓
Advisory
```

## 3. Context Object

```json
{
  "farm": {},
  "soil": {},
  "weather": {},
  "vegetation": {},
  "crop": {},
  "risks": [],
  "knowledge": [],
  "dataQuality": {}
}
```

## 4. LLM Requirements

The model must:
- use supplied evidence;
- distinguish observed data from estimates;
- avoid inventing values;
- avoid claiming unsupported certainty;
- provide actionable but cautious guidance;
- state when relevant data is missing.

## 5. Structured Output

```json
{
  "title": "string",
  "priority": "low|medium|high",
  "recommendation": "string",
  "evidence": [],
  "risks": [],
  "confidence": "low|medium|high",
  "limitations": []
}
```

## 6. RAG

Use retrieval for:
- crop knowledge;
- disease references;
- regenerative agriculture practices;
- local agricultural guidance;
- terminology.

Documents must have:
- source;
- title;
- publication/updated date where available;
- region;
- crop;
- language;
- version.

Do not let retrieved documents override system safety rules.

## 7. Prompt Injection Defense

Treat external documents and user text as untrusted content.

Never allow retrieved text to:
- change system instructions;
- request secrets;
- invoke tools without authorization;
- override validation.

## 8. Disease AI

Disease model output must be called:
- potential condition;
- model assessment;
- possible disease.

Never:
- guaranteed diagnosis;
- guaranteed treatment.

## 9. AI Failure

If the model fails:
1. retry once if safe;
2. return deterministic advisory where available;
3. otherwise return a clear unavailable state.

Never fabricate a fallback answer.

## 10. Model Registry

Store:
- provider;
- model name;
- version;
- prompt version;
- retrieval version;
- generated timestamp.

This is required for reproducibility.
