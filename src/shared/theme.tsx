import { responsiveFontSizes, createTheme } from "@mui/material";
import {
  blue,
  red,
  green,
  purple,
  orange,
  teal,
  pink,
  amber,
} from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Theme {
    colorPairs: [string, string][];
    chartColors: string[];
  }

  interface ThemeOptions {
    colorPairs: [string, string][];
    chartColors: string[];
  }
}

export const theme = responsiveFontSizes(
  createTheme({
    palette: { mode: "light" },
    colorPairs: [],
    chartColors: [
      blue[500],
      red[500],
      green[500],
      purple[500],
      orange[500],
      teal[500],
      pink[500],
      amber[500],
    ],
  })
);

// secondary.main + error.main has insufficient contrast
// theme.colorPairs.push([theme.palette.secondary.main, theme.palette.error.main]);

// success.main + secondary.main is ugly
// theme.colorPairs.push([
//   theme.palette.success.main,
//   theme.palette.secondary.main,
// ]);

// Insufficient contrast
// theme.colorPairs.push([theme.palette.warning.main, theme.palette.error.main]);

theme.colorPairs.push([theme.palette.error.main, theme.palette.primary.main]);
theme.colorPairs.push([
  theme.palette.primary.main,
  theme.palette.secondary.main,
]);
theme.colorPairs.push([theme.palette.warning.main, theme.palette.primary.main]);
theme.colorPairs.push([
  theme.palette.warning.main,
  theme.palette.secondary.main,
]);
theme.colorPairs.push([theme.palette.primary.main, theme.palette.success.main]);
