import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { GuessrContextProvider } from "./shared/context";
import { theme } from "./shared/theme";
import { CorrGuessr } from "./components/CorrGuessr";
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GuessrContextProvider>
        <CssBaseline />
        <CorrGuessr />
      </GuessrContextProvider>
    </ThemeProvider>
  );
};
