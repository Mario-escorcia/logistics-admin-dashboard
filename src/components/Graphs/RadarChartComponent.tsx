import { RadarChart, type RadarSeriesType } from "@mui/x-charts";

const commonSettings = {
  height: 300,
  radar: {
    max: 100,
    metrics: [
      "On Time Delivery (OTD) (93%)",
      "Return Rate (7%)",
      "Damage (3%)",
      "freight cost per month ($15.000)",
      "picking and packing accuracy (53%)",
    ],
  },
};
const KPIStatiistics: RadarSeriesType = {
  type: "radar",
  label: "data",
  id: "KPI-statistics",
  data: [93, 7, 3, 90, 53],
  hideMark: true,
};
export const RadarChartComponent = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <RadarChart
        {...commonSettings}
        series={[KPIStatiistics]}
        sx={{
          background : "teal",
          height : "100%",

        }}
        
      />
    </div>
  );
};
