import { BarChart } from "@mui/x-charts";
import { useAppSelector } from "../../hooks/hooks";

export const BarsChart = () => {
  const dataSet = useAppSelector((state) => state.graphs.barChartDataSet);
  function valueFormatter(value: number | null) {
    let result: number;
    if (value) {
      let biggerNumber = value * 100;
      result = Math.ceil(Math.random() * biggerNumber);
    } else {
      result = Math.ceil(Math.random() * 100);
    }
    return `$ ${result}`;
  }
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <BarChart
        hideLegend={true}
        allowReorder="yes"
        dataset={dataSet}
        xAxis={[{ dataKey: "month" }]}
        series={[
          { dataKey: "london", label: "London", valueFormatter },
          { dataKey: "paris", label: "Paris", valueFormatter },
          { dataKey: "newYork", label: "New York", valueFormatter },
          //   { dataKey: "seoul", label: "Seoul", valueFormatter },
        ]}
        sx={{
          "& .MuiChartsAxis-line": {
            stroke: "var(--white) !important",
          },
          "& .MuiChartsAxis-tick": {
            stroke: "var(--white) !important",
          },
          "& .MuiChartsAxis-tickLabel": {
            fill: "var(--white) !important",
          },
        }}
      ></BarChart>
    </div>
  );
};
