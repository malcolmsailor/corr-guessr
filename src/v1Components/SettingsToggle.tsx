import { IconButton, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { useContext } from "react";
import { GuessrContext } from "../shared/context";

export const SettingsToggle = () => {
  const { settingsOpen, setSettingsOpen } = useContext(GuessrContext);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Tooltip title="Settings">
      <IconButton
        onClick={() => setSettingsOpen(!settingsOpen)}
        sx={{ padding: 0.5 }}
      >
        <Settings
          sx={{
            fontSize: isXs ? 20 : 30,
            color: theme.palette.text.primary,
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
