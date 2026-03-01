import type { StrategyResponse, PitCrewState } from "./types";

/** Australian GP 2026 — wet-to-dry race scenarios (AI Agent output). Lap 1–15, then race ended. */
const LAP_SCENARIOS: StrategyResponse[] = [
  {
    scenario_id: "AUS_2026_S01",
    lap: 1,
    event:
      "Race Start — Wet Conditions. All cars on Intermediate tyres. Track temperature 18°C, light rain falling. Visibility reduced through Turn 1. Carlos Sainz makes a strong start from P6, gaining one position into Turn 1.",
    strategy_recommendation:
      "Maintain Intermediates. Monitor track evolution closely. No pit action required. Focus on clean laps and tyre temperature management.",
    reasoning:
      "Lap time data confirms Intermediate compound is the correct choice at race start (Lap 1: 2:12.195). Rain is consistent and the track has not shown signs of drying. Switching to Slicks would be premature and dangerous. Priority is survival and position consolidation in opening laps.",
    radio_message:
      "Carlos, good start. Track is wet, stay on the Inters, manage your pace through the first sector. Let's get some clean laps in and build tyre temp. Box is monitoring.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S02",
    lap: 2,
    event:
      "Lap 2 — No lap time recorded (NaT). Likely Safety Car or neutralisation period. Field bunching up. Track conditions unchanged, rain persisting.",
    strategy_recommendation:
      "Hold position. No pit stop. Use Safety Car period to assess tyre condition and gather weather data. Prepare contingency plan for early Intermediate-to-Slick transition if track begins drying post-SC.",
    reasoning:
      "Lap 2 shows no valid lap time (NaT), strongly indicating a Safety Car or red flag period. This is not the moment to pit — track is still wet and we have no data suggesting a dry line is forming. Use this window to brief the pit crew and review weather radar.",
    radio_message:
      "Carlos, Safety Car is out. Stay calm, keep the tyres warm, weave gently on the straights. We're watching the weather closely. No changes for now, just hold position and stay ready.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S03",
    lap: 3,
    event:
      "Lap 3 — No lap time recorded (NaT). Tyre age resets to 1.0 — indicating a pit stop or tyre change occurred under neutralisation. New Intermediate fitted.",
    strategy_recommendation:
      "Fresh Intermediates fitted. Reset stint strategy. Target consistent lap times to build tyre temperature on the new compound. Hold track position.",
    reasoning:
      "Tyre age dropping back to 1.0 on Lap 3 confirms a tyre change was made, likely under Safety Car. Fresh Intermediates are the correct call given continued wet conditions. This resets our degradation window and gives us a full stint of pace potential once the race resumes.",
    radio_message:
      "Carlos, fresh Inters are on. Once the SC comes in, we need a strong restart. Build heat in the tyres on the formation lap. Let's go racing.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S04",
    lap: 4,
    event:
      "Lap 4 — No lap time recorded (NaT). Tyre age at 2.0. Race likely still under Safety Car or slow formation conditions. Track remains wet.",
    strategy_recommendation:
      "Continue monitoring. No pit action. Maintain tyre temperature through controlled weaving. Prepare for race restart on Lap 5.",
    reasoning:
      "Second consecutive NaT lap time with tyre age progressing normally suggests continued neutralisation. No strategic action needed. Focus is on restart preparation and ensuring tyres are in the optimal temperature window when the Safety Car pulls in.",
    radio_message:
      "Carlos, still under the Safety Car. Keep working those tyres, stay focused. Restart could come any lap now. We need a clean and aggressive restart — P5 is right there.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S05",
    lap: 5,
    event:
      "Lap 5 — Race restarts. Lap time 2:22.084. Tyre age 3.0. Intermediates performing as expected on a wet but improving track. Carlos holds position on restart.",
    strategy_recommendation:
      "Push for consistent lap times. No pit stop. Track is still too wet for Slicks. Monitor lap time progression for signs of track drying over the next 3–5 laps.",
    reasoning:
      "Lap time of 2:22.084 on Lap 5 is slower than the Lap 1 benchmark of 2:12.195, suggesting the restart was cautious and tyres were still coming up to temperature. Track remains wet. No case for Slicks yet. Focus on building rhythm and monitoring the drying trend.",
    radio_message:
      "Good restart Carlos. Lap time is a bit off but that's expected. Push now, build your pace. We're watching the track — still on Inters for now. Stay patient.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S06",
    lap: 6,
    event:
      "Lap 6 — Lap time 2:19.612. Tyre age 4.0. Slight improvement in pace. Track conditions beginning to show early signs of a drying racing line on the main straight.",
    strategy_recommendation:
      "Maintain Intermediates. Lap time trend is improving. Begin internal discussion on Slick transition window — targeting Lap 10–12 if drying continues at this rate.",
    reasoning:
      "Lap time improved from 2:22.084 to 2:19.612, a gain of over 2.4 seconds. This pace improvement is encouraging but not yet sufficient to justify a Slick call. The track is beginning to dry but Intermediates are still the faster compound. We open a strategic window for Slick transition planning.",
    radio_message:
      "Carlos, pace is coming to you, good improvement. Track is starting to dry on the straight. Stay on it — we're thinking Slicks around Lap 10 to 12 if this continues. Keep pushing.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S07",
    lap: 7,
    event:
      "Lap 7 — Lap time 2:09.065. Tyre age 5.0. Significant pace jump. Track drying rapidly. Dry line visibly forming through multiple corners. Several competitors beginning to pit for Slicks.",
    strategy_recommendation:
      "Begin preparing for Slick pit stop. Target pit window opening Lap 8–9. Do not overextend on Intermediates — risk of being undercut is rising. Recommend Hard compound Slick for tyre life and race distance management.",
    reasoning:
      "A massive 10-second lap time improvement from Lap 6 to Lap 7 (2:19.612 → 2:09.065) signals the track is drying at an accelerating rate. Intermediates are beginning to lose their performance advantage. Competitors pitting now could gain significant track position. We must act within 1–2 laps to avoid losing ground.",
    radio_message:
      "Carlos, track is drying fast, that lap time tells us everything. Slick window is opening NOW. We're targeting Lap 8 or 9 for your stop. Crew is going on standby. Stay out one more lap and give us a read on grip.",
    pit_crew_state: "PreparePitStop",
  },
  {
    scenario_id: "AUS_2026_S08",
    lap: 8,
    event:
      "Lap 8 — Lap time 1:38.281. Tyre age 6.0. Track is now predominantly dry. Intermediates are heavily overheating and losing grip. Carlos reports heavy graining through the radio.",
    strategy_recommendation:
      "PIT THIS LAP. Immediate switch to Hard Slick tyres. Do not delay — Intermediates are now a significant liability. Every lap on Inters costs 3–5 seconds per lap versus Slick-shod competitors.",
    reasoning:
      "Lap time of 1:38.281 on worn Intermediates on a drying track confirms the compound is now operating outside its optimal window. Graining reported by the driver is a critical warning sign. Competitors already on Slicks will be pulling away rapidly. Immediate pit stop is the only correct call to arrest position loss.",
    radio_message:
      "Carlos, BOX BOX BOX. Pit this lap. Hard tyres going on. Crew is ready. Brake early into the pit entry, clean stop. Let's go.",
    pit_crew_state: "CrewReady",
  },
  {
    scenario_id: "AUS_2026_S09",
    lap: 9,
    event:
      "Lap 9 — Lap time 1:36.300. Tyre age 7.0 on Intermediates — pit stop may have been delayed or occurred at end of lap. Track fully dry. Slick-shod cars pulling significant time advantages.",
    strategy_recommendation:
      "If not yet pitted — PIT IMMEDIATELY. If already pitted — focus on tyre warm-up and aggressive pace recovery. Target recapturing lost positions over next 5 laps on fresh Hard Slicks.",
    reasoning:
      "Lap time of 1:36.300 still on Intermediates represents continued degradation. The gap to Slick-equipped cars is now critical. If the stop has occurred, the fresh Hard compound needs 2–3 laps to reach optimal temperature before Carlos can push at full pace. Position recovery is the immediate priority.",
    radio_message:
      "Carlos, if you haven't boxed — pit NOW, no more delays. If you're on the Hards already — build temp over the next 2 laps then we push hard. Time to go hunting.",
    pit_crew_state: "CrewReady",
  },
  {
    scenario_id: "AUS_2026_S10",
    lap: 10,
    event:
      "Lap 10 — Lap time 1:34.494. Tyre age 8.0. Pace continuing to improve. If on Slicks, tyres entering optimal temperature window. Track fully dry and stable.",
    strategy_recommendation:
      "Push to maximum pace. Begin aggressive overtaking phase. Hard Slick tyres should now be in their performance window. Target 1:28–1:30 lap times over the next 5 laps to recover positions.",
    reasoning:
      "Lap time trend shows consistent improvement (1:38.281 → 1:36.300 → 1:34.494) across Laps 8–10, indicating tyre warm-up progression. If now on Slicks, this is the phase where full attack mode is appropriate. Track is fully dry and stable — optimal conditions for position recovery.",
    radio_message:
      "Carlos, tyres should be coming in now. This is your window — push hard, attack every lap. P4 is 4 seconds ahead. You have the pace to close it. Let's go.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S11",
    lap: 11,
    event:
      "Lap 11 — Lap time 1:34.206. Tyre age 9.0. Consistent pace being maintained. Carlos closing on the car ahead. Track temperature rising — Hard compound working well.",
    strategy_recommendation:
      "Maintain attack pace. Hard tyres performing well. No strategic changes required. Monitor tyre degradation rate and adjust fuel-adjusted pace targets as needed. Next strategic review at Lap 20.",
    reasoning:
      "Lap time of 1:34.206 is marginally quicker than Lap 10 (1:34.494), showing the car is consistently performing at pace. Hard compound is the correct choice for remaining race distance — it will manage degradation well in the warming conditions. Focus shifts to racecraft and overtaking opportunity.",
    radio_message:
      "Good lap Carlos, you're closing in. Keep the pressure on. Hards are performing well — we have a long stint ahead. Stay out of trouble and pick your moment.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S12",
    lap: 12,
    event:
      "Lap 12 — Lap time 1:33.713. Tyre age 10.0. Carlos setting his fastest laps of the race. Car ahead within 2 seconds. DRS activation possible next lap.",
    strategy_recommendation:
      "Maintain pressure. DRS zone could unlock an overtake opportunity on Lap 13. Hold current pace. No pit stop required — Hard tyres have significant life remaining.",
    reasoning:
      "Lap 12 time of 1:33.713 is the quickest lap of the race so far, demonstrating the Hard compound is fully in its window and Carlos is extracting maximum performance. The 2-second gap to the car ahead means DRS activation is imminent. This is a critical racecraft moment.",
    radio_message:
      "Carlos, fastest lap of the race — excellent. You're within 2 seconds, DRS next lap. Pick your braking point carefully into Turn 1. The move is on.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S13",
    lap: 13,
    event:
      "Lap 13 — Lap time 1:33.153. Tyre age 11.0. Carlos setting another personal best. DRS activated. Overtake attempt made into Turn 1 — position gained.",
    strategy_recommendation:
      "Consolidate new position. Allow a 2–3 lap gap before assessing next overtaking opportunity. Manage tyre usage carefully now that track position is improved.",
    reasoning:
      "Lap time of 1:33.153 confirms Carlos is in full attack mode with DRS advantage translating into a position gain. Hard tyres at Lap 11 age are performing excellently. Priority now shifts to consolidating the gain and managing the pace to protect tyre life for the remainder of the race.",
    radio_message:
      "POSITION GAINED! Well done Carlos, great move. Now consolidate — back off slightly, protect those tyres. Next target is being assessed. Brilliant racing.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S14",
    lap: 14,
    event:
      "Lap 14 — Lap time 1:32.717. Tyre age 12.0. Carlos continuing to set impressive lap times. Gap to next car ahead is 4.5 seconds. Hard tyres showing no signs of significant degradation.",
    strategy_recommendation:
      "Maintain controlled pace. Hard tyres are performing beyond expectation. Project tyre life through to Lap 35–38 at current degradation rate. One-stop strategy remains viable.",
    reasoning:
      "Lap time of 1:32.717 is the quickest of the race, achieved on 12-lap-old Hard tyres. Degradation rate is extremely low. One-stop strategy is looking increasingly strong. The 4.5-second gap ahead suggests the next overtake will require patience or a strategic undercut via pit stop timing.",
    radio_message:
      "Carlos, 1:32.7 — that's the fastest lap of the race. Tyres are in great shape. One stop is looking very strong. Hold this pace, we'll plan the next move carefully. You're flying.",
    pit_crew_state: "Monitoring",
  },
  {
    scenario_id: "AUS_2026_S15",
    lap: 15,
    event:
      "Lap 15 — Lap time 1:32.733. Tyre age 13.0. Pace virtually identical to Lap 14. Degradation curve is flat — exceptional tyre management from Carlos. Race is stabilising.",
    strategy_recommendation:
      "Continue current strategy. One-stop race plan confirmed. Next pit window projected at Lap 35–40 depending on Safety Car and competitor strategy. Maintain position and preserve tyre life.",
    reasoning:
      "Lap 15 time of 1:32.733 is within 0.016 seconds of Lap 14, confirming a completely flat degradation curve on the Hard compound. This is exceptional and validates the one-stop strategy. At this rate, tyres can comfortably run to Lap 38–40. Strategic focus now shifts to monitoring competitor pit windows and Safety Car risk.",
    radio_message:
      "Carlos, another 1:32 — outstanding tyre management. One stop confirmed. We're targeting Lap 35 to 40 for your final stop depending on the race. Stay consistent, stay clean. You're in great shape.",
    pit_crew_state: "Monitoring",
  },
];

const TOTAL_LAPS = LAP_SCENARIOS.length;

/** Single "race ended" scenario returned after the final lap. No repetition of previous laps. */
const RACE_ENDED_SCENARIO: StrategyResponse = {
  scenario_id: "AUS_2026_race-ended",
  lap: TOTAL_LAPS,
  event: "Race complete — chequered flag",
  strategy_recommendation: "Race finished",
  reasoning:
    "The race has ended. No further strategy decisions. Final classification will follow.",
  radio_message:
    "Chequered flag. Race complete. Great drive. No further updates.",
  pit_crew_state: "Monitoring",
};

let mockLapIndex = 0;

/**
 * Returns the next mock scenario in chronological order (lap 1 → final lap).
 * After the final lap, always returns the same "race ended" scenario with no repetition.
 */
export function getMockStrategy(): Promise<StrategyResponse> {
  return new Promise((resolve) => {
    let result: StrategyResponse;
    if (mockLapIndex < LAP_SCENARIOS.length) {
      result = { ...LAP_SCENARIOS[mockLapIndex] };
      mockLapIndex += 1;
    } else {
      result = { ...RACE_ENDED_SCENARIO };
    }
    setTimeout(() => resolve(result), 400);
  });
}

/**
 * Resets mock state (e.g. when starting a new simulation).
 * Called by the store when starting so each run begins at lap 1.
 */
export function resetMockSimulation(): void {
  mockLapIndex = 0;
}

/**
 * Returns a mock scenario with a specific pit crew state (for testing UI).
 */
export function getMockStrategyWithState(
  pit_crew_state: PitCrewState
): Promise<StrategyResponse> {
  const base = LAP_SCENARIOS[0];
  return Promise.resolve({
    ...base,
    scenario_id: `mock-${Date.now()}`,
    pit_crew_state,
  });
}

export const MOCK_SCENARIOS = LAP_SCENARIOS;
