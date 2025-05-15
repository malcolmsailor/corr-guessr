declare module "jstat" {
  const jStat: {
    ols: (x: number[], y: number[]) => any;
  };
  export default jStat;
}
