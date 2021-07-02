import React, { FC, useEffect, useState } from "react";
import ReactMapGl, {
  FlyToInterpolator,
  MapEvent,
  Source,
  Layer,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addLocation,
  clear,
  Coordinate,
  deleteLocation,
  ILocation,
  selectClusterMap,
} from "./ReactMapSlice";
import { easeCubic } from "d3-ease";
import { PinMarker } from "./PinMarker";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";


// export interface IGeometry {
//   type: string;
//   coordinates: number[];
// }

// export interface IGeoJson {
//   type: string;
//   geometry?: IGeometry;
//   features?: IGeoJson[]
//   bbox?: number[];
//   properties?: any;
// }

const ReactMap: FC = () => {
  let [viewport, setViewport] = useState({
    width: 800,
    height: 600,
    latitude: 55.683839,
    longitude: 12.584787,
    zoom: 9,
    pitch: 0,
    transitionDuration: 2000,
    transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic,
  });

  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const handleGoToLocation = (loc: ILocation) => {
    setViewport({
      ...viewport,
      latitude: loc.lat,
      longitude: loc.lon,
      zoom: 12,
    });
  };

  function handleAddNewMarker(e: MapEvent): void {
    e.preventDefault();
    if (!e.rightButton) return;

    const [lon, lat] = e.lngLat;
    dispatch(addLocation({ name: "test", id: "", lon, lat }));
  }

  

  // const createLocJson = (loc: ILocation) => {
  //   return {type: 'Feature', geometry: {type: 'Point', coordinates: [loc.lat, loc.lon]}}
  // }
  // const locjson = clusterMap.locations.map(loc =>
  //     createLocJson(loc)
  //   )
  // 
  // const geojson = {
  //   type: 'FeatureCollection',
  //     features: locjson
  // };
// 
//   const geojson : IGeoJson = {
//     type: 'FeatureCollection',
//     features: [
//       {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}},
//     ]
//   };



  return (
    <>
      <div className="sidebar">
        Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom:{" "}
        {viewport.zoom}
      </div>

      <ReactMapGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        {...viewport}
        onViewportChange={(newViewport: any) => setViewport(newViewport)}
        onClick={(e) => handleAddNewMarker(e)}
      >
        {clusterMap.locations.map((loc) => (
          <PinMarker loc={loc} viewport={viewport} />
        ))}

        <Source
          id="locations"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </ReactMapGl>

      <input
        className="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch(
            addLocation({
              name,
              id: "",
              lat: viewport.latitude,
              lon: viewport.longitude,
            })
          )
        }
      >
        addLocation location
      </button>
      <button onClick={() => dispatch(clear())}>clear</button>
      <ul>
        {clusterMap.locations.map((loc) => (
          <li>
            <p
              onClick={() => handleGoToLocation(loc)}
            >{`${loc.name}, (${loc.lat}, ${loc.lon})`}</p>

            <button onClick={() => dispatch(deleteLocation(loc))}>
              {" "}
              delete{" "}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReactMap;
