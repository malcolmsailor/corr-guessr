import { GuessrContext } from "../shared/context";

import { useContext, useRef, useState } from "react";

import { updateData } from "../game-logic";

import { useEffect } from "react";
import { BarPlot } from "../sharedComponents/BarPlot";
import { Drawer, Grid, useTheme, Grow } from "@mui/material";
import { Header } from "../sharedComponents/Header";
import { SettingsWindow } from "./SettingsWindow";
import { InputArea } from "./InputArea";
import { ResultsPanel } from "./ResultsPanel";
import { ErrorPanel } from "./ErrorPanel";
import { MainCard } from "../sharedComponents/MainCard";
import { SettingsToggle } from "./SettingsToggle";

export const CorrGuessr = () => {
  const {
    settings,
    appState,
    setData,
    settingsOpen,
    setSettingsOpen,
    setAppState,
    randomizeFeatures,
  } = useContext(GuessrContext);

  const theme = useTheme();

  const [showResultsPanel, setShowResultsPanel] = useState(
    !appState.guessActive
  );
  const mainPanelHeight = "400px";

  useEffect(() => {
    updateData(
      settings,
      appState,
      setAppState,
      setData,
      theme,
      randomizeFeatures,
      {
        guessActive: true,
      }
    );
    setShowResultsPanel(false);
  }, [settings]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <MainCard containerRef={containerRef}>
      <Grid container>
        <Grid size={12}>
          <Header leftComponent={<SettingsToggle />} />
        </Grid>
        <Grid
          size={appState.guessActive ? 12 : { xs: 7, sm: 7, md: 8 }}
          sx={{
            height: mainPanelHeight,
            transition: "all 0.25s ease-in-out",
          }}
          onTransitionEnd={() => {
            if (!appState.guessActive) {
              setShowResultsPanel(true);
            }
          }}
          onTransitionStart={() => {
            if (appState.guessActive) {
              setShowResultsPanel(false);
            }
          }}
        >
          <BarPlot context={GuessrContext} />
        </Grid>

        <Grow in={showResultsPanel} timeout={250}>
          <Grid
            size={!showResultsPanel ? 0 : { xs: 5, sm: 5, md: 4 }}
            sx={{
              height: mainPanelHeight,
              opacity: !showResultsPanel ? 0 : 1,
            }}
          >
            {showResultsPanel && <ResultsPanel />}
          </Grid>
        </Grow>
        <Grid
          size={12}
          sx={{
            textAlign: "center",
            height: "100px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InputArea />
        </Grid>
        <Grid size={12}>
          <ErrorPanel />
        </Grid>
      </Grid>
      <Drawer
        anchor="left"
        open={settingsOpen}
        onClose={() => {
          setSettingsOpen(false);
          setAppState({
            ...appState,
            guessActive: true,
          });
        }}
        container={containerRef.current}
        ModalProps={{
          container: containerRef.current,
        }}
        sx={{
          position: "absolute",
          "& .MuiPaper-root": { position: "absolute" },
        }}
      >
        <SettingsWindow />
      </Drawer>
    </MainCard>
  );
};
