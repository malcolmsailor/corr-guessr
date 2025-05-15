import {
  Divider,
  IconButton,
  Tooltip,
  Link,
  Typography,
  useTheme,
} from "@mui/material";

import { Grid } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { GuessrContext } from "../shared/context";
import { useContext } from "react";

import githubMark from "../assets/github-mark.svg";

export const Header = () => {
  const { settingsOpen, setSettingsOpen } = useContext(GuessrContext);
  const theme = useTheme();
  return (
    <>
      <Grid container>
        <Grid
          size={1}
          sx={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Tooltip title="Settings">
            <IconButton
              onClick={() => setSettingsOpen(!settingsOpen)}
              sx={{ padding: 0.5 }}
            >
              <Settings
                sx={{ fontSize: 30, color: theme.palette.text.primary }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid size={10} sx={{ textAlign: "center", paddingY: 2 }}>
          <Typography variant="h3">Correlation Guessr</Typography>
        </Grid>
        <Grid
          size={1}
          sx={{
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Link href="https://github.com/malcolmsailor/corr-guessr">
            <Tooltip title="GitHub">
              <img
                src={githubMark}
                alt="GitHub"
                style={{ width: "32px", height: "32px" }}
              />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
};
