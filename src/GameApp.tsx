import { GuessrGameContextProvider } from "./shared/gameContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./shared/theme";
import { CorrGuessrGame } from "./gameComponents/CorrGuessrGame";

export const GameApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <GuessrGameContextProvider>
        <CssBaseline />
        <CorrGuessrGame />
      </GuessrGameContextProvider>
    </ThemeProvider>
  );
};
