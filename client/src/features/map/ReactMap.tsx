import React, { useRef, useState } from "react";
import ReactMapGl, {
  MapEvent,
  Source,
  Layer,
  MapRef,
  NavigationControl,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addLocation,
  selectClusterMap,
  clear,
  updateViewport,
  IFeature,
  IViewport,
  IFeatureCollection,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./partials/LocationItem";
import { ViewportProps } from "react-map-gl";
import { LocationPopup } from "./partials/LocationPopup";

const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const mapRef = useRef<MapRef>(null);

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [popupID, setPopupID] = useState<null | string>(null);

  const isInLocations = (e: MapEvent) => {
    return clusterMap.locations.features
      .map((i) => i.properties.id)
      .includes(e.features?.[0]?.properties.id);
  };

  const handlePopup = (e: MapEvent): void => {
    setPopupID(e.features?.[0]?.properties.id);
  };

  const handleAddNewMarker = (e: MapEvent): void => {
    e.preventDefault();
    setPopupID(null);
    if (!e.rightButton) return;

    const [lon, lat] = e.lngLat;
    dispatch(addLocation({ name: "test", coordinates: [lon, lat] }));

    // console.log((mapRef.current?.getMap()));
    // var currents = mapRef.current?.queryRenderedFeatures([
    //   [window.innerWidth/2, window.innerHeight/2],
    //   [window.innerWidth/2, window.innerHeight/2],
    // ], {layers: ["unclustered-point"]});
    // console.log(currents);
  };

  return (
    <div style={{ margin: "10px" }}>
      <div className="sidebar">
        Longitude: {clusterMap.viewportState.longitude} | Latitude:{" "}
        {clusterMap.viewportState.latitude} | Zoom:{" "}
        {clusterMap.viewportState.zoom}
      </div>

      <ReactMapGl
        ref={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        width="100%"
        height="40vw"
        onViewportChange={(newViewport: ViewportProps) => {
          const { longitude, latitude, zoom, pitch } = newViewport;
          dispatch(updateViewport({ longitude, latitude, zoom, pitch }));
        }}
        onClick={(e) => {
          // if (mapRef.current?.queryRenderedFeatures(e.point).length) {
          //   handlePopup(e);
          // } else {
          handleAddNewMarker(e);
          // }
          // isInLocations(e) ? handlePopup(e) : handleAddNewMarker(e)
        }}
        onHover={(e) => {
          const [x, y] = e.point;
          console.log(e.point);
          console.log(
            mapRef.current?.queryRenderedFeatures(
              [
                [x - 50, y - 50],
                [x + 50, y + 50],
              ],
              {
                layers: ["unclustered-point"],
              }
            )
          );
        }}

        //need to find the dom nodes x and y and then create and array of the maximal corners
        {...clusterMap.viewportState}
      >
        {popupID !== null ? (
          <LocationPopup id={popupID} toggle={setPopupID} />
        ) : (
          <></>
        )}

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
        <NavigationControl />
      </ReactMapGl>

      <input
        className="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
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
              details: details,
            })
          )
        }
      >
        add location
      </button>
      <button onClick={() => dispatch(clear())}>clear</button>

      {/* move UL into locationitem component */}
      <div style={{ maxHeight: "20px", height: "20px" }}>
        <ul style={{ overflowY: "scroll" }}>
          {/* {clusterMap.locations.features.map((loc: IFeature) => (
            <LocationItem loc={loc} key={loc.properties.id} />
          ))} */}
          {/* {
            mapRef.current?.queryRenderedFeatures([
              clusterMap.viewportState.longitude!,
              clusterMap.viewportState.latitude!,
            ])
            .map((loc: IFeature) => (
              <LocationItem loc={loc} key={loc.properties.id} />
            ))} */}
        </ul>
      </div>
    </div>
  );
};

export default ReactMap;
