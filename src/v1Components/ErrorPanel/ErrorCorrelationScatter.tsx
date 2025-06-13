import { useContext } from "react";
import { GuessrContext } from "../../shared/context";
import { Scatter, Cell, CartesianGrid } from "recharts";
import { ScatterChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";
import { getFeatureLabels, getLegend, getXAxis, getYAxis } from "./common";

export const ErrorCorrelationScatter = () => {
  const theme = useTheme();
  const { errors, corrs, errorPlotType, featureHistory } =
    useContext(GuessrContext);

  const allData: Record<string, { x: number; y: number; z: number }[]> = {};
  for (let i = 0; i < corrs.length; i++) {
    const feature = featureHistory[i];
    const thisPoint = {
      x: errorPlotType === "absolute" ? Math.abs(errors[i]) : errors[i],
      y: corrs[i],
      z: 1,
    };
    if (allData[feature]) {
      allData[feature].push(thisPoint);
    } else {
      allData[feature] = [thisPoint];
    }
  }

  const labels = getFeatureLabels(allData);

  const xMin = errorPlotType === "absolute" ? 0 : -1;
  const xMax = 1;
  const yMin = 0;
  const yMax = 1;
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      style={{
        paddingLeft: "0px",
        marginLeft: "0px",
      }}
    >
      <ScatterChart
        style={{
          paddingLeft: "0px",
          marginLeft: "0px",
        }}
        margin={{ left: -20, top: 10, right: -10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="6 12" />
        {getXAxis(theme, "Error", xMin, xMax)}
        {getYAxis(theme, "Correlation", yMin, yMax)}
        {Object.keys(allData).map((feature, featureIndex) => (
          <Scatter
            data={allData[feature]}
            name={labels[feature]}
            fill={theme.chartColors[featureIndex % theme.chartColors.length]}
          >
            {allData[feature].map((_entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Scatter>
        ))}
        {getLegend(theme)}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
