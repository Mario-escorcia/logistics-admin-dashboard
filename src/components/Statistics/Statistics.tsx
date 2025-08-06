import { BarsChart } from "../Graphs/BarsChart";
import { GaugeChart } from "../Graphs/GaugeChart";import { RadarChartComponent } from "../Graphs/RadarChartComponent";
import "./statistics.css";

export const Statistics = () => {
  return (
    <section className="statistics">
      <div>
        <p>shipment status</p>
        <div>
            <BarsChart></BarsChart>
        </div>
      </div>
     
      <div>
        <p>delivery reliability</p>
        <div>
            <GaugeChart></GaugeChart>
        </div>
      </div>
      <div className="KPI-container">
        <p>KPI analitycs</p>
        <div><RadarChartComponent></RadarChartComponent></div>
      </div>
    </section>
  );
};
