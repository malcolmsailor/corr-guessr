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
