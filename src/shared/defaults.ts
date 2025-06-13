import type { BarPlotType, Feature, GameLevelParams } from "./types";

export const DEFAULT_N = 25;
export const DEFAULT_DISTRIBUTION = "uniform";
export const DEFAULT_FEATURE1 = "color";
export const DEFAULT_FEATURE2 = "bar-height";
export const DEFAULT_BAR_PLOT_TYPE = "bidirectional";
export const DEFAULT_ERROR_PLOT_TYPE = "absolute";
export const FEATURE_MAPPING = {
  color: "Color",
  "bar-height": "Bar Height",
  opacity: "Opacity",
  "bar-offset": "Bar Offset",
  "bar-width": "Bar Width",
};

export const DEFAULT_SCORE_INCREMENT = 100;
export const DEFAULT_LEVEL_INCREMENT = DEFAULT_SCORE_INCREMENT * 3;

export const PROGRESS_BAR_BOUND1 = 1.0;
export const PROGRESS_BAR_BOUND2 = 2.0;

const BOUNDS = [
  {
    lowLowerBound: 0,
    lowUpperBound: 0.2,
    highLowerBound: 0.8,
    highUpperBound: 1,
  },

  {
    lowLowerBound: 0.2,
    lowUpperBound: 0.3,
    highLowerBound: 0.7,
    highUpperBound: 0.8,
  },
  {
    lowLowerBound: 0.3,
    lowUpperBound: 0.4,
    highLowerBound: 0.6,
    highUpperBound: 0.7,
  },
  {
    lowLowerBound: 0.35,
    lowUpperBound: 0.45,
    highLowerBound: 0.55,
    highUpperBound: 0.65,
  },
  {
    lowLowerBound: 0.4,
    lowUpperBound: 0.45,
    highLowerBound: 0.55,
    highUpperBound: 0.6,
  },
];

const FEATURE_PAIRS = [
  ["bar-height", "color"],
  ["bar-height", "bar-width"],
  ["bar-height", "color", "unidirectional"],
  ["bar-offset", "opacity"],
  ["bar-width", "color"],
  ["bar-offset", "bar-width"],
];

export const GAME_LEVELS: GameLevelParams[] = [];

export const INTRO_TIME_PER_TURN_IN_SECONDS = 20;
const TIME_PER_TURN_IN_SECONDS = 5;

for (const featurePair of FEATURE_PAIRS) {
  const feature1 = featurePair[0] as Feature;
  const feature2 = featurePair[1] as Feature;
  let barPlotType: BarPlotType = DEFAULT_BAR_PLOT_TYPE;
  if (featurePair.length === 3) {
    barPlotType = featurePair[2] as BarPlotType;
  }
  GAME_LEVELS.push({
    ...BOUNDS[0],
    feature1,
    feature2,
    barPlotType,
    timePerTurnInSeconds: INTRO_TIME_PER_TURN_IN_SECONDS,
  });
}

for (const bound of BOUNDS) {
  for (const featurePair of FEATURE_PAIRS) {
    const feature1 = featurePair[0] as Feature;
    const feature2 = featurePair[1] as Feature;
    let barPlotType: BarPlotType = DEFAULT_BAR_PLOT_TYPE;
    if (featurePair.length === 3) {
      barPlotType = featurePair[2] as BarPlotType;
    }
    GAME_LEVELS.push({
      ...bound,
      feature1,
      feature2,
      barPlotType,
      timePerTurnInSeconds: TIME_PER_TURN_IN_SECONDS,
    });
  }
}

export const NUM_LEVELS = GAME_LEVELS.length;
