import { Box, Typography } from "@mui/material";

export const PauseScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingX: 4,
      }}
    >
      <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
        In this game, your task is to guess whether the correlation between two
        features is "high" or "low". For example, do the bars tend to be tall at
        the same time as they tend to be a certain color?
      </Typography>
      <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
        As the game goes on, the difference between "high" and "low"
        correlations gets smaller.
      </Typography>
      <Typography sx={{ textAlign: "center", marginBottom: 2 }}>
        There is another version of this game, where you can guess the exact
        correlation, rather than simply high or low, and you are not under time
        pressure. It can be found{" "}
        <a href="https://malcolmsailor.com/static_pages/corrGuessr.html">
          here
        </a>
        .
      </Typography>
    </Box>
  );
};
