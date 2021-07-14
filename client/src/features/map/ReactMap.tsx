import React, { useEffect, useState } from "react";
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
  IFeature,
  IViewport,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./partials/LocationItem";
import { easeCubic } from "d3-ease";
import { ViewportProps } from "react-map-gl";
import { LocationPopup } from "./partials/LocationPopup";

const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
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
  };

  return (
    <div style={{ margin: "10px" }}>
      <div className="sidebar">
        Longitude: {clusterMap.viewportState.longitude} | Latitude:{" "}
        {clusterMap.viewportState.latitude} | Zoom:{" "}
        {clusterMap.viewportState.zoom}
      </div>

      <ReactMapGl
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        onViewportChange={(newViewport: ViewportProps) => {
          const { longitude, latitude, zoom, pitch } = newViewport;
          dispatch(updateViewport({ longitude, latitude, zoom, pitch }));
          console.log(clusterMap.viewportState.bbox);
        }}
        width="95vw"
        height="45vw"
        onClick={(e) =>
          isInLocations(e) ? handlePopup(e) : handleAddNewMarker(e)
        }
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

      {/* move UL into locationitem component */}
      <ul>
        {clusterMap.locations.features.map((loc: IFeature) =>
          isWithinViewportBounds(loc, clusterMap.viewportState) ? (
            <LocationItem loc={loc} />
          ) : (
            <></>
          )
        )}
      </ul>
    </div>
  );
};

const isWithinViewportBounds = (loc: IFeature, viewportState: IViewport) => {
  if (loc.geometry.type !== "Point") return false;
  if (
    loc.geometry.coordinates[0] > viewportState.bbox.maxlon ||
    loc.geometry.coordinates[0] < viewportState.bbox.minlon
  )
    return false;
  if (
    loc.geometry.coordinates[1] > viewportState.bbox.maxlat ||
    loc.geometry.coordinates[1] < viewportState.bbox.minlat
  )
    return false;

  return true;
};
export default ReactMap;
