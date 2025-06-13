import { Box, Button, Typography } from "@mui/material";
import { GuessrGameContext } from "../shared/gameContext";
import { useContext } from "react";

export const VictoryScreen = () => {
  const { appState, setAppState } = useContext(GuessrGameContext);

  const onPress = () => {
    setAppState({ ...appState, gameID: appState.gameID + 1 });
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Congratulations, you won!
      </Typography>
      <Button onClick={onPress}>Play again</Button>
    </Box>
  );
};
