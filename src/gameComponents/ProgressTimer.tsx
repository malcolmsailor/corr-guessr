import { Box, LinearProgress } from "@mui/material";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { getColor } from "../shared/colors";
import { GuessrGameContext } from "../shared/gameContext";
import { PROGRESS_BAR_BOUND1, PROGRESS_BAR_BOUND2 } from "../shared/defaults";

export const ProgressTimer = ({
  totalTimeInSeconds,
}: {
  totalTimeInSeconds: number;
}) => {
  const { appState } = useContext(GuessrGameContext);

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", position: "relative", padding: 1 }}>
      <LinearProgress
        variant="determinate"
        value={(appState.timeRemaining / totalTimeInSeconds) * 100}
        sx={{
          height: 8,
          "& .MuiLinearProgress-bar": {
            background: getColor(
              PROGRESS_BAR_BOUND1,
              PROGRESS_BAR_BOUND2,
              theme.palette.error.light,
              theme.palette.success.light,
              appState.timeRemaining
            ),
          },
        }}
      />
    </Box>
  );
};
