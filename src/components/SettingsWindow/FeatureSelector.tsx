import { GuessrContext } from "../../shared/context";
import { useContext } from "react";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import { features, type Feature } from "../../shared/types";
import { FEATURE_MAPPING } from "../../shared/defaults";

interface FeatureSelectorProps {
  radioStyling: React.CSSProperties;
}

export function FeatureSelector({ radioStyling }: FeatureSelectorProps) {
  const { settings, setSettings } = useContext(GuessrContext);
  const selectedFeatures = [settings.feature1, settings.feature2];

  const handleChange = (feature: Feature, checked: boolean) => {
    if (checked) {
      selectedFeatures[0] = selectedFeatures[1];
      selectedFeatures[1] = feature;

      setSettings({
        ...settings,
        feature1: selectedFeatures[0],
        feature2: selectedFeatures[1],
      });
    }
  };
  return (
    <FormControl>
      <FormLabel>Features</FormLabel>
      <RadioGroup>
        {features.map((feature, index) => (
          <FormControlLabel
            key={`${feature}-${index}`}
            control={<Radio />}
            label={FEATURE_MAPPING[feature]}
            checked={selectedFeatures.includes(feature)}
            onChange={(_event, checked) => handleChange(feature, checked)}
            sx={radioStyling}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
