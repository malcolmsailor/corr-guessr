import { getRandomColorPair } from "./shared/colors";
import { type DataState, type SettingsState } from "./shared/types";
import { getCorrelatedVectors, calculateCorrelation } from "./utils/math";

export const getData = (
  settings: SettingsState,
  targetR: number,
  colorPairs: [string, string][]
): DataState => {
  const { n, distribution } = settings;
  const { a, b } = getCorrelatedVectors(targetR, n, distribution);
  const r = calculateCorrelation(a, b);
  const [color1, color2] = getRandomColorPair(colorPairs);
  if (r < 0) {
    const negB = b.map((bVal) => -bVal);
    return { a, b: negB, r: -r, color1, color2 };
  }
  return { a, b, r, color1, color2 };
};
