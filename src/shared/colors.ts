import chroma from "chroma-js";

export const getColor = (
  lowerBound: number,
  upperBound: number,
  lowerColor: string,
  upperColor: string,
  value: number
) => {
  const x = Math.max(
    Math.min((value - lowerBound) / (upperBound - lowerBound), 1.0),
    0.0
  );
  return chroma.mix(lowerColor, upperColor, x).hex();
};

export const getAlpha = (
  lowerBound: number,
  upperBound: number,
  value: number,
  minAlpha: number = 0.1,
  maxAlpha: number = 1
) => {
  return Math.max(
    Math.min(
      minAlpha +
        ((maxAlpha - minAlpha) * (value - lowerBound)) /
          (upperBound - lowerBound),
      1.0
    ),
    0.0
  );
};

export const getRandomColorPair = (colorPairs: [string, string][]) => {
  const pair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
  if (Math.random() < 0.5) {
    return pair;
  } else {
    return [pair[1], pair[0]];
  }
};
