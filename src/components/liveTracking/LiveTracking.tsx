import { GlobalMap } from "../Graphs/GlobalMap";
import { LineLayerMap } from "../Graphs/LineLayerMap";
import { TripsLayerComponent } from "../Graphs/TripsLayer";
import "./LiveTracking.css";

export const LiveTracking = () => {
  return (
    <section className="live-tracking">
      <div>
        <p>UK Orders Paths (2024)</p>
        <LineLayerMap></LineLayerMap>
      </div>
      <div>
        <p>Global Flights made until today</p>

        <GlobalMap></GlobalMap>
      </div>
      <div style={{
        gridColumn : "span 2"
      }}>
        <p>Users that are using our GPS hardware in real time</p>

        <TripsLayerComponent></TripsLayerComponent>
      </div>
      
    </section>
  );
};
