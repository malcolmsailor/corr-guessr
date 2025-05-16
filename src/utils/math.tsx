import normal from "@stdlib/random-base-normal";
import uniform from "@stdlib/random-base-uniform";
import incrpcorr from "@stdlib/stats-incr-pcorr";
import { linearRegression } from "simple-statistics";

export function getCorrelatedVectors(
  r: number,
  n: number,
  distribution: "normal" | "uniform"
) {
  // Because of random sampling variation, the correlation of the result will not
  // be exactly r. We could try to get an exact match, but the computation would be
  // much more complicated and the user wouldn't notice: they never have to see
  // the parameter to this function; instead we can only expose the correlation
  // of the function result.
  let sampleFunction: () => number;
  if (distribution === "normal") {
    sampleFunction = () => {
      return normal(0, 1);
    };
  } else {
    sampleFunction = () => {
      return uniform(-1, 1);
    };
  }
  const a: number[] = [];
  const b: number[] = [];
  for (let i = 0; i < n; i++) {
    const aVal = sampleFunction();
    const zVal = sampleFunction();
    a.push(aVal);
    b.push(r * aVal + Math.sqrt(1 - r * r) * zVal);
  }
  return { a, b };
}

export function getCorrelation(): number {
  return uniform(0, 1);
}

export function calculateCorrelation(a: number[], b: number[]): number {
  let accumulator = incrpcorr();
  for (let i = 0; i < a.length; i++) {
    accumulator(a[i], b[i]);
  }
  const r = accumulator();
  if (r === null) {
    throw new Error("Failed to calculate correlation");
  }
  return r;
}

export function runRegression(x: [number, number][]) {
  const regression = linearRegression(x);
  return regression;
}

export function sample<T>(array: readonly T[], n: number): T[] {
  const copy: T[] = [...array];
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
    result.push(copy[i]);
  }
  return result;
}

export const formatNumber = (num: number): string => {
  // Check if the number is an integer
  if (Number.isInteger(num)) {
    return num.toString();
  }
  // Otherwise format with at most 2 decimal places
  return num.toFixed(2).replace(/\.?0+$/, "");
};
