import { Grid } from "@mui/material";
import { NUM_LEVELS } from "../shared/defaults";

export const ScoreDisplay = ({
  score,
  level,
}: {
  score: number;
  level: number;
}) => {
  return (
    <Grid container>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        Score: {score}
      </Grid>
      <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
        Level: {level + 1}/{NUM_LEVELS}
      </Grid>
    </Grid>
  );
};
