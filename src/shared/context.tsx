import { createContext, useState } from "react";
import {
  DEFAULT_N,
  DEFAULT_DISTRIBUTION,
  DEFAULT_BAR_PLOT_TYPE,
  DEFAULT_ERROR_PLOT_TYPE,
} from "./defaults";
import {
  features,
  type DataState,
  type GuessrContextType,
  type SettingsState,
} from "./types";
import { getCorrelation, sample } from "../utils/math";
import type { AppState, ErrorPlotType, Feature } from "./types";
import { useTheme } from "@mui/material";
import { useLocalStorage } from "../utils/storage";

export const GuessrContext = createContext<GuessrContextType>(
  {} as GuessrContextType
);

export function GuessrContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialFeatures = sample(features, 2) as [Feature, Feature];

  // TODO: (Malcolm 2025-06-10) why does feature1 and feature2 need to be in settings
  //   AND in appState?
  // I think it's because the features in app state are ordinarily derived from settings
  // but when they are randomized, they need to be generated separately and stored there.
  const [settings, setSettings] = useState<SettingsState>({
    n: DEFAULT_N,
    distribution: DEFAULT_DISTRIBUTION,
    barPlotType: DEFAULT_BAR_PLOT_TYPE,
    feature1: initialFeatures[0],
    feature2: initialFeatures[1],
    errorPlotType: DEFAULT_ERROR_PLOT_TYPE,
  });

  const theme = useTheme();

  const [data, setData] = useState<DataState>({
    a: [],
    b: [],
    r: getCorrelation(),
    color1: theme.colorPairs[0][0],
    color2: theme.colorPairs[0][1],
  });

  const [appState, setAppState] = useState<AppState>({
    targetR: getCorrelation(),
    guess: 0,
    guessActive: true,
    feature1: initialFeatures[0],
    feature2: initialFeatures[1],
    // errors: [],
    // corrs: [],
  });

  const [errors, setErrors] = useLocalStorage<number[]>("errors", []);
  const [corrs, setCorrs] = useLocalStorage<number[]>("corrs", []);
  const [featureHistory, setFeatureHistory] = useLocalStorage<string[]>(
    "featureHistory",
    []
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [randomizeFeatures, setRandomizeFeatures] = useState(false);
  const [errorPlotType, setErrorPlotType] = useState<ErrorPlotType>(
    DEFAULT_ERROR_PLOT_TYPE
  );

  return (
    <GuessrContext.Provider
      value={{
        settings,
        setSettings,
        appState,
        setAppState,
        data,
        setData,
        settingsOpen,
        setSettingsOpen,
        errorPlotType,
        setErrorPlotType,
        errors,
        setErrors,
        corrs,
        setCorrs,
        featureHistory,
        setFeatureHistory,
        randomizeFeatures,
        setRandomizeFeatures,
      }}
    >
      {children}
    </GuessrContext.Provider>
  );
}
