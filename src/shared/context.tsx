import { createContext, useState } from "react";
import {
  DEFAULT_N,
  DEFAULT_DISTRIBUTION,
  DEFAULT_BAR_PLOT_TYPE,
  DEFAULT_FEATURE1,
  DEFAULT_FEATURE2,
  DEFAULT_ERROR_PLOT_TYPE,
} from "./defaults";
import {
  type DataState,
  type GuessrContextType,
  type SettingsState,
} from "./types";
import { getCorrelation } from "../utils/math";
import type { AppState, ErrorPlotType } from "./types";
import { useTheme } from "@mui/material";

export const GuessrContext = createContext<GuessrContextType>(
  {} as GuessrContextType
);

export function GuessrContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SettingsState>({
    n: DEFAULT_N,
    distribution: DEFAULT_DISTRIBUTION,
    barPlotType: DEFAULT_BAR_PLOT_TYPE,
    feature1: DEFAULT_FEATURE1,
    feature2: DEFAULT_FEATURE2,
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
    errors: [],
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

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
      }}
    >
      {children}
    </GuessrContext.Provider>
  );
}
