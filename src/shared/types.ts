export const distributionTypes = ["normal", "uniform"] as const;
export type Distribution = (typeof distributionTypes)[number];

export const barPlotTypes = ["unidirectional", "bidirectional"] as const;
export type BarPlotType = (typeof barPlotTypes)[number];

export const errorPlotTypes = ["absolute", "signed"] as const;
export type ErrorPlotType = (typeof errorPlotTypes)[number];

export const features = [
  "bar-height",
  "color",
  "opacity",
  "bar-offset",
  "bar-width",
] as const;
export type Feature = (typeof features)[number];

export interface SettingsState {
  n: number;
  distribution: Distribution;
  barPlotType: BarPlotType;
  feature1: Feature;
  feature2: Feature;
  errorPlotType: ErrorPlotType;
}

export interface DataState {
  a: number[];
  b: number[];
  r: number;
  color1: string;
  color2: string;
}

export interface DataContextType {
  data: DataState;
  setData: (data: DataState) => void;
}

export interface AppState {
  targetR: number;
  guess: number;
  guessActive: boolean;
  // When features are randomized, if we modify SettingsState, we get into an infinite
  // loop. Thus we store the features in appstate and actually use these ones for
  // making the plot.
  feature1: Feature;
  feature2: Feature;
}

export interface GuessrContextType {
  settings: SettingsState;
  setSettings: (settings: SettingsState) => void;
  appState: AppState;
  setAppState: (appState: AppState) => void;
  data: DataState;
  setData: (data: DataState) => void;
  settingsOpen: boolean;
  setSettingsOpen: (settingsOpen: boolean) => void;
  errorPlotType: ErrorPlotType;
  setErrorPlotType: (errorPlotType: ErrorPlotType) => void;
  errors: number[];
  setErrors: (errors: number[]) => void;
  corrs: number[];
  setCorrs: (corrs: number[]) => void;
  featureHistory: string[];
  setFeatureHistory: (featureHistory: string[]) => void;
  randomizeFeatures: boolean;
  setRandomizeFeatures: (randomizeFeatures: boolean) => void;
}

export type GameLevelParams = {
  lowLowerBound: number;
  lowUpperBound: number;
  highLowerBound: number;
  highUpperBound: number;
  feature1: Feature;
  feature2: Feature;
  timePerTurnInSeconds: number;
  barPlotType?: BarPlotType;
};

export type Correctness = "na" | "correct" | "incorrect";

export type CorrelationType = "low" | "high";

export type UserAnswer = "low" | "high" | "timeout" | "na";
export interface GameState extends AppState {
  RLabel: CorrelationType;
  userAnswer: UserAnswer;
  level: number;
  score: number;
  welcome: boolean;
  victory: boolean;
  levelParams: GameLevelParams;
  correct: Correctness;
  questionID: number;
  progressBarIncrementInSeconds: number;
  gameID: number;
  paused: boolean;
  timeRemaining: number;
  barPlotType: BarPlotType;
}

export interface GuessrGameContextType {
  appState: GameState;
  setAppState: (appState: GameState) => void;
  data: DataState;
  setData: (data: DataState) => void;
  settings: SettingsState;
  setSettings: (settings: SettingsState) => void;
}
