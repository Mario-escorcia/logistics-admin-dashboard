import Map, { useControl, useMap, type ViewState } from "react-map-gl/maplibre";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import { useCallback, useEffect, useState } from "react";
import { environment } from "../../environment/environment";
import { createRoot } from "react-dom/client";
import { load } from "@loaders.gl/core";
import { CSVLoader } from "@loaders.gl/csv";
import AnimatedArcLayer from "./Animated-arc-layer";
import RangeInput from "./range-input";

const INITIAL_VIEW_STATE: ViewState = {
  longitude: 90,
  latitude: 20,
  zoom: 1,
  pitch: 0,
  bearing: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

const ANIMATION_SPEED = 60;
const TIME_WINDOW = 1800;
const SEC_PER_DAY = 60 * 60 * 24;

type Flight = {
  // Departure
  time1: number;
  lon1: number;
  lat1: number;
  alt1: number;

  // Arrival
  time2: number;
  lon2: number;
  lat2: number;
  alt2: number;
};

type DailyFlights = {
  date: string;
  flights: Flight[];
};

export async function renderToDOM(container: HTMLDivElement) {
  const root = createRoot(container);
  root.render(<GlobalMap />);

  const dates = [
    "2020-01-14",
    "2020-02-11",
    "2020-03-10",
    "2020-04-14",
    "2020-05-12",
    "2020-06-09",
    "2020-07-14",
    "2020-08-11",
    "2020-09-08",
    "2020-10-13",
    "2020-11-10",
    "2020-12-08",
  ];

  const data: DailyFlights[] = [];
  for (const date of dates) {
    const url = `${environment.globalMapDataSource}/${date}.csv`;
    const flights: Flight[] = (
      await load(url, CSVLoader, { csv: { skipEmptyLines: true } })
    ).data as Flight[];

    console.log("Flights loaded:", flights.length, "for", date);

    // Join flight data from multiple dates into one continuous animation
    const offset = SEC_PER_DAY * data.length;
    for (const f of flights) {
      f.time1 += offset;
      f.time2 += offset;
    }

    data.push({ flights, date });
    root.render(<GlobalMap data={data} />);
  }
}

function getDate(data: DailyFlights[], t: number) {
  const index = Math.min(data.length - 1, Math.floor(t / SEC_PER_DAY));
  const date = data[index].date;
  const timestamp = new Date(`${date}T00:00:00Z`).getTime() + (t % SEC_PER_DAY) * 1000;
  return new Date(timestamp);
}

function DeckGLOverlay(props: any) {
  const overlay = useControl(() => new DeckOverlay(props));
  const { current: map } = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo({ center: [-90, 20], curve: 0.1, speed: 0.002 });
    }
  }, [map]);

  overlay.setProps(props);
  return null;
}

export const GlobalMap = ({
  data = [],
}: {
  data?: DailyFlights[];
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const timeRange: [number, number] = [currentTime, currentTime + TIME_WINDOW];

  const layers =
    data?.map(
      ({ date, flights }) =>
        new AnimatedArcLayer<Flight>({
          id: `flights-${date}`,
          data: flights,
          getSourcePosition: (d) => [d.lon1, d.lat1, d.alt1],
          getTargetPosition: (d) => [d.lon2, d.lat2, d.alt2],
          getSourceTimestamp: (d) => d.time1,
          getTargetTimestamp: (d) => d.time2,
          getHeight: 0.3,
          getWidth: 2,
          timeRange,
          getSourceColor: [63, 81, 181],
          getTargetColor: [63, 181, 173],
          parameters: { cullMode: "none" },
          // antes usabas beforeId, mejor quitarlo por compatibilidad
        })
    ) ?? [];

  // Animación del tiempo
  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => {
      setCurrentTime(
        (t) => (t + ANIMATION_SPEED) % (data.length * SEC_PER_DAY)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [data]);

   const formatLabel = useCallback((t: number) => getDate(data ? data : [], t).toUTCString(), [data]);

  console.log("Rendering layers:", layers);

  return (
    <section
      style={{
        height: "100%",
        width: "100%",
        background: "var(--dark-bg)",
      }}
    >
      <Map
        reuseMaps
        projection="globe"
        id="map"
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        dragRotate={false}
        maxPitch={0}
      >
        <DeckGLOverlay layers={layers} interleaved />
      </Map>

      data && (
        <RangeInput
          min={0}
          max={data.length * SEC_PER_DAY}
          value={currentTime}
          animationSpeed={ANIMATION_SPEED}
          formatLabel={formatLabel}
          onChange={setCurrentTime}
        />
      )
    </section>
  );
};
