import React, { FC, useState } from "react";
import ReactMapGl, { Marker, FlyToInterpolator } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, clear, ILocation, selectClusterMap } from "./ReactMapSlice";
import { easeCubic } from 'd3-ease';

const ReactMap: FC = () => {
  let [viewport, setViewport] = useState({
    width: 800,
    height: 600,
    latitude: 55.683839,
    longitude: 12.584787,
    zoom: 9,
    pitch: 0,
    transitionDuration: 2000,
    // transitionInterpolator: new FlyToInterpolator(),
    transitionEasing: easeCubic
  });

  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const goToLocation = (loc: ILocation) => {
    setViewport({
      ...viewport,
      latitude: loc.lat,
      longitude: loc.lon,
      zoom: 12,
    });
  };

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
      >
        {clusterMap.locations.map((loc) => (
          <Marker
            latitude={loc.lat}
            longitude={loc.lon}
            offsetTop={-(viewport.zoom * 2) / 2}
            offsetLeft={-(viewport.zoom * 2) / 2}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png"
              width={viewport.zoom * 2}
              height={viewport.zoom * 2}
            />
          </Marker>
        ))}
      </ReactMapGl>

      <input
        className="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => dispatch(add(name))}>add location</button>
      <button onClick={() => dispatch(clear())}>clear</button>
      <ul>
        {clusterMap.locations.map((loc) => (
          <li
            onClick={() => goToLocation(loc)}
          >{`${loc.name}, (${loc.lat}, ${loc.lon})`}</li>
        ))}
      </ul>
    </>
  );
};

export default ReactMap;
