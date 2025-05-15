import { useContext, useState } from "react";
import { Bar, BarChart, Cell, YAxis, type BarProps } from "recharts";
import { GuessrContext } from "../shared/context";
import { ResponsiveContainer } from "recharts";

import { getAlpha, getColor } from "../shared/colors";
import { alpha } from "@mui/material/styles";

const getPath = (
  x: number,
  y: number,
  width: number,
  height: number
): string => {
  return `M ${x},${y} h ${width} v ${height} h ${-width} Z`;
};

interface CustomBarProps extends BarProps {
  offsetDataKey: string;
  offsetDataMin: number;
  offsetDataMax: number;
  offsetScale: number;
  widthDataKey: string;
  widthDataMin: number;
  widthDataMax: number;
  payload: { [key: string]: number };
}

const CustomBar = (props: CustomBarProps) => {
  const offsetDataVal = props.payload[props.offsetDataKey];
  const normedOffsetDataVal =
    (offsetDataVal - props.offsetDataMin) /
    (props.offsetDataMax - props.offsetDataMin);
  const widthDataVal = props.payload[props.widthDataKey];
  console.log(props);
  const normedWidthDataVal =
    (widthDataVal - props.widthDataMin) /
    (props.widthDataMax - props.widthDataMin);
  return (
    <path
      d={getPath(
        props.x as number,
        (props.y as number) - normedOffsetDataVal * props.offsetScale,
        (props.width as number) * normedWidthDataVal,
        props.height as number
      )}
      stroke="none"
      fill={props.fill}
    />
  );
};

export const BarPlot = () => {
  const { data, settings } = useContext(GuessrContext);
  const [containerHeight, setContainerHeight] = useState(0);
  const barData = [];

  const aMax = Math.max(...data.a);
  const aMin = Math.min(...data.a);
  const bMax = Math.max(...data.b);
  const bMin = Math.min(...data.b);

  type barDataKey = "constant" | "a" | "b" | "aPos" | "bPos";

  let xDataKey: barDataKey = "constant";
  let yAxisMin: number = 0;
  let yAxisMax: number = 1;
  if (settings.feature1 === "bar-height") {
    if (settings.barPlotType === "unidirectional") {
      xDataKey = "aPos";
      yAxisMin = 0;
      yAxisMax = aMax - aMin;
    } else {
      xDataKey = "a";
      yAxisMin = aMin;
      yAxisMax = aMax;
    }
  } else if (settings.feature2 === "bar-height") {
    if (settings.barPlotType === "unidirectional") {
      xDataKey = "bPos";
      yAxisMin = 0;
      yAxisMax = bMax - bMin;
    } else {
      xDataKey = "b";
      yAxisMin = bMin;
      yAxisMax = bMax;
    }
  }

  let offsetDataKey: barDataKey = "constant";
  let offsetDataMin: number = 1; // so that constant 1 - data min will be 0
  let offsetDataMax: number = 2; // so that data max - data min will be nonzero
  if (settings.feature1 === "bar-offset") {
    offsetDataKey = "a";
    offsetDataMin = aMin;
    offsetDataMax = aMax;
    yAxisMax = yAxisMax + (yAxisMax - yAxisMin);
  } else if (settings.feature2 === "bar-offset") {
    offsetDataKey = "b";
    offsetDataMin = bMin;
    offsetDataMax = bMax;
    yAxisMax = yAxisMax + (yAxisMax - yAxisMin);
  }

  let widthDataKey: barDataKey = "constant";
  let widthDataMin: number = 0; // so that constant 1 - data min will be 1
  let widthDataMax: number = 1; // so that data max - data min will be 1
  if (settings.feature1 === "bar-width") {
    widthDataKey = "a";
    widthDataMin = aMin;
    widthDataMax = aMax;
  } else if (settings.feature2 === "bar-width") {
    widthDataKey = "b";
    widthDataMin = bMin;
    widthDataMax = bMax;
  }

  let mixColor = (_value: number) => data.color1;

  let colorDataKey: barDataKey = "constant";
  if (settings.feature1 === "color") {
    colorDataKey = "a";
    mixColor = (value: number) => {
      return getColor(
        Math.min(...data.a),
        Math.max(...data.a),
        data.color1,
        data.color2,
        value
      );
    };
  } else if (settings.feature2 === "color") {
    colorDataKey = "b";
    mixColor = (value: number) => {
      return getColor(
        Math.min(...data.b),
        Math.max(...data.b),
        data.color1,
        data.color2,
        value
      );
    };
  }

  let mixAlpha = (_value: number) => 1;

  let opacityDataKey: barDataKey = "constant";
  if (settings.feature1 === "opacity") {
    opacityDataKey = "a";
    mixAlpha = (value: number) => {
      return getAlpha(Math.min(...data.a), Math.max(...data.a), value);
    };
  } else if (settings.feature2 === "opacity") {
    opacityDataKey = "b";
    mixAlpha = (value: number) => {
      return getAlpha(Math.min(...data.b), Math.max(...data.b), value);
    };
  }

  for (let i = 0; i < data.a.length; i++) {
    barData.push({
      i: i,
      a: data.a[i],
      aPos: data.a[i] - aMin + (aMax - aMin) * 0.1,
      b: data.b[i],
      bPos: data.b[i] - bMin + (bMax - bMin) * 0.1,
      constant: 1,
    });
  }

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      onResize={(_width, height) => setContainerHeight(height)}
    >
      <BarChart data={barData} layout="horizontal">
        {/* <XAxis dataKey="i" tick={false} /> */}
        <YAxis domain={[yAxisMin, yAxisMax]} hide={true} />
        <Bar
          dataKey={xDataKey}
          fill="#8884d8"
          shape={(props: any) => (
            <CustomBar
              {...props}
              offsetDataKey={offsetDataKey}
              offsetScale={containerHeight / 2}
              offsetDataMin={offsetDataMin}
              offsetDataMax={offsetDataMax}
              widthDataKey={widthDataKey}
              widthDataMin={widthDataMin}
              widthDataMax={widthDataMax}
            />
          )}
        >
          {barData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={alpha(
                mixColor(entry[colorDataKey]),
                mixAlpha(entry[opacityDataKey])
              )}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
