import { GuessrContext } from "../shared/context";

import { useContext, useRef, useState } from "react";

import { updateData } from "../game-logic";

import { useEffect } from "react";
import { BarPlot } from "./BarPlot";
import {
  Drawer,
  Grid,
  useTheme,
  Grow,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { Header } from "./Header";
import { SettingsWindow } from "./SettingsWindow";
import { InputArea } from "./InputArea";
import { getCorrelatedVectors, getCorrelation } from "../utils/math";
import { ResultsPanel } from "./ResultsPanel";
import { ErrorPanel } from "./ErrorPanel";

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
  for (let i = 0; i < 20; i++) {
    const r = getCorrelation();
    getCorrelatedVectors(r, settings.n, settings.distribution);
  }

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
    <Container
      maxWidth="md"
      ref={containerRef}
      sx={{ position: "relative", marginTop: { xs: 1, sm: 2 } }}
    >
      <Card sx={{ marginBottom: 5 }}>
        <CardContent sx={{ marginBottom: -2, marginTop: -1 }}>
          <Grid container>
            <Grid size={12}>
              <Header />
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
              <BarPlot />
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
        </CardContent>
      </Card>
    </Container>
  );
};
