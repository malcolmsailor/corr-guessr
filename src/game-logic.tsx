import { getRandomColorPair } from "./shared/colors";
import {
  features,
  type AppState,
  type DataState,
  type SettingsState,
} from "./shared/types";
import {
  getCorrelatedVectors,
  calculateCorrelation,
  sample,
} from "./utils/math";
import type { Theme } from "@mui/material";

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
