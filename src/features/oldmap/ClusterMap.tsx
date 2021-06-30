import React, { FC, useEffect, useRef, useState } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { add, selectClusterMap } from "../map/ReactMapSlice";

mapboxgl.accessToken = (process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!);


const ClusterMap: FC = () => {
  //fix typings here
  const mapContainer: any = useRef(null);
  const map: any = useRef(null);

  const [lat, setLat] = useState(55.683839);
  const [lng, setLng] = useState(12.584787);
  const [zoom, setZoom] = useState(9);

  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  useEffect(() => {
    console.log("rerender");
    if (map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    return () => {
      map.current = null;
      mapContainer.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  // useEffect(() => {
  //   map.current.on("load", () => {
  //     map.addSource("canvas-source", {
  //       type: "canvas",
  //       canvas: "canvasID",
  //       coordinates: [
  //         [91.4461, 21.5006],
  //         [100.3541, 21.5006],
  //         [100.3541, 13.9706],
  //         [91.4461, 13.9706],
  //       ],
  //       // Set to true if the canvas source is animated. If the canvas is static, animate should be set to false to improve performance.
  //       animate: true,
  //     });
  //   });
  // }, [clusterMap.locations]);

  return (
    <div className="parent-container">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      <input
        className="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => dispatch(add(name))}>add location</button>
      <ul>
        {clusterMap.locations.map((loc) => (
          <li>{`${loc.name}, (${loc.lat}, ${loc.lon})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClusterMap;
