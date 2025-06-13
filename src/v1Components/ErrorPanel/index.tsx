import {
  Box,
  Button,
  Collapse,
  Divider,
  Grid,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ErrorGuessScatter } from "./ErrorGuessScatter";
import { useContext, useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { ErrorCorrelationScatter } from "./ErrorCorrelationScatter";
import { ErrorPanelFooter } from "./ErrorPanelFooter";
import { GuessrContext } from "../../shared/context";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} id={`vertical-tabpanel-${index}`} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ErrorPanel = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { featureHistory } = useContext(GuessrContext);
  const numUniqueFeatures = new Set(featureHistory).size;

  // We need to expand the plot box height to account for the legend when
  // there are lots of features.
  const plotBoxHeight = Math.max(180, numUniqueFeatures * 24);
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <>
      <Divider />
      <Grid
        container
        sx={{ borderBottom: open ? 1 : 0, borderColor: "divider" }}
      >
        <Grid size={{ xs: 6, sm: 7, md: 8 }}>
          {open ? (
            <Box>
              <Tabs
                value={tabIndex}
                onChange={(_event, newValue) => setTabIndex(newValue)}
                variant="fullWidth"
                centered
              >
                <Tab
                  label={isXsScreen ? "Guess" : "Guess number vs. error"}
                  {...a11yProps(0)}
                />
                <Tab
                  label={isXsScreen ? "Corr." : "Correlation vs. error"}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
          ) : null}
        </Grid>
        <Grid
          size={{ xs: 6, sm: 5, md: 4 }}
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Button onClick={() => setOpen(!open)}>
            {open ? "Hide error history" : "Show error history"}
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Button>
        </Grid>
      </Grid>

      <Collapse in={open}>
        <Box
          sx={{
            height: `${plotBoxHeight + 60}px`,
            width: "100%",
            marginTop: 1,
            marginBottom: -2,
          }}
        >
          <TabPanel value={tabIndex} index={0}>
            <Box
              sx={{
                height: `${plotBoxHeight}px`,
                width: "100%",
              }}
            >
              <ErrorGuessScatter />
            </Box>
            <ErrorPanelFooter />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Box
              sx={{
                height: `${plotBoxHeight}px`,
                width: "100%",
              }}
            >
              <ErrorCorrelationScatter />
            </Box>
            <ErrorPanelFooter />
          </TabPanel>
        </Box>
      </Collapse>
    </>
  );
};
