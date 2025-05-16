import { useMediaQuery, type Theme } from "@mui/material";
import { features } from "../../shared/types";
import { Legend, XAxis, YAxis } from "recharts";
import { formatNumber } from "../../utils/math";

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

export const getLegend = (theme: Theme) => {
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const legendStyle: React.CSSProperties = {
    paddingLeft: "16px",
  };
  if (isXs) {
    legendStyle.paddingLeft = "8px";
    legendStyle.maxWidth = "150px";
    legendStyle.fontSize = "0.6rem";
  } else if (isSm) {
    legendStyle.fontSize = "0.8rem";
  }
  return (
    <Legend
      align="right"
      verticalAlign="middle"
      layout="vertical"
      wrapperStyle={legendStyle}
    />
  );
};

export const getXAxis = (
  theme: Theme,
  label: string,
  xMin: number,
  xMax: number,
  showTickLabels: boolean = true
) => {
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <XAxis
      type="number"
      dataKey="x"
      domain={[xMin, xMax]}
      tickCount={5}
      interval={0}
      // tickFormatter={(_value) => ""}
      tick={showTickLabels ? { fontSize: "0.6rem" } : false}
      label={{
        value: label,
        fontSize: isXs ? "0.75rem" : "1.0rem",
        dy: showTickLabels ? 10 : 0,
      }}
    />
  );
};

export const getYAxis = (
  theme: Theme,
  label: string,
  yMin: number,
  yMax: number
) => {
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <YAxis
      type="number"
      dataKey="y"
      domain={[yMin, yMax]}
      tickCount={5}
      interval={0}
      tickFormatter={(value) => (value % 0.5 == 0 ? formatNumber(value) : "")}
      tick={{ fontSize: "0.6rem" }}
      label={{
        value: label,
        fontSize: isXs ? "0.75rem" : "1.0rem",
        dx: isXs ? 2 : 0,
        angle: -90,
      }}
    />
  );
};
