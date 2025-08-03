import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

export const LineChartComponent = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [xAxis, setxAsis] = useState<any[]>([]);

  useEffect(() => {
    setxAsis([
      {
        data: [1, 2, 3, 5, 8, 10],
      },
    ]);
    setSeries([
      {
        data: [2, 5.5, 2, 8.5, 1.5, 5],
      },
    ]);
  }, []);
  return (
    <LineChart
      series={series}
      xAxis={xAxis}
      height={190}
      width={450}
      // margin={0}
      sx={{
        "& .MuiChartsAxis-line": {
          stroke: "var(--txt-color)",
        },
        "& .MuiChartsAxis-tick": {
          stroke: "var(--txt-color)",
        },
        "& .MuiChartsAxis-tickLabel":{
          fill : "var(--txt-color)"
        }
      }}
    />
  );
};
