import { GuessrContext } from "../../shared/context";
import { useContext, useEffect } from "react";
import { Button, useTheme } from "@mui/material";
import { getData } from "../../game-logic";
import { getCorrelation } from "../../utils/math";

export const NextButton = ({
  guessInputRef: guessInputRef,
  nextButtonRef: nextButtonRef,
}: {
  guessInputRef: React.RefObject<HTMLInputElement | null>;
  nextButtonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const { appState, settings, data, setData, setAppState } =
    useContext(GuessrContext);

  const theme = useTheme();
  const updateData = (): void => {
    setData(getData(settings, appState.targetR, theme.colorPairs));
  };
  const error = data.r - appState.guess;
  useEffect(() => {
    setAppState({
      ...appState,
      errors: [...appState.errors, error],
    });
  }, [error]);

  return (
    <Button
      ref={nextButtonRef}
      variant="contained"
      color="primary"
      onClick={() => {
        const newTargetR = getCorrelation();
        setAppState({
          ...appState,
          guessActive: true,
          targetR: newTargetR,
        });
        updateData();
        setTimeout(() => {
          guessInputRef.current?.focus();
        }, 0);
      }}
    >
      Next
    </Button>
  );
};
