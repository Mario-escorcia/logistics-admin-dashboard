import { DeckGL } from '@deck.gl/react';
import type { MapViewState } from '@deck.gl/core';
import { LineLayer } from '@deck.gl/layers';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useState } from 'react';

const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 5
};

type DataType = {
    from: [longitude: number, latitude: number];
    to: [longitude: number, latitude: number];
};

export const LineLayerMap = () => {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/line-data.json')
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);
    const layers = [
        new LineLayer<DataType>({
            id: 'line-layer',
            data: data,
            getSourcePosition: (d: DataType) => d.from,
            getTargetPosition: (d: DataType) => d.to,
        })
    ];
    return (
        <div className="lineLineLayerMap"
            style={{
                width : "100%",
                height : "100%",
                position : "relative"
            }}
        >
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={layers}
                
            >
                <Map
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                />
            </DeckGL>
        </div>
    )
}
