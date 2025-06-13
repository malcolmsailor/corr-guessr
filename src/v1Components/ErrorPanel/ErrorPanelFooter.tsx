import {
  Button,
  RadioGroup,
  useMediaQuery,
  useTheme,
  FormControl,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { useContext } from "react";
import { errorPlotTypes } from "../../shared/types";
import { GuessrContext } from "../../shared/context";

export const ErrorPanelFooter = () => {
  const {
    errorPlotType,
    setErrorPlotType,
    setFeatureHistory,
    setErrors,
    setCorrs,
  } = useContext(GuessrContext);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Grid container>
      <Grid
        size={8}
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
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
                  setErrorPlotType(checked ? thisErrorPlotType : errorPlotType)
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid size={4} sx={{ display: "flex", justifyContent: "right" }}>
        <Button
          onClick={() => {
            setFeatureHistory([]);
            setErrors([]);
            setCorrs([]);
          }}
        >
          Reset error history
        </Button>
      </Grid>
    </Grid>
  );
};
