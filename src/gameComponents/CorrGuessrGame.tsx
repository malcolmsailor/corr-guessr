import { useEffect, useContext, useRef, useState } from "react";
import { MainCard } from "../sharedComponents/MainCard";
import { Header } from "../sharedComponents/Header";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { BarPlot } from "../sharedComponents/BarPlot";
import { GuessrGameContext } from "../shared/gameContext";
import { getData } from "../game-logic";
import { AnswerArea } from "./AnswerArea";
import { Flash } from "./Flash";
import { ProgressTimer } from "./ProgressTimer";
import { ScoreDisplay } from "./ScoreDisplay";
import { VictoryScreen } from "./VictoryScreen";
import { PauseScreen } from "./PauseScreen";
import { PauseToggle } from "./PauseToggle";
import { WelcomeWindow } from "./WelcomeWindow";
import { BarPlotHeader } from "./BarPlotHeader";

export const CorrGuessrGame = () => {
  const { settings, appState, setAppState, setData } =
    useContext(GuessrGameContext);

  const theme = useTheme();

  const mainPanelHeight = "400px";

  useEffect(() => {
    setData(getData(settings, appState.targetR, theme.colorPairs));
  }, [settings]);

  const [showLevelUp, setShowLevelUp] = useState(false);
  useEffect(() => {
    setShowLevelUp(true);
    setTimeout(() => {
      setShowLevelUp(false);
    }, 1000);
  }, [appState.level]);

  const containerRef = useRef<HTMLDivElement>(null);
  var content = null;
  if (appState.welcome) {
    content = <WelcomeWindow />;
  } else if (appState.paused) {
    content = <PauseScreen />;
  } else if (appState.victory) {
    content = <VictoryScreen />;
  } else {
    content = (
      <>
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <BarPlotHeader />
        </Grid>
        <Grid
          size={12}
          sx={{
            height: mainPanelHeight,
            position: "relative",
          }}
        >
          <BarPlot context={GuessrGameContext} />
          {showLevelUp && (
            <Typography
              variant="h1"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: "#ffffff",
                fontWeight: "bold",
                zIndex: 1000,
                textShadow: "0px 0px 64px rgba(0,0,0,1.0)",
                opacity: showLevelUp ? 1 : 0,
                animation: "shrink 1s linear forwards",
                "@keyframes shrink": {
                  "0%": { transform: "translate(-50%, -50%) scale(1)" },
                  "100%": { transform: "translate(-50%, -50%) scale(0)" },
                },
              }}
            >
              Level {appState.level + 1}
            </Typography>
          )}
        </Grid>
        <Grid size={12}>
          <AnswerArea />
        </Grid>
        <Grid size={12}>
          <ProgressTimer
            key={appState.questionID}
            totalTimeInSeconds={appState.levelParams.timePerTurnInSeconds}
          />
        </Grid>
        <Grid size={12}>
          <ScoreDisplay score={appState.score} level={appState.level} />
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() =>
              setAppState({ ...appState, gameID: appState.gameID + 1 })
            }
          >
            New Game
          </Button>
        </Grid>
      </>
    );
  }
  return (
    <MainCard containerRef={containerRef}>
      <Flash>
        <Grid container>
          <Grid size={12}>
            <Header leftComponent={<PauseToggle />} />
          </Grid>
          {content}
        </Grid>
      </Flash>
    </MainCard>
  );
};
