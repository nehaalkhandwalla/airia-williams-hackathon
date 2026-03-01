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
| `NEXT_PUBLIC_USE_MOCK` | `true` = use mock API (no backend). `false` = use the Airia agent via `/api/airia`. |
| `AIRIA_PIPELINE_URL` | **Server-only.** Full Airia Pipeline Execution URL. Never exposed to the frontend. |
| `AIRIA_API_KEY` | **Server-only.** Your Airia API key. From Airia Studio: Settings > Interfaces > View API Keys. Never exposed to the frontend. |

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
  api/airia/route.ts  # POST /api/airia – proxies to Airia with server-only API key

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
  api.ts       # fetchStrategy() – calls POST /api/airia with fan level
  mockApi.ts   # Mock scenarios when NEXT_PUBLIC_USE_MOCK=true
  types.ts     # StrategyScenario, FanKnowledgeLevel, PitCrewState, etc.
  utils.ts     # cn()
```

## API (Airia via Next.js)

When `NEXT_PUBLIC_USE_MOCK` is `false`, the frontend calls **POST /api/airia** (never Airia directly). The Next.js API route:

- Accepts body: `{ "fanKnowledgeLevel": "Beginner" | "Intermediate" | "Expert", "user_decision"?: "Stay Out" | "Pit This Lap" | "Pit Next Lap" }`
- Sends to Airia: `{ "userInput": "begin scenarios. Level: <level>", "asyncOutput": false }` (and optionally appends the user decision)
- Uses server-only env vars `AIRIA_PIPELINE_URL` and `AIRIA_API_KEY` so the API key is never exposed to the frontend

The agent’s response (nested or stringified) is parsed and returned as a scenario; the frontend updates Zustand state The frontend updates Zustand state with the returned scenario.

Polling runs every 5 seconds while the simulation is running.

## Design (Williams F1)

- **Primary:** Williams Navy `#041E42`, Williams Blue `#00AEEF`, White, Light Blue `#6CD3FF`, Dark `#020B1C`
- **Status:** Success `#00FF87`, Warning `#FFD166`, Neutral `#94A3B8`
- **Fonts:** Orbitron (telemetry, numbers), Inter (UI)
- **Style:** Dark theme, glass panels, subtle glow, telemetry-style layout

## License

Private – Williams Racing / Atlassian hackathon.
