import React, { FC, useState } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, clear, selectClusterMap } from "./ReactMapSlice";

// mapboxgl.accessToken = (process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!);
const ReactMap: FC = () => {
  let [viewport, setViewport] = useState({
    width: 800,
    height: 600,
    latitude: 55.683839,
    longitude: 12.584787,
    zoom: 9,
    pitch: 0,
  });

  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

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
          <li>{`${loc.name}, (${loc.lat}, ${loc.lon})`}</li>
        ))}
      </ul>
    </>
  );
};

export default ReactMap;
