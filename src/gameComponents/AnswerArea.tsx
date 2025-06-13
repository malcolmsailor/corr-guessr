import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { GuessrGameContext } from "../shared/gameContext";

export const AnswerArea = () => {
  const { appState, setAppState } = useContext(GuessrGameContext);

  const lowButtonRef = useRef<HTMLButtonElement>(null);
  const highButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (label: "low" | "high") => {
    setAppState({
      ...appState,
      userAnswer: label,
      questionID: appState.questionID + 1,
      timeRemaining: appState.levelParams.timePerTurnInSeconds,
    });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "l") {
        lowButtonRef.current?.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true })
        );
        setTimeout(
          () =>
            lowButtonRef.current?.dispatchEvent(
              new MouseEvent("mouseup", { bubbles: true })
            ),
          100
        );
        handleClick("low");
      }
      if (event.key === "h") {
        highButtonRef.current?.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true })
        );
        setTimeout(
          () =>
            highButtonRef.current?.dispatchEvent(
              new MouseEvent("mouseup", { bubbles: true })
            ),
          100
        );
        handleClick("high");
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [appState]);

  return (
    <Grid container>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick("low")}
          ref={lowButtonRef}
        >
          <u>L</u>ow
        </Button>
      </Grid>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick("high")}
          ref={highButtonRef}
        >
          <u>H</u>igh
        </Button>
      </Grid>
    </Grid>
  );
};
