import React, { FC, useState } from "react";
import ReactMapGl, {
  FlyToInterpolator,
  MapEvent,
  Source,
  Layer,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addLocation,
  Coordinate,
  ILocation,
  selectClusterMap,
  clear,
  deleteLocation,
} from "./ReactMapSlice";
import { easeCubic } from "d3-ease";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";

export interface IFeature extends GeoJSON.Feature {
  properties: {
    name: string;
  };
}

export interface IFeatureCollection extends GeoJSON.FeatureCollection {
  features: IFeature[];
}

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

  const handleGoToLocation = (loc: IFeature) => {
    if(loc.geometry.type !== 'Point') return;

    setViewport({
      ...viewport,
      latitude: loc.geometry.coordinates[0],
      longitude: loc.geometry.coordinates[1],
      zoom: 12,
    });
  };

  function handleAddNewMarker(e: MapEvent): void {
    e.preventDefault();
    if (!e.rightButton) return;

    const [lon, lat] = e.lngLat;
    dispatch(addLocation({ name: "test", id: "", lat, lon }));
  }

  return (
    <>
      <div className="sidebar">
        Latitude: {viewport.latitude} |  Longitude: {viewport.longitude} | Zoom:{" "}
        {viewport.zoom}
      </div>

      <ReactMapGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        {...viewport}
        onViewportChange={(newViewport: any) => setViewport(newViewport)}
        onClick={(e) => handleAddNewMarker(e)}
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
              name,
              id: "",
              lat: viewport.latitude,
              lon: viewport.longitude,
            })
          )
        }
      >
        add location
      </button>
      <button onClick={() => dispatch(clear())}>clear</button>
      <ul>
        {clusterMap.locations.features.map((loc) => (
          <li>
            <p onClick={() => handleGoToLocation(loc)}>
              {`${loc.properties.name}`}
            </p>

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
