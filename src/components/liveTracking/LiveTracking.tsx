import { GlobalMap } from "../Graphs/GlobalMap";
import { LineLayerMap } from "../Graphs/LineLayerMap";
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
      <div>
        <p>lorem ipsum</p>

        <LineLayerMap></LineLayerMap>
      </div>
      <div>
        <p>lorem ipsum</p>

        <LineLayerMap></LineLayerMap>
      </div>
    </section>
  );
};
