import { Gauge, gaugeClasses } from "@mui/x-charts";

export const GaugeChart = () => {
  const generateRadomProfitNumber = () => {
    const number: number = Math.ceil(Math.random() * 100);
    return number;
  };

  const gaugeSettings = {
    width: 250,
    height: 250,
  };
  return (
    <Gauge
      {...gaugeSettings}
      value={generateRadomProfitNumber()}
      sx={{
        ["& .css-1vrdpux text"]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
          fill: "var(--txt-color) !important",
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "var(--purple)",
        },
      }}
      text={({ value }) => `${value}%`}
    />
  );
};
