import { ResponsiveContainer, YAxis, XAxis, ReferenceLine } from "recharts";
import { Scatter, Cell, CartesianGrid } from "recharts";
import { ScatterChart } from "recharts";
import { GuessrContext } from "../../shared/context";
import { useContext } from "react";

import { getColor } from "../../shared/colors";
import { useTheme } from "@mui/material";
import { runRegression } from "../../utils/math";
export const ErrorPlot = () => {
  const { appState, errorPlotType } = useContext(GuessrContext);
  const minX = 0;
  const maxX = Math.max(appState.errors.length + 1, 50);
  let minError = Math.min(-1, ...appState.errors);
  let maxError = Math.max(1, ...appState.errors);
  if (errorPlotType === "absolute") {
    maxError = Math.max(maxError, Math.abs(minError));
    minError = 0;
  }
  const errorData = appState.errors.map((error, index) => ({
    x: index + 1,
    y: errorPlotType === "absolute" ? Math.abs(error) : error,
    z: 1,
  }));

  let line: React.ReactNode | null = null;
  const theme = useTheme();
  if (appState.errors.length > 0) {
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
        // label={{
        //   value: `m=${regression.m.toFixed(2)}, b=${regression.b.toFixed(2)}`,
        //   position: "insideRight",
        // }}
      />
    );
  } else {
    line = null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={errorData}>
        <CartesianGrid vertical={false} strokeDasharray="6 12" />
        <XAxis type="number" dataKey="x" domain={[minX, maxX]} hide={true} />
        <YAxis type="number" dataKey="y" domain={[minError, maxError]} />
        <Scatter data={errorData} fill="red">
          {errorData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColor(
                0,
                0.25,
                theme.palette.primary.main,
                theme.palette.error.main,
                Math.abs(entry.y)
              )}
            />
          ))}
        </Scatter>
        {line}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
