import { useContext } from "react";
import { GuessrContext } from "../../shared/context";
import { Scatter, YAxis, XAxis, Cell, CartesianGrid } from "recharts";
import { ScatterChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import { Legend } from "recharts";
import { useMediaQuery, useTheme } from "@mui/material";
import { getFeatureLabels } from "./common";

export const ErrorCorrelationScatter = () => {
  const theme = useTheme();
  const { errors, corrs, errorPlotType, featureHistory } =
    useContext(GuessrContext);

  const isXsScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const legendStyle: React.CSSProperties = {
    paddingLeft: "16px",
  };
  if (isXsScreen) {
    legendStyle.paddingLeft = "8px";
    legendStyle.maxWidth = "150px";
  }
  const allData: Record<string, { x: number; y: number; z: number }[]> = {};
  for (let i = 0; i < corrs.length; i++) {
    const feature = featureHistory[i];
    if (allData[feature]) {
      allData[feature].push({
        x: errorPlotType === "absolute" ? Math.abs(errors[i]) : errors[i],
        y: corrs[i],
        z: 1,
      });
    } else {
      allData[feature] = [
        {
          x: errorPlotType === "absolute" ? Math.abs(errors[i]) : errors[i],
          y: corrs[i],
          z: 1,
        },
      ];
    }
  }

  const labels = getFeatureLabels(allData);

  const xMin = errorPlotType === "absolute" ? 0 : -1;
  const xMax = 1;
  const yMin = 0;
  const yMax = 1;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart>
        <CartesianGrid strokeDasharray="6 12" />
        <XAxis
          type="number"
          dataKey="x"
          domain={[xMin, xMax]}
          tickCount={5}
          interval={0}
          tickFormatter={(_value) => ""}
          label="Error"
        />
        <YAxis
          type="number"
          dataKey="y"
          domain={[yMin, yMax]}
          tickCount={5}
          interval={0}
          tickFormatter={(_value) => ""}
          label={{ value: "Correlation", angle: -90 }}
        />
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
        <Legend
          align="right"
          verticalAlign="middle"
          layout="vertical"
          wrapperStyle={legendStyle}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
