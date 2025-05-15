import { useContext, useState, useEffect } from "react";
import { GuessrContext } from "../../shared/context";
import {
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { FEATURE_MAPPING } from "../../shared/defaults";
import { getAlpha, getColor } from "../../shared/colors";
import { alpha } from "@mui/material";

type ScatterPlotProps = {
  delayMS?: number;
};

export const ScatterPlot = ({ delayMS = 100 }: ScatterPlotProps) => {
  // We need to delay the data to avoid the user catching a glimpse of the new scatter
  // plot before it is hidden.
  const { data, settings } = useContext(GuessrContext);

  const [delayData, setDelayData] = useState(data);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayData(data);
    }, delayMS);
    return () => clearTimeout(timer);
  }, [data]);

  const scatterData = [];
  for (let i = 0; i < delayData.a.length; i++) {
    scatterData.push({
      x: delayData.a[i],
      y: delayData.b[i],
      z: 0,
    });
  }
  const xLabel = FEATURE_MAPPING[settings.feature1];
  const yLabel = FEATURE_MAPPING[settings.feature2];

  let xMin = Math.min(...delayData.a);
  let xMax = Math.max(...delayData.a);
  let yMin = Math.min(...delayData.b);
  let yMax = Math.max(...delayData.b);
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  xMin -= xRange * 0.1;
  xMax += xRange * 0.1;
  yMin -= yRange * 0.1;
  yMax += yRange * 0.1;

  let mixColor = (_entry: any) => delayData.color1;

  if (settings.feature1 === "color") {
    mixColor = (entry: any) => {
      return getColor(
        Math.min(...delayData.a),
        Math.max(...delayData.a),
        delayData.color1,
        delayData.color2,
        entry.x
      );
    };
  } else if (settings.feature2 === "color") {
    mixColor = (entry: any) => {
      return getColor(
        Math.min(...delayData.b),
        Math.max(...delayData.b),
        delayData.color1,
        delayData.color2,
        entry.y
      );
    };
  }

  let mixAlpha = (_entry: any) => 1;

  if (settings.feature1 === "opacity") {
    mixAlpha = (entry: any) => {
      return getAlpha(
        Math.min(...delayData.a),
        Math.max(...delayData.a),
        entry.x
      );
    };
  } else if (settings.feature2 === "opacity") {
    mixAlpha = (entry: any) => {
      return getAlpha(
        Math.min(...delayData.b),
        Math.max(...delayData.b),
        entry.y
      );
    };
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={scatterData}>
        <XAxis
          type="number"
          dataKey="x"
          tick={false}
          label={{ value: xLabel, position: "insideBottom" }}
          domain={[xMin, xMax]}
          width={25}
        />
        <YAxis
          type="number"
          dataKey="y"
          tick={false}
          label={{ value: yLabel, angle: -90 }}
          domain={[yMin, yMax]}
          width={25}
        />
        <Scatter data={scatterData} isAnimationActive={false}>
          {scatterData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={alpha(mixColor(entry), mixAlpha(entry))}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};
