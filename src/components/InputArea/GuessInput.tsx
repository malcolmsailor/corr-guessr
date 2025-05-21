import {
  TextField,
  useTheme,
  useMediaQuery,
  Grid,
  Button,
} from "@mui/material";
import { GuessrContext } from "../../shared/context";
import { useContext, useState } from "react";

export const GuessInput = ({
  guessInputRef: inputRef,
  nextButtonRef: nextButtonRef,
}: {
  guessInputRef: React.RefObject<HTMLInputElement | null>;
  nextButtonRef: React.RefObject<HTMLButtonElement | null>;
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const { appState, setAppState } = useContext(GuessrContext);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("0.");

  const handleSubmit = () => {
    if (value === "") {
      setError(true);
      return;
    }
    const numberValue = parseFloat(value);
    if (isNaN(numberValue)) {
      setError(true);
      return;
    }
    if (numberValue < 0 || numberValue > 1) {
      setError(true);
      return;
    }
    setAppState({ ...appState, guessActive: false, guess: numberValue });
    setError(false);
    setTimeout(() => {
      nextButtonRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const labelFeature1 = appState.feature1.replace("-", " ");
  const labelFeature2 = appState.feature2.replace("-", " ");
  let labelText = `Guess the correlation between ${labelFeature1} and ${labelFeature2}`;
  if (isXs) {
    labelText = `Correlation of ${labelFeature1} and ${labelFeature2}?`;
  }

  const textField = (
    <TextField
      onKeyDown={handleKeyDown}
      label={labelText}
      value={value}
      inputRef={inputRef}
      onChange={(event) => setValue(event.target.value)}
      variant="outlined"
      error={error}
      helperText={error ? "Enter a number between 0 and 1" : ""}
      fullWidth
      slotProps={{
        htmlInput: { inputMode: "decimal" },
      }}
    />
  );

  if (!isXs) {
    return textField;
  }
  return (
    <Grid container width="100%">
      <Grid size={8}>{textField}</Grid>
      <Grid
        size={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
