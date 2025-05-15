import { responsiveFontSizes, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    colorPairs: [string, string][];
  }

  interface ThemeOptions {
    colorPairs: [string, string][];
  }
}

export const theme = responsiveFontSizes(
  createTheme({ palette: { mode: "light" }, colorPairs: [] })
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
