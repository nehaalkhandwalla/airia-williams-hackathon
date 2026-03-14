# Williams Race Strategist – Trackside Companion

An immersive, real-time race companion web app that connects to an AI pit wall strategist agent. Built for the Williams Racing / Atlassian digital experience.

## Features

- **Live race scenarios** – View strategy decisions as they unfold
- **Pit wall strategy** – See recommendations, reasoning, and team radio
- **Pit crew status** – Monitoring, Prepare Pit, Crew Ready indicators
- **Fan knowledge levels** – Beginner, Intermediate, Expert
- **Interaction** – Stay Out / Pit This Lap / Pit Next Lap when relevant
- **Mock mode** – Full UI without backend for development and demos

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** (state)
- **Axios** (API)
- **Radix UI** (dropdowns)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
npm install
```

### Environment

Copy the example env and adjust as needed:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_USE_MOCK` | `true` = use mock API (no backend). `false` = call real Airia Agent API. |
| `NEXT_PUBLIC_STRATEGY_API_URL` | Base URL of the strategy API (e.g. `https://api.example.com`) when not using mock. |

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build (Vercel-ready)

```bash
npm run build
npm start
```

## Project structure

```
/app
  layout.tsx    # Root layout, fonts (Orbitron, Inter)
  page.tsx     # Main page → DashboardLayout
  globals.css  # Williams theme, glass panels, telemetry bg

/components
  DashboardLayout.tsx   # Top bar, 3-panel layout, bottom actions
  StrategyCard.tsx      # Lap, event, recommendation, reasoning, radio, pit crew
  RadioMessage.tsx      # Team radio + waveform
  PitCrewStatus.tsx    # Monitoring / Prepare / Crew Ready
  ScenarioTimeline.tsx # Left-panel race timeline
  KnowledgeLevelSelector.tsx  # Beginner | Intermediate | Expert
  TelemetryPanel.tsx   # Right panel: pit crew, phase, tyres, mode
  InteractionPanel.tsx # Stay Out / Pit This Lap / Pit Next Lap
  ConnectionIndicator.tsx # Connected | Connecting | Offline

/store
  useRaceStore.ts  # Zustand: scenarios, currentScenario, polling, actions

/lib
  api.ts       # POST /api/strategy (Airia Agent)
  mockApi.ts   # Mock scenarios when NEXT_PUBLIC_USE_MOCK=true
  types.ts     # StrategyScenario, FanKnowledgeLevel, PitCrewState, etc.
  utils.ts     # cn()
```

## API (Airia Agent)

When `NEXT_PUBLIC_USE_MOCK` is `false`, the app calls:

- **POST** `{NEXT_PUBLIC_STRATEGY_API_URL}/api/strategy`
- **Body:** `{ "fan_level": "Beginner" | "Intermediate" | "Expert", "user_decision"?: "Stay Out" | "Pit This Lap" | "Pit Next Lap" }`
- **Response:** `{ scenario_id, lap, event, strategy_recommendation, reasoning, radio_message, pit_crew_state }`

Polling runs every 5 seconds to simulate live updates.

## Design (Williams F1)

- **Primary:** Williams Navy `#141E32`, Williams Blue `#1E30BE`, White `#FFFFFF`, Light Blue `#4C5CFF`, Dark `#010A20`
- **Status:** Success `#00FF87`, Warning `#FFD166`, Neutral `#94A3B8`
- **Fonts:** Orbitron (telemetry, numbers), Inter (UI)
- **Style:** Dark theme, glass panels, subtle glow, telemetry-style layout

## License

Private – Williams Racing / Atlassian hackathon.
