import {
  Divider,
  Tooltip,
  Link,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Grid } from "@mui/material";

import githubMark from "../assets/github-mark.svg";

export const Header = ({
  leftComponent,
}: {
  leftComponent: React.ReactNode;
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

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
          {leftComponent}
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
                style={{ width: isXs ? 20 : 32, height: isXs ? 20 : 32 }}
              />
            </Tooltip>
          </Link>
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  );
};
