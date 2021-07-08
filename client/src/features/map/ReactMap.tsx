import React, { useState } from "react";
import ReactMapGl, {
  MapEvent,
  Source,
  Layer,
  FlyToInterpolator,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addLocation,
  selectClusterMap,
  clear,
  updateViewport,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./LocationItem";
import { easeCubic } from "d3-ease";
import { ViewportProps } from "react-map-gl";

const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  // const [viewport, setViewport] = useState({
  //   width: 1000,
  //   height: 600,
  //   longitude: 12.584787,
  //   latitude: 55.683839,
  //   zoom: 9,
  //   pitch: 0,
  // });

  const handleAddNewMarker = (e: MapEvent): void => {
    e.preventDefault();
    if (!e.rightButton) return;

    const [lon, lat] = e.lngLat;
    dispatch(addLocation({ name: "test", coordinates: [lon, lat] }));
  };

  return (
    <>
      <div className="sidebar">
        Longitude: {clusterMap.viewportState.longitude} | Latitude:{" "}
        {clusterMap.viewportState.latitude} | Zoom:{" "}
        {clusterMap.viewportState.zoom}
      </div>

      <ReactMapGl
        // transitionDuration={2000}
        // transitionInterpolator={new FlyToInterpolator()}
        // transitionEasing={easeCubic}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        onViewportChange={(newViewport: ViewportProps) => {
          const { longitude, latitude, zoom, pitch } = newViewport;
          dispatch(updateViewport({ longitude, latitude, zoom, pitch }));
        }}
        onClick={(e) => handleAddNewMarker(e)}
        {...clusterMap.viewportState}
      >
        <Source
          id="locations"
          type="geojson"
          data={clusterMap.locations}
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
              name: name,
              coordinates: [
                clusterMap.viewportState.longitude!,
                clusterMap.viewportState.latitude!,
              ],
            })
          )
        }
      >
        add location
      </button>
      <button onClick={() => dispatch(clear())}>clear</button>
      <ul>
        {clusterMap.locations.features.map((loc) => (
          <LocationItem loc={loc} />
        ))}
      </ul>
    </>
  );
};

export default ReactMap;
