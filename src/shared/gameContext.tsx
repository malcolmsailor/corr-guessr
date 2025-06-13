import { createContext, useEffect, useState } from "react";
import type {
  DataState,
  GameState,
  GuessrGameContextType,
  SettingsState,
} from "./types";
import { getGameCorrelation } from "../utils/math";
import {
  DEFAULT_ERROR_PLOT_TYPE,
  DEFAULT_BAR_PLOT_TYPE,
  DEFAULT_DISTRIBUTION,
  DEFAULT_N,
  GAME_LEVELS,
  DEFAULT_FEATURE2,
  DEFAULT_FEATURE1,
} from "./defaults";
import { useTheme } from "@mui/material";
import { getData, newTurn } from "../game-logic";

export const GuessrGameContext = createContext<GuessrGameContextType>(
  {} as GuessrGameContextType
);

const SETTINGS_INITIAL_STATE: SettingsState = {
  n: DEFAULT_N,
  distribution: DEFAULT_DISTRIBUTION,
  barPlotType: DEFAULT_BAR_PLOT_TYPE,
  feature1: DEFAULT_FEATURE1,
  feature2: DEFAULT_FEATURE2,
  errorPlotType: DEFAULT_ERROR_PLOT_TYPE,
};

const APP_STATE_INITIAL_STATE: Partial<GameState> = {
  guess: 0,
  guessActive: false,
  userAnswer: "na",
  victory: false,
  correct: "na",
  level: 0,
  score: 0,
  levelParams: GAME_LEVELS[0],
  feature1: DEFAULT_FEATURE1,
  feature2: DEFAULT_FEATURE2,
  questionID: 0,
  progressBarIncrementInSeconds: 0.1,
  barPlotType: GAME_LEVELS[0].barPlotType || DEFAULT_BAR_PLOT_TYPE,
  timeRemaining: GAME_LEVELS[0].timePerTurnInSeconds,
};

const getInitialAppState = (gameID: number) => {
  const [targetR, RLabel] = getGameCorrelation(GAME_LEVELS[0]);
  return {
    ...APP_STATE_INITIAL_STATE,
    targetR,
    RLabel,
    gameID: gameID,
  } as GameState;
};

export function GuessrGameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();

  const [settings, setSettings] = useState<SettingsState>(
    SETTINGS_INITIAL_STATE
  );

  const [appState, setAppState] = useState<GameState>(() => {
    return {
      ...getInitialAppState(0),
      welcome: true,
      paused: true,
    } as GameState;
  });

  const [data, setData] = useState<DataState>(() =>
    getData(settings, appState.targetR, theme.colorPairs)
  );

  useEffect(() => {
    if (appState.userAnswer === "na") return;
    const correct =
      appState.userAnswer === appState.RLabel ? "correct" : "incorrect";
    newTurn(correct, appState, settings, theme, setData, setAppState);
  }, [settings, appState.questionID]);

  useEffect(() => {
    if (appState.gameID === 0) return;
    setAppState({
      ...getInitialAppState(appState.gameID),
      welcome: false,
      paused: false,
    });
  }, [appState.gameID]);

  useEffect(() => {
    if (appState.timeRemaining <= 0) {
      setAppState({
        ...appState,
        userAnswer: "timeout",
        questionID: appState.questionID + 1,
        timeRemaining: appState.levelParams.timePerTurnInSeconds,
      });
      return;
    }

    const delay = 100;
    const interval = setInterval(() => {
      setAppState((prevState) => {
        if (prevState.paused || prevState.victory || prevState.welcome)
          return prevState;
        return {
          ...prevState,
          timeRemaining: Math.max(0, prevState.timeRemaining - delay / 1000),
        };
      });
    }, delay);

    return () => clearInterval(interval);
  }, [appState.timeRemaining]);
  // useEffect(() => {}, [appState.paused]);

  return (
    <GuessrGameContext.Provider
      value={{
        appState,
        setAppState,
        data,
        setData,
        settings,
        setSettings,
      }}
    >
      {children}
    </GuessrGameContext.Provider>
  );
}
