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
  errors: number[];
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
}
