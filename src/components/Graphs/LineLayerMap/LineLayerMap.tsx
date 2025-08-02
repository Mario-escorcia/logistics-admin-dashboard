import { DeckGL } from "@deck.gl/react";
import type { MapViewState } from "@deck.gl/core";
import { LineLayer, ScatterplotLayer } from "@deck.gl/layers";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";

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
  const [routes, setRoutes] = useState<any[]>([]);
  const [airports, setAirports] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/heathrow-flights.json"
    )
      .then((res) => res.json())
      .then(setRoutes)
      .catch(console.error);

    fetch(
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/line/airports.json"
    )
      .then((res) => res.json())
      .then(setAirports)
      .catch(console.error);
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
      getWidth: 1,
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
        controller={false}
        layers={layers}
      >
        <Map mapStyle={MAP_STYLE} />
      </DeckGL>
    </div>
  );
};
