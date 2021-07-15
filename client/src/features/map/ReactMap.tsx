import React, { useRef, useState } from "react";
import ReactMapGl, {
  MapEvent,
  Source,
  Layer,
  MapRef,
  NavigationControl,
  ViewportProps,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addLocation,
  selectClusterMap,
  clear,
  updateViewport,
  IFeature,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./partials/LocationItem";
import { LocationPopup } from "./partials/LocationPopup";
import { GeoJSONSource } from "mapbox-gl";
import { Feature, Geometry } from "geojson";

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

          const features = mapRef.current?.queryRenderedFeatures(
            [
              [x + 800 / 2, y + 800 / 2],
              [x - 800 / 2, y - 800 / 2],
            ],
            {
              layers: [
                "unclustered-point",
                //  "cluster-count",
                "clusters",
              ],
            }
          );
          if (features === undefined) return;

          const clusterSource: GeoJSONSource = mapRef.current
            ?.getMap()
            .getSource("locations");

          const getLocationIDSFromCluster = (
            clusterId: number,
            pointCount: number
          ): string[] => {
            const idsToReturn: string[] = [];
            clusterSource.getClusterLeaves(
              clusterId,
              pointCount,
              0,
              (_, feats) => {
                feats.map((feat: Feature) =>
                  idsToReturn.push(feat.properties!.id)
                );
              }
            );

            return idsToReturn;
          };

          const idArray = features.map((current) => {
            if (current.layer.id === "unclustered-point") {
              return [current.properties.id];
            }
            if (current.layer.id === "clusters") {
              const clusterId = current.properties.cluster_id;
              const pointCount = current.properties.point_count;

              return getLocationIDSFromCluster(clusterId, pointCount);
            }
          });

          console.log(idArray);
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
          {
            // clusterMap.locations.features
            //   .filter((loc) =>
            //     mapRef.current
            //       ?.queryRenderedFeatures(
            //         [
            //           [665 - 665 / 2, 266 - 266 / 2],
            //           [665 + 665 / 2, 266 + 266 / 2],
            //         ],
            //         {
            //           layers: [
            //             // "unclustered-point",
            //             //  "clusters"
            //           ],
            //         }
            //       )
            //       .map((i) => i.properties.id)
            //       ?.includes(loc)
            //   )
            //   .map((loc: IFeature) => (
            //     <LocationItem loc={loc} key={loc.properties.id} />
            //   ))
            // clusterMap.locations.features.map((loc: IFeature) => (
            //   <LocationItem loc={loc} key={loc.properties.id} />
            // ))
          }
        </ul>
      </div>
    </div>
  );
};

export default ReactMap;
