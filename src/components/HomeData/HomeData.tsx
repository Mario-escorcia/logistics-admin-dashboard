import { LineLayerMap } from "../Graphs/LineLayerMap/LineLayerMap";
import "./homeData.css";
export const HomeData = () => {
  return (
    <section className="home-data">
     <div style={{
      width : "30%",
      height : "40%"
     }}>
      <LineLayerMap></LineLayerMap>
     </div>
    </section>
  )
}
