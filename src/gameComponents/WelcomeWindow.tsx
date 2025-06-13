import { Box, Grid, Typography, useTheme } from "@mui/material";
import { BarPlot } from "../sharedComponents/BarPlot";
import { GuessrGameContext } from "../shared/gameContext";

export const WelcomeWindow = () => {
  const mainPanelHeight = "400px";
  const theme = useTheme();
  return (
    <>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          height: mainPanelHeight,
        }}
      >
        <Box
          sx={{
            opacity: 0.5,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <BarPlot context={GuessrGameContext} />
        </Box>
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme.palette.background.default,
            outline: "2px solid",
            outlineColor: theme.palette.primary.dark,
            padding: "8px 16px",
            color: theme.palette.primary.dark,
            borderRadius: "32px",
            fontWeight: "bold",
            zIndex: 1000,
            textAlign: "center",
            opacity: 1.0,
          }}
        >
          Welcome!
        </Typography>
      </Grid>
      <Grid
        size={12}
        sx={{ display: "flex", justifyContent: "center", padding: 4 }}
      >
        <Box>
          <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
            In this game, your task is to guess whether the correlation between
            two features is "high" or "low". For example, do the bars tend to be
            tall at the same time as they tend to be a certain color?
          </Typography>
          <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
            When you're ready, press the play button in the top left corner.
          </Typography>
        </Box>
      </Grid>
    </>
  );
};
