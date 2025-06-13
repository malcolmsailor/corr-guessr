import { GuessrContext } from "../../shared/context";
import { useContext, useEffect } from "react";
import { Button, useTheme } from "@mui/material";
import { updateData } from "../../game-logic";
import { getCorrelation } from "../../utils/math";
import { features } from "../../shared/types";

export const NextButton = ({
  guessInputRef: guessInputRef,
  nextButtonRef: nextButtonRef,
}: {
  guessInputRef: React.RefObject<HTMLInputElement | null>;
  nextButtonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const {
    appState,
    settings,
    data,
    setData,
    setAppState,
    errors,
    setErrors,
    corrs,
    setCorrs,
    featureHistory,
    setFeatureHistory,
    randomizeFeatures,
  } = useContext(GuessrContext);

  const theme = useTheme();
  const error = data.r - appState.guess;
  useEffect(() => {
    setErrors([...errors, error]);
    setCorrs([...corrs, data.r]);
    const featureIndices = [
      features.indexOf(appState.feature1),
      features.indexOf(appState.feature2),
    ];
    featureIndices.sort((a, b) => a - b);
    setFeatureHistory([...featureHistory, featureIndices.join("_")]);
  }, [error]);

  return (
    <Button
      ref={nextButtonRef}
      variant="contained"
      color="primary"
      onClick={() => {
        const newTargetR = getCorrelation();
        updateData(
          settings,
          appState,
          setAppState,
          setData,
          theme,
          randomizeFeatures,
          {
            guessActive: true,
            targetR: newTargetR,
          }
        );
        setTimeout(() => {
          guessInputRef.current?.focus();
        }, 0);
      }}
    >
      Next
    </Button>
  );
};
