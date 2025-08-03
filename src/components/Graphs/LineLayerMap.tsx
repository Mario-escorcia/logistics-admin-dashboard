import { DeckGL } from "@deck.gl/react";
import type { MapViewState } from "@deck.gl/core";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setLineLayerAirports,
  setLineLayerRoutes,
} from "../../redux/Graphs/graphsSlice";
import {
  getLineLayerAirportsData,
  getLineLayerRoutesData,
} from "../../services/dashboardServices";

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 51.5074,
  longitude: 0.1278,
  zoom: 7.5,
  pitch: 10,
  maxZoom: 15,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export const LineLayerMap = () => {
  const routes = useAppSelector((state) => {
    return state.graphs.lineLayerRoutes;
  });
  const airports = useAppSelector((state) => {
    return state.graphs.lineLayerAirports;
  });
  const dispatch = useAppDispatch();

  // functions
  const getAirports = async () => {
    let request = await getLineLayerAirportsData();
    if (request.status == 200) {
      dispatch(setLineLayerAirports(request.data));
    }
  };

  const getRoutes = async () => {
    let request = await getLineLayerRoutesData();
    if (request.status == 200) {
      dispatch(setLineLayerRoutes(request.data));
    }
  };

  useEffect(() => {
    getRoutes();
    getAirports();
  }, []);

  const layers = [
    new LineLayer({
      id: "flight-paths",
      data: routes,
      getSourcePosition: (d) => d.start,
      getTargetPosition: (d) => d.end,
      getColor: (d) => {
        const z = d.start[2];
        const r = z / 10000;
        return [255 * (1 - r * 2), 128 * r, 255 * r, 255 * (1 - r)];
      },
      getWidth: 2,
      pickable: true,
    }),
    new ScatterplotLayer({
      id: "airports",
      data: airports,
      getPosition: (d) => d.coordinates,
      getFillColor: [255, 140, 0],
      getRadius: 50,
    }),
  ];

  return (
    <div
      className="lineLineLayerMap"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map mapStyle={MAP_STYLE} />
      </DeckGL>
    </div>
  );
};
