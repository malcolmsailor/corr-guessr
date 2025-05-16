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

// Create a breakpoints-only theme
const breakpointsTheme = createTheme();
const { breakpoints } = breakpointsTheme;

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiTypography: {
        styleOverrides: {
          body1: {
            [breakpoints.down("md")]: {
              fontSize: "0.9rem",
            },
            [breakpoints.down("sm")]: {
              fontSize: "0.8rem",
            },
          },
          h3: {
            [breakpoints.down("md")]: {
              fontSize: "1.75rem",
            },
            [breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
          },
          h4: {
            [breakpoints.down("md")]: {
              fontSize: "1.5rem",
            },
            [breakpoints.down("sm")]: {
              fontSize: "1.25rem",
            },
          },
          h6: {
            [breakpoints.down("md")]: {
              fontSize: "1.0rem",
            },
            [breakpoints.down("sm")]: {
              fontSize: "0.8rem",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            [breakpoints.down("sm")]: {
              fontSize: "0.65rem",
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            [breakpoints.down("md")]: {
              fontSize: "0.8rem",
            },
            [breakpoints.down("sm")]: {
              fontSize: "0.65rem",
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: "0.875rem",
            [breakpoints.down("sm")]: {
              fontSize: "0.75rem",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            [breakpoints.down("sm")]: {
              fontSize: "0.75rem",
            },
          },
        },
      },
    },
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
