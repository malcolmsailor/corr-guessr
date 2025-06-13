import { Box, Grid } from "@mui/material";
import { ScatterPlot } from "./ScatterPlot";
import { Results } from "./Results";
export const ResultsPanel = () => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid
        size={12}
        sx={{
          height: "auto",
          width: "100%",
          aspectRatio: "1/1",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <ScatterPlot />
        </Box>
      </Grid>
      <Grid size={12}>
        <Results />
      </Grid>
    </Grid>
  );
};
