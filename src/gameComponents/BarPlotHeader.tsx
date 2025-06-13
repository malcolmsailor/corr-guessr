import { Typography } from "@mui/material";
import { useContext } from "react";
import { GuessrGameContext } from "../shared/gameContext";

export const BarPlotHeader = () => {
  const { appState } = useContext(GuessrGameContext);
  return (
    <Typography>
      <Typography component="span" sx={{ color: "primary.main" }}>
        {appState.feature1.replace("-", " ").toUpperCase()}
      </Typography>
      <Typography component="span"> vs. </Typography>
      <Typography component="span" sx={{ color: "primary.main" }}>
        {appState.feature2.replace("-", " ").toUpperCase()}
      </Typography>
    </Typography>
  );
};
