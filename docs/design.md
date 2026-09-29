# AGRINEXUS — COMPLETE UI/UX DESIGN SYSTEM

Design and build the AgriNexus web application as a **premium AI-powered digital agriculture and climate-intelligence platform** connecting farmers, agricultural data, AI models, satellite intelligence, soil analytics, weather intelligence, and the BRICS agricultural ecosystem.

The visual direction should feel like:

**Agriculture + AI + Climate Technology + Satellite Intelligence + Global Digital Infrastructure**

Do NOT make it look like a generic farming website, gardening website, NGO website, or simple green dashboard.

---

## 1. Design Philosophy

Use a combination of:

- Modern SaaS
- Climate-tech
- Precision agriculture
- AI infrastructure
- Data visualization
- Geographic intelligence
- Human-centered farmer UX

The interface should communicate:

- Trust
- Intelligence
- Sustainability
- Scientific credibility
- Global connectivity
- Simplicity
- Actionability

The design should feel comparable to a modern technology startup rather than a traditional agricultural portal.

---

## 2. Color System

Use a restrained professional palette.

### Primary

| Name | Hex | Use for |
|---|---|---|
| Deep Forest | `#14532D` | Primary buttons, important headings, navigation highlights, agriculture-related elements |
| Agriculture Green | `#22C55E` | Positive indicators, crop health, success states, active elements, growth metrics |

### Secondary

| Name | Hex | Use for |
|---|---|---|
| Earth Brown | `#92400E` | Sparingly: soil, earth-related information, soil analytics |
| Sky Blue | `#0284C7` | Weather, water, climate, temperature, rainfall |
| AI Purple | `#7C3AED` | Selectively: AI-generated insights, AI assistant, prediction, intelligence indicators |

### Neutral Colors

| Role | Hex |
|---|---|
| Background | `#F8FAFC` |
| Cards | `#FFFFFF` |
| Primary text | `#0F172A` |
| Secondary text | `#475569` |
| Muted text | `#64748B` |
| Borders | `#E2E8F0` |
| Dark dashboard background | `#0F172A` |

---

## 3. Color Usage Rule

Do not use every color everywhere. Use color semantically:

- **GREEN** → crops / growth / positive
- **BLUE** → weather / water / climate
- **BROWN** → soil / land
- **PURPLE** → AI / prediction / intelligence
- **RED** → disease / danger / emergency
- **AMBER** → warnings

Keep approximately:

- 70% neutral surfaces
- 20% green / agriculture colors
- 10% accent colors

Avoid excessive gradients.

---

## 4. Typography

### Primary Font

**Inter**

| Weight | Use |
|---|---|
| 400 | Body |
| 500 | Labels |
| 600 | Buttons / Subheadings |
| 700 | Headings |
| 800 | Hero headings / major numbers |

### Optional Display Font

Use **Plus Jakarta Sans** for large marketing headings if needed.

Do not mix more than two font families. For the farmer-facing interface, prioritize readability over style.

---

## 5. Typography Scale

| Element | Size |
|---|---|
| Hero heading | 48–64px |
| Desktop H1 | 40–48px |
| H2 | 30–36px |
| H3 | 22–26px |
| Body | 16px |
| Small text | 14px |
| Metadata | 12–13px |
| Dashboard metric | 28–36px |

Do not use excessively large text inside dashboards.

---

## 6. Border Radius

Use modern but controlled rounding.

| Element | Radius |
|---|---|
| Cards | 16px |
| Buttons | 10–12px |
| Inputs | 10–12px |
| Large containers | 20–24px |

Avoid extremely rounded "pill everything" designs. Use pill shapes only for:

- Status
- Tags
- Filters
- Small badges

---

## 7. Shadows

Use very subtle shadows.

```css
box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
```

Cards should primarily be separated using:

- White surfaces
- Borders
- Subtle shadows

Do not use heavy glowing shadows.

---

## 8. Spacing System

Use an 8px spacing system: 8, 16, 24, 32, 40, 48, 64, 80px.

Maintain consistent spacing across the entire application. Avoid cramped layouts.

---

## 9. Landing Page

The landing page should feel premium and global.

### Hero

**Headline:**

> Intelligence for a More Sustainable Agriculture

**Supporting text:**

> Connect satellite data, soil intelligence, weather insights and AI-powered recommendations to make better agricultural decisions.

**CTAs:**

- Primary: `Explore AgriNexus`
- Secondary: `Explore the Network`

**Hero visual:** use a combination of:

- Satellite-style agricultural map
- Glowing field boundaries
- Data points
- Weather indicators
- AI intelligence overlay

Do not use a generic stock photo as the primary hero visual.

---

## 10. Hero Visual Style

Create a sophisticated agricultural intelligence visualization.

**Show:**

- Green agricultural fields
- Satellite grid
- Geographic boundaries
- Weather indicators
- Soil data
- AI nodes
- Connected regions

**Subtle animations:**

- Data points moving
- Map markers
- Pulsing AI nodes
- Slowly changing satellite layers

Animations must be subtle and professional.

---

## 11. Landing Page Sections

1. Hero
2. Trusted / ecosystem section
3. Agriculture intelligence overview
4. Core capabilities
5. AI Agriculture Advisor
6. Satellite intelligence
7. Soil intelligence
8. Weather intelligence
9. Crop disease detection
10. BRICS agricultural network
11. Interactive global map
12. Impact / statistics
13. How the platform works
14. Sustainability section
15. CTA
16. Footer

---

## 12. Core Feature Cards

Create four primary intelligence cards.

### 🌱 Crop Intelligence

Crop recommendations based on:

- Location
- Soil
- Weather
- Crop history
- Environmental conditions

### 🧪 Soil Intelligence

Display:

- Nitrogen
- Phosphorus
- Potassium
- pH
- Moisture
- Soil health score

### 🌦 Climate Intelligence

Display:

- Temperature
- Rainfall
- Humidity
- Forecast
- Extreme weather alerts

### 🤖 AI Advisory

Display:

- Personalized recommendations
- Crop suggestions
- Irrigation advice
- Disease risk
- Fertilizer guidance

---

## 13. Farmer Dashboard

The farmer dashboard should prioritize actionable information.

**Layout:** Left sidebar + main dashboard.

**Sidebar:**

- Dashboard
- My Farm
- Crops
- Soil
- Weather
- Disease Detection
- AI Advisor
- Map
- Reports
- Settings

---

## 14. Farmer Dashboard Top Area

Show:

- Greeting: "Good morning, Farmer"
- Location
- Current weather
- Farm health score
- Important alerts

Example (demo values):

- 28°C
- Rain Probability 70%
- Humidity 68%
- Farm Health 87%

---

## 15. Dashboard Cards

Use cards for:

| Card | Value | Status |
|---|---|---|
| Farm Health | 87% | Healthy |
| Soil Moisture | 64% | Optimal |
| Crop Health | 91% | Healthy |
| Disease Risk | Low | — |

Each metric should include:

- Icon
- Current value
- Status
- Small trend indicator
- Optional sparkline

---

## 16. AI Advisor

The AI advisor should feel like a professional agricultural copilot.

**Use:**

- AI badge
- Conversational interface
- Suggested questions

**Example suggested questions:**

- "Should I irrigate my soybean field today?"
- "Which crop should I plant next season?"
- "Why are my leaves turning yellow?"
- "Is rain expected this week?"

AI responses should be structured instead of huge text blocks.

**Example response:**

> ### Recommendation
> Do not irrigate today.
>
> ### Reason
> Rain probability is 78% within the next 24 hours.
>
> ### Action
> Check soil moisture again tomorrow.

---

## 17. AI Visual Language

AI components can use:

- Purple accent
- Subtle purple gradient
- Spark / intelligence icon
- Animated loading indicator

But do not make the entire website purple. Purple should identify AI only.

---

## 18. Map Design

Use a dark or neutral map interface.

**Map layers:**

- Satellite
- Crop Health
- Soil
- Weather
- Rainfall
- Temperature
- Disease Risk

Provide a layer selector:

`Satellite` · `NDVI` · `Soil Moisture` · `Rainfall` · `Temperature` · `Disease Risk`

Use clear legends.

---

## 19. Satellite Data Visualization

Create visualizations for:

- NDVI
- Vegetation health
- Soil moisture
- Temperature
- Rainfall
- Crop stress

Use heatmaps and field-level overlays.

**Do not create fake satellite data and present it as real.** If data is unavailable, clearly label it:

**Demo Data** or **Sample Data**

---

## 20. Charts

Use clean charts.

| Chart | Purpose |
|---|---|
| Line chart | Weather trends |
| Bar chart | Crop production |
| Area chart | Rainfall |
| Donut chart | Farm health |
| Heatmap | Crop stress |
| Radar chart | Soil characteristics |

Avoid excessive charts. Every chart must answer a useful question.

---

## 21. Disease Detection

Create a dedicated disease detection interface.

**Flow:**

```
Upload crop image
      ↓
AI analyzes image
      ↓
Disease prediction
      ↓
Confidence
      ↓
Symptoms
      ↓
Recommended action
      ↓
Prevention
```

**Example (demo):**

- Disease: Leaf Blight
- Confidence: 92%
- Risk: High
- Action: Remove infected leaves and isolate affected plants.

Never imply medical/scientific certainty when the underlying model is only a demo.

---

## 22. BRICS Network Page

Create a dedicated global agriculture network page.

**Countries:**

- 🇧🇷 Brazil
- 🇷🇺 Russia
- 🇮🇳 India
- 🇨🇳 China
- 🇿🇦 South Africa

**Show:**

- Agricultural datasets
- Climate information
- Crop information
- AI models
- Research collaboration
- Sustainable agriculture indicators

Use a large interactive world map.

---

## 23. Global Map Visual

The map should visually communicate:

**Data → Intelligence → Collaboration → Agriculture**

Show connection lines between participating regions. Use subtle animated nodes. Avoid making it look like a cryptocurrency network.

---

## 24. Data Explorer

Create a data exploration page.

**Filters:**

- Country
- Region
- Crop
- Season
- Year
- Data type

**Show:**

- Charts
- Tables
- Maps
- Statistics

Use clear filter controls.

---

## 25. Farm Profile

Farm profile should show:

- Farm name
- Location
- Farm size
- Current crop
- Soil type
- Soil health
- Crop health
- Weather
- Irrigation
- Historical data
- AI recommendations

---

## 26. Mobile Design

The farmer experience must be **mobile-first**.

- Minimum touch target: **44px**
- Use large buttons
- Use simple icons
- Avoid dense tables on mobile
- Convert dashboards into vertically stacked cards

Important actions should remain accessible:

`Ask AI` · `Check Weather` · `Scan Disease` · `View Farm`

---

## 27. Language Support

Design the UI for multilingual agriculture users.

**Potential languages:**

- English
- Hindi
- Marathi
- Portuguese
- Russian
- Chinese
- South African regional languages where applicable

Use a language selector. Do not hardcode text inside components. Use localization files.

---

## 28. Accessibility

Follow WCAG-oriented practices.

**Requirements:**

- Strong text contrast
- Keyboard navigation
- Visible focus states
- Alt text
- Semantic HTML
- Accessible buttons
- Accessible form labels
- Do not rely only on color to communicate status
- Screen-reader-friendly icons

---

## 29. Iconography

Use **Lucide Icons**. Keep icons consistent.

| Icon | Meaning |
|---|---|
| Leaf | Crops |
| Cloud | Weather |
| Droplets | Irrigation |
| Flask | Soil |
| Satellite | Satellite data |
| Brain / Sparkles | AI |
| Map | Geography |
| Shield / Alert | Risk |
| Chart | Analytics |
| Globe | BRICS network |

Do not mix random icon libraries.

---

## 30. Animations

Use **Framer Motion** or equivalent.

**Animations should include:**

- Fade-in
- Slide-up
- Card hover
- Number counters
- Map marker pulse
- AI response animation
- Smooth page transitions

Keep animations between approximately **150–500ms**.

**Avoid:**

- Excessive bouncing
- Continuous spinning
- Distracting particles
- Overly flashy transitions

Respect `prefers-reduced-motion`.

---

## 31. Background Design

Use mostly:

- White
- Off-white
- Very light green
- Subtle grid
- Subtle agricultural contour patterns

For special sections, use dark navy/forest backgrounds. Avoid making every section green.

---

## 32. Data Cards

Every card should have a clear hierarchy:

```
ICON
LABEL
PRIMARY VALUE
STATUS
CONTEXT / TREND
```

**Example:**

> 🌱 Crop Health
> **91%**
> Healthy
> ↑ 4.2% from last week

---

## 33. Status System

| Status | Color |
|---|---|
| Healthy | Green |
| Warning | Amber |
| Critical | Red |
| Information | Blue |
| AI | Purple |

Do not use red merely because something is slightly below average.

---

## 34. Button System

| Type | Example label |
|---|---|
| Primary | `Get Started` |
| Secondary | `Explore` |
| Tertiary | `View Details` |
| Danger | `Delete` |
| AI | `Ask AI` |

Buttons should have:

- Clear labels
- Consistent height
- Hover state
- Focus state
- Disabled state
- Loading state

---

## 35. Forms

Use:

- Clear labels
- Helpful placeholders
- Validation messages
- Loading states
- Success states
- Error states

Never rely only on placeholder text as the field label.

---

## 36. Navigation

**Desktop (public):**

Logo · Platform · Solutions · Network · Data · About · Language · Login · Get Started

**Logged-in:**

Dashboard · Farm · Intelligence · AI Advisor · Network · Reports · Settings

---

## 37. Footer

Include:

- **AgriNexus** — Digital Agriculture Intelligence
- **Platform:** Solutions, AI Advisory, Crop Intelligence, Soil Intelligence, Weather Intelligence
- **Network:** BRICS Network
- **Data**
- **Resources**
- **About**
- **Contact**
- **Privacy**
- **Terms**
- **Copyright**

---

## 38. Responsive Breakpoints

| Device | Range |
|---|---|
| Mobile | 320–639px |
| Tablet | 640–1023px |
| Desktop | 1024–1439px |
| Large Desktop | 1440px+ |

The interface must not simply shrink desktop layouts. Reflow the layout intelligently.

---

## 39. Design Consistency

Create reusable components:

- Button
- Card
- Badge
- Input
- Select
- Modal
- Navbar
- Sidebar
- MetricCard
- ChartCard
- AlertCard
- AIMessage
- MapPanel
- DataTable
- WeatherCard
- CropCard
- SoilCard
- DiseaseCard

Do not duplicate components.

---

## 40. UX Principle

Every screen should answer:

1. **"What does the farmer need to know?"**
2. **"What should the farmer do next?"**

Avoid displaying data merely because it looks impressive. Convert raw data into actionable information.

---

## 41. Important Product Rule

**Do not fabricate agricultural intelligence.**

If the backend/model/data source does not provide a value, do not invent it. Use:

- "Data unavailable"
- "Demo data"
- "Awaiting analysis"

Never present mock values as real agricultural predictions.

---

## 42. Overall Visual Feel

The final product should feel:

Modern · Scientific · Trustworthy · Agricultural · AI-powered · Global · Clean · Premium · Data-driven · Human-centered

It should **NOT** feel:

Generic · Cartoonish · Overly green · Government-portal-like · Crypto-like · Gaming-like · Over-animated · Overcrowded

---

## 43. Final Design Direction

Think:

**Google Earth + modern SaaS dashboard + climate-tech startup + AI copilot + precision agriculture**

Combine these ideas without copying any specific product.

The final AgriNexus interface should communicate:

> **"A global digital intelligence layer for sustainable agriculture."**
