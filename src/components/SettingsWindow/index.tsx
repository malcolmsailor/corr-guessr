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
  Checkbox,
} from "@mui/material";
import SliderWithInput from "../shared/SliderWithInput";
import { FeatureSelector } from "./FeatureSelector";
import { distributionTypes, barPlotTypes } from "../../shared/types";

export const SettingsWindow = () => {
  const { settings, setSettings, randomizeFeatures, setRandomizeFeatures } =
    useContext(GuessrContext);
  // const calculateN = (value: number) => {
  //   const output = 2 ** value;
  //   return output;
  // };
  // const [checked, setChecked] = useState(settings.randomizeFeatures);
  const radioStyling = {
    marginBottom: -1.75,
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
      <FeatureSelector
        greyedOut={randomizeFeatures}
        radioStyling={radioStyling}
      />
      <FormControl>
        <FormControlLabel
          key="randomizeFeaturesCheckbox"
          value={randomizeFeatures}
          control={<Checkbox />}
          label="Randomize features"
          checked={randomizeFeatures === true}
          onChange={(_event, checked) => setRandomizeFeatures(checked)}
          sx={{
            marginBottom: -1.5,
          }}
        />
      </FormControl>
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
              control={
                <Radio
                  disabled={
                    settings.feature1 === "bar-offset" ||
                    settings.feature2 === "bar-offset"
                  }
                />
              }
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
