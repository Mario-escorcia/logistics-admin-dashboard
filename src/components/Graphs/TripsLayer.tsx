import {
  AmbientLight,
  LightingEffect,
  PointLight,
  type Color,
  type MapViewState,
  type Material,
  type Position,
} from "@deck.gl/core";
import { environment } from "../../environment/environment";
import { useEffect, useState } from "react";
import { animate } from "popmotion";
import { PolygonLayer } from "@deck.gl/layers";
import { TripsLayer } from "@deck.gl/geo-layers";
import Map from "react-map-gl/maplibre";
import {DeckGL} from '@deck.gl/react';



const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 4.0,
  position: [-74.05, 40.7, 8000],
});

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

type theme = {
  buildingColor: Color;
  trailColor0: Color;
  trailColor1: Color;
  material: Material;
  effects: [LightingEffect];
};

const DEFAULT_THEME: theme = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material: {
    ambient: 0.1,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [60, 64, 70],
  },
  effects: [lightingEffect],
};

const INITIAL_STATE: MapViewState = {
  longitude: -74,
  latitude: 40.715,
  zoom: 13.5,
  pitch: 45,
  bearing: 0,
};

const MAP_STYLE = environment.tripsLayerMapStyle;

const landCover: Position[][] = [
  [
    [-74.0, 40.7],
    [-74.02, 40.7],
    [-74.02, 40.72],
    [-74.0, 40.72],
  ],
];

type Building = {
  polygon: Position[];
  height: number;
};

type Trip = {
  vendor: number;
  path: Position[];
  timestamps: number[];
};

export const TripsLayerComponent = ({
  buildings = environment.tripsLayerBuildings,
  trips = environment.tripsLayerTrips,
  trailLength = 180,
  initialViewState = INITIAL_STATE,
  mapStyle = MAP_STYLE,
  theme = DEFAULT_THEME,
  loopLength = 1800,
  animationSpeed = 3,
}: {
  buildings?: string | Building[];
  trips?: string | Trip[];
  trailLength?: number;
  loopLength?: number;
  animationSpeed?: number;
  initialViewState?: MapViewState;
  mapStyle?: string;
  theme?: theme;
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const animation = animate({
      from: 0,
      to: loopLength,
      duration: (loopLength * 60) / animationSpeed,
      repeat: Infinity,
      onUpdate: setTime,
    });
    return () => animation.stop();
  }, [loopLength, animationSpeed]);

  const layers = [
    // This is only needed when using shadow effects
    new PolygonLayer<Position[]>({
      id: "ground",
      data: landCover,
      getPolygon: (f) => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0],
    }),
    new TripsLayer<Trip>({
      id: "trips",
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,

      //   shadowEnabled: false
    }),
    new PolygonLayer<Building>({
      id: "buildings",
      data: buildings,
      extruded: true,
      wireframe: false,
      opacity: 0.5,
      getPolygon: (f) => f.polygon,
      getElevation: (f) => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material,
    }),
  ];
  return (
    <section
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <DeckGL
        layers={layers}
        effects={theme.effects}
        initialViewState={initialViewState}
        controller={true}
      >
        <Map reuseMaps mapStyle={mapStyle} />
      </DeckGL>
    </section>
  );
};
