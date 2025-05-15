import {
  Box,
  Button,
  Collapse,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Grow,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ErrorPlot } from "./ErrorPlot";
import { useContext, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import { KeyboardArrowUp } from "@mui/icons-material";
import { errorPlotTypes } from "../../shared/types";
import { GuessrContext } from "../../shared/context";
export const ErrorPanel = () => {
  const [open, setOpen] = useState(false);
  const { errorPlotType, setErrorPlotType } = useContext(GuessrContext);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <>
      <Divider />

      <Collapse in={open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "180px",
            width: "100%",
            marginBottom: 1,
            marginTop: 2,
          }}
        >
          <ErrorPlot />
        </Box>
      </Collapse>
      <Grid container>
        {/* <Box sx={{ display: "flex", justifyContent: "right", width: "100%" }}> */}
        <Grow in={open}>
          <Grid
            size={{ xs: 6, sm: 7, md: 8 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <FormControl>
              <RadioGroup row>
                {errorPlotTypes.map((thisErrorPlotType, index) => (
                  <FormControlLabel
                    key={`${thisErrorPlotType}-${index}`}
                    value={thisErrorPlotType}
                    checked={errorPlotType === thisErrorPlotType}
                    control={<Radio />}
                    label={
                      thisErrorPlotType.charAt(0).toUpperCase() +
                      thisErrorPlotType.slice(1) +
                      (isXsScreen ? "" : " error")
                    }
                    onChange={(_event, checked) =>
                      setErrorPlotType(
                        checked ? thisErrorPlotType : errorPlotType
                      )
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grow>
        <Grid
          size={{ xs: 6, sm: 5, md: 4 }}
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Button onClick={() => setOpen(!open)}>
            {open ? "Hide error history" : "Show error history"}
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Button>
        </Grid>
        {/* </Box> */}
      </Grid>
    </>
  );
};
