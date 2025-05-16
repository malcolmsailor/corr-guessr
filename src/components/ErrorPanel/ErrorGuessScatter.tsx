import { ResponsiveContainer, ReferenceLine } from "recharts";
import { Scatter, Cell, CartesianGrid } from "recharts";
import { ScatterChart } from "recharts";
import { GuessrContext } from "../../shared/context";
import { useContext } from "react";

import { useTheme } from "@mui/material";
import { runRegression } from "../../utils/math";

import { getFeatureLabels, getLegend, getXAxis, getYAxis } from "./common";

export const ErrorGuessScatter = () => {
  const theme = useTheme();
  const { errors, errorPlotType, featureHistory } = useContext(GuessrContext);
  const minX = 0;
  const maxX = Math.max(errors.length + 1, 50);
  let minError = Math.min(-1, ...errors);
  let maxError = Math.max(1, ...errors);
  if (errorPlotType === "absolute") {
    maxError = Math.max(maxError, Math.abs(minError));
    minError = 0;
  }
  const errorData = errors.map((error, index) => ({
    x: index + 1,
    y: errorPlotType === "absolute" ? Math.abs(error) : error,
    z: 1,
  }));

  const allData: Record<string, { x: number; y: number; z: number }[]> = {};
  for (let i = 0; i < errors.length; i++) {
    const feature = featureHistory[i];
    if (allData[feature]) {
      allData[feature].push({
        x: i + 1,
        y: errorPlotType === "absolute" ? Math.abs(errors[i]) : errors[i],
        z: 1,
      });
    } else {
      allData[feature] = [{ x: i + 1, y: errors[i], z: 1 }];
    }
  }

  let line: React.ReactNode | null = null;

  if (errors.length > 0) {
    const regression = runRegression(
      errorData.map((error) => [error.x, error.y])
    );
    const f = (x: number) => regression.m * x + regression.b;
    const inverseF = (y: number) => (y - regression.b) / regression.m;
    let x1 = minX;
    let x2 = maxX;
    let y1 = f(x1);
    let y2 = f(x2);
    // The line will not be plotted if any of the points are outside the domain,
    // so we need to adjust the points to be within the domain.
    if (y1 < minError) {
      y1 = minError;
      x1 = inverseF(minError);
    } else if (y1 > maxError) {
      y1 = maxError;
      x1 = inverseF(maxError);
    }
    if (y2 < minError) {
      y2 = minError;
      x2 = inverseF(minError);
    } else if (y2 > maxError) {
      y2 = maxError;
      x2 = inverseF(maxError);
    }
    const segment = [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ];
    line = (
      <ReferenceLine
        segment={segment}
        stroke={theme.palette.grey[300]}
        strokeDasharray="3 3"
      />
    );
  } else {
    line = null;
  }

  const labels = getFeatureLabels(allData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ left: -20, top: 10, right: -10, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="6 12" />
        {getXAxis(theme, "Guess", minX, maxX, false)}
        {getYAxis(theme, "Error", minError, maxError)}
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
        {line}
        {getLegend(theme)}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
