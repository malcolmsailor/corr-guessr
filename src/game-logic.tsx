import { getRandomColorPair } from "./shared/colors";
import {
  features,
  type AppState,
  type Correctness,
  type DataState,
  type GameState,
  type SettingsState,
} from "./shared/types";
import {
  getCorrelatedVectors,
  calculateCorrelation,
  sample,
} from "./utils/math";
import type { Theme } from "@mui/material";
import { getGameCorrelation } from "./utils/math";
import {
  DEFAULT_LEVEL_INCREMENT,
  DEFAULT_SCORE_INCREMENT,
  GAME_LEVELS,
} from "./shared/defaults";

export const getData = (
  settings: SettingsState,
  targetR: number,
  colorPairs: [string, string][]
): DataState => {
  const { n, distribution } = settings;
  const { a, b } = getCorrelatedVectors(targetR, n, distribution);
  const r = calculateCorrelation(a, b);
  const [color1, color2] = getRandomColorPair(colorPairs);
  if (r < 0) {
    const negB = b.map((bVal) => -bVal);
    return { a, b: negB, r: -r, color1, color2 };
  }
  return { a, b, r, color1, color2 };
};

export const updateData = (
  settings: SettingsState,
  appState: AppState,
  setAppState: (appState: AppState) => void,
  setData: (data: DataState) => void,
  theme: Theme,
  randomizeFeatures: boolean,
  updatedAppState: Partial<AppState> = {}
) => {
  if (randomizeFeatures) {
    const newFeatures = sample(features, 2);
    setAppState({
      ...appState,
      ...updatedAppState,
      feature1: newFeatures[0],
      feature2: newFeatures[1],
    });
  } else {
    setAppState({
      ...appState,
      ...updatedAppState,
      feature1: settings.feature1,
      feature2: settings.feature2,
    });
  }
  setData(getData(settings, appState.targetR, theme.colorPairs));
};

export const newTurn = (
  correct: Correctness,
  appState: GameState,
  settings: SettingsState,
  theme: Theme,
  setData: (data: DataState) => void,
  setAppState: (appState: GameState) => void
) => {
  const newScore =
    correct === "correct"
      ? appState.score + DEFAULT_SCORE_INCREMENT
      : Math.max(0, appState.score - DEFAULT_SCORE_INCREMENT);
  const newLevel = scoreToLevel(
    appState.level,
    newScore,
    DEFAULT_LEVEL_INCREMENT
  );
  const victory = newLevel >= GAME_LEVELS.length;
  if (victory) {
    setAppState({
      ...appState,
      victory,
    });
    return;
  }
  const [targetR, RLabel] = getGameCorrelation(GAME_LEVELS[newLevel]);
  setData(getData(settings, targetR, theme.colorPairs));
  setAppState({
    ...appState,
    targetR,
    RLabel,
    correct,
    score: newScore,
    level: newLevel,
    levelParams: GAME_LEVELS[newLevel],
    feature1: GAME_LEVELS[newLevel].feature1,
    feature2: GAME_LEVELS[newLevel].feature2,
    barPlotType: GAME_LEVELS[newLevel].barPlotType || settings.barPlotType,
    timeRemaining: GAME_LEVELS[newLevel].timePerTurnInSeconds,
  });
};

export const scoreToLevel = (
  currentLevel: number,
  score: number,
  levelIncrement: number
) => {
  const level = Math.max(currentLevel, Math.floor(score / levelIncrement));
  return level;
};
