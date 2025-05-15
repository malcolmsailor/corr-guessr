import { formatR } from "../../shared/formatting";

import { Typography } from "@mui/material";

import { Grid } from "@mui/material";

import { Box } from "@mui/material";
import { GuessrContext } from "../../shared/context";
import { useContext } from "react";

export const Results = () => {
  const { data, appState } = useContext(GuessrContext);
  const error = data.r - appState.guess;
  return (
    <Box sx={{ textAlign: "center" }}>
      <Grid container spacing={0} justifyContent="center">
        <Grid size={6} sx={{ textAlign: "right" }}>
          <Typography variant="h6">
            True <span style={{ fontStyle: "italic" }}>r</span>.
          </Typography>
        </Grid>
        <Grid size={6} sx={{ textAlign: "left", pl: 1 }}>
          <Typography variant="h6">= {formatR(data.r)}</Typography>
        </Grid>

        <Grid size={6} sx={{ textAlign: "right" }}>
          <Typography variant="h6">
            Guessed <span style={{ fontStyle: "italic" }}>r</span>.
          </Typography>
        </Grid>
        <Grid size={6} sx={{ textAlign: "left", pl: 1 }}>
          <Typography variant="h6">= {formatR(appState.guess)}</Typography>
        </Grid>

        <Grid size={6} sx={{ textAlign: "right" }}>
          <Typography variant="h6">Error</Typography>
        </Grid>
        <Grid size={6} sx={{ textAlign: "left", pl: 1 }}>
          <Typography variant="h6">= {formatR(error)}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
