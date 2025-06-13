import { Pause, PlayArrow } from "@mui/icons-material";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";

import { Tooltip } from "@mui/material";
import { useContext } from "react";
import { GuessrGameContext } from "../shared/gameContext";

export const PauseToggle = () => {
  const { appState, setAppState } = useContext(GuessrGameContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Tooltip title="Pause">
      <IconButton
        onClick={() =>
          setAppState({ ...appState, paused: !appState.paused, welcome: false })
        }
      >
        {appState.paused ? (
          <PlayArrow
            sx={{ fontSize: isXs ? 20 : 30, color: theme.palette.text.primary }}
          />
        ) : (
          <Pause
            sx={{ fontSize: isXs ? 20 : 30, color: theme.palette.text.primary }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};
