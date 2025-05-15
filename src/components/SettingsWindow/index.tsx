import { GuessrContext } from "../../shared/context";
import { useContext } from "react";
import {
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
  Box,
  Divider,
} from "@mui/material";
import SliderWithInput from "../shared/SliderWithInput";
import { FeatureSelector } from "./FeatureSelector";
import { distributionTypes, barPlotTypes } from "../../shared/types";

export const SettingsWindow = () => {
  const { settings, setSettings } = useContext(GuessrContext);
  // const calculateN = (value: number) => {
  //   const output = 2 ** value;
  //   return output;
  // };
  const radioStyling = {
    marginBottom: -1.5,
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Settings
      </Typography>
      <Divider />
      <SliderWithInput
        label="Number of observations"
        value={settings.n}
        setValue={(value) => setSettings({ ...settings, n: value })}
        min={2}
        max={100}
        inputWidth={42}
      />
      <Divider />
      <FeatureSelector />
      <Divider />
      <FormControl>
        <FormLabel>Distribution</FormLabel>
        <RadioGroup>
          {distributionTypes.map((distribution, index) => (
            <FormControlLabel
              key={`${distribution}-${index}`}
              value={distribution}
              checked={settings.distribution === distribution}
              control={<Radio />}
              label={
                distribution.charAt(0).toUpperCase() + distribution.slice(1)
              }
              onChange={(_event, checked) =>
                setSettings({
                  ...settings,
                  distribution: checked ? distribution : settings.distribution,
                })
              }
              sx={radioStyling}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <FormControl>
        <FormLabel>Bar plot heights</FormLabel>
        <RadioGroup>
          {barPlotTypes.map((barPlotType, index) => (
            <FormControlLabel
              key={`${barPlotType}-${index}`}
              value={barPlotType}
              checked={settings.barPlotType === barPlotType}
              control={<Radio />}
              label={barPlotType.charAt(0).toUpperCase() + barPlotType.slice(1)}
              onChange={(_event, checked) =>
                setSettings({
                  ...settings,
                  barPlotType: checked ? barPlotType : settings.barPlotType,
                })
              }
              sx={radioStyling}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
