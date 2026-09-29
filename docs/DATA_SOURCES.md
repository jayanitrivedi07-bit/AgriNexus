# AgriNexus — Data Sources and Provenance

## 1. Purpose

This document defines the intended external data strategy.

Do not claim an API is available or free for a specific production use without checking its current terms and limits.

## 2. Weather — Open-Meteo

Use as an MVP weather provider because its documented Forecast API accepts latitude/longitude and exposes variables including temperature, humidity, precipitation probability, precipitation, evapotranspiration and related fields.

Source:
Open-Meteo official documentation.

Implementation rule:
- wrap provider in `WeatherProvider`;
- normalize response;
- cache forecasts;
- record provider and retrieval time.

## 3. Earth Observation — Copernicus Data Space Ecosystem

Use Sentinel-2 data through the Copernicus Data Space Ecosystem where appropriate.

The ecosystem documents catalogue APIs including OData and STAC, plus processing/access APIs. Sentinel-2 supports land monitoring and agricultural use cases.

MVP strategy:
1. search for suitable Sentinel-2 observations;
2. filter by farm geometry/date/cloud conditions;
3. obtain required bands or processed vegetation information;
4. calculate NDVI where appropriate;
5. store source product identifier and observation date.

Do not download/store huge imagery unnecessarily.

## 4. Soil — ISRIC SoilGrids

SoilGrids provides global gridded soil information and modeled soil properties.

Important limitation:
the SoilGrids REST API is currently described by ISRIC as beta and may experience downtime; ISRIC also recommends alternative access methods such as WCS/WebDAV for stable workflows. ISRIC cautions that SoilGrids is best suited to continental/macro-region applications and should not automatically be treated as accurate farm-level ground truth.

Therefore:
- use SoilGrids as contextual/background soil information;
- prefer actual farmer/soil-lab observations when available;
- clearly label SoilGrids-derived values;
- keep provider adapter replaceable.

## 5. Disease Data

For the hackathon:
- use a licensed/authorized crop-disease model or dataset;
- verify dataset/model license before redistribution;
- if using a public benchmark such as PlantVillage, verify the current source and license terms before shipping it.

Do not claim a benchmark model is production-accurate for all crops/regions.

## 6. Crop Knowledge

Prefer:
- agricultural extension publications;
- government agricultural departments;
- peer-reviewed sources;
- recognized agricultural organizations.

Store source metadata.

## 7. Demo Data

When real APIs are unavailable:
- generate deterministic demo records;
- mark `dataStatus = simulated`;
- show "Demo/Simulated" in the UI.

Never hide demo data behind a label such as "live".

## 8. Provenance Object

Every external observation should record:

```json
{
  "source": "provider",
  "provider": "provider-name",
  "productId": "optional",
  "observedAt": "ISO-8601",
  "retrievedAt": "ISO-8601",
  "dataStatus": "observed|estimated|simulated",
  "quality": "good|fair|poor|unknown"
}
```

## 9. Source Verification Rule

Before adding a provider to production code:
1. verify official documentation;
2. verify authentication requirements;
3. verify rate limits;
4. verify license/terms;
5. verify geographic coverage;
6. implement timeout and fallback;
7. record source metadata.

## 10. Current Verified References

- Open-Meteo Forecast API documentation
- Copernicus Data Space Ecosystem API documentation
- Copernicus Sentinel-2 documentation
- ISRIC SoilGrids documentation

The exact endpoints and commercial/production terms must be checked before deployment.
