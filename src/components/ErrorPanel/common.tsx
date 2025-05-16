import { features } from "../../shared/types";

export const getFeatureLabels = (allData: Record<string, any>) => {
  const labels: Record<string, string> = {};
  for (const feature of Object.keys(allData)) {
    const [featureIndex1, featureIndex2] = feature.split("_");
    labels[feature] = `${features[parseInt(featureIndex1)]} and ${
      features[parseInt(featureIndex2)]
    }`.replace(/-/g, " ");
  }
  return labels;
};
