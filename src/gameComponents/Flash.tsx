import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { GuessrGameContext } from "../shared/gameContext";
import { alpha, useTheme } from "@mui/material/styles";

export const Flash = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const { appState } = useContext(GuessrGameContext);

  const [flashColor, setFlashColor] = useState<string>("");

  useEffect(() => {
    if (appState.userAnswer === "na") return;
    const correct =
      appState.userAnswer === appState.RLabel ? "correct" : "incorrect";
    setFlashColor(
      correct === "correct"
        ? alpha(theme.palette.success.light, 0.5)
        : alpha(theme.palette.error.light, 0.5)
    );
    setTimeout(() => setFlashColor(""), 300);
  }, [appState.questionID]);

  return (
    <Box
      sx={{
        backgroundColor: flashColor,
        transition: "background-color 0.05s linear",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};
