import { useRef, useState } from "react";
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
  setClusteredIDS,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./partials/LocationItem";
import { LocationPopup } from "./partials/LocationPopup";
import { GeoJSONSource, MapboxGeoJSONFeature } from "mapbox-gl";

const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const mapRef = useRef<MapRef>(null);
  const [ids, setIds] = useState<string[]>([]);

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

  const getLocationsIDSWithinViewport = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const features = mapRef.current?.queryRenderedFeatures(
      [
        [x - width / 2, y - height / 2],
        [x + width / 2, y + height / 2],
      ],
      {
        layers: ["unclustered-point", "clusters"],
      }
    );
    if (features === undefined) {
      return;
    }

    if (features.length === 0) {
      dispatch(setClusteredIDS({ s: [], s2: [] }));
      return;
    }

    const clusterSource: GeoJSONSource = mapRef.current
      ?.getMap()
      .getSource("locations");

    const unclusteredIDS: string[] = [];

    features.forEach((current: MapboxGeoJSONFeature) => {
      if (current.layer.id === "unclustered-point") {
        unclusteredIDS.push(current.properties?.id);
      }
      if (current.layer.id === "clusters") {
        const clusterId = current.properties?.cluster_id;
        const pointCount = current.properties?.point_count;
        getLocationIDSFromCluster(
          clusterId,
          pointCount,
          clusterSource,
          unclusteredIDS
        );
      }
    });
    // console.log(clusterMap.clusteredids);
    // return rendered;
  };

  const getLocationIDSFromCluster = (
    clusterId: number,
    pointCount: number,
    clusterSource: GeoJSONSource,
    unclusteredIDS: string[]
  ) => {
    clusterSource.getClusterLeaves(clusterId, pointCount, 0, (_, feats) => {
      const temp = feats.map((curr) => {
        return curr.properties?.id;
      });
      dispatch(setClusteredIDS({ s: temp, s2: unclusteredIDS }));
    });
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
        // style="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="40vw"
        onViewportChange={(newViewport: ViewportProps) => {
          const { longitude, latitude, zoom, pitch, width, height } =
            newViewport;

          dispatch(updateViewport({ longitude, latitude, zoom, pitch }));
          getLocationsIDSWithinViewport(
            width! / 2,
            height! / 2,
            width!,
            height!
          );
          console.log("");
          clusterMap.clusteredids.forEach((i) => console.log(i));
        }}
        onClick={(e) => {
          isInLocations(e) ? handlePopup(e) : handleAddNewMarker(e);
        }}
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

      <div style={{ maxHeight: "20px", height: "20px" }}>
        <ul>
          {clusterMap.clusteredids.map((id) => {
            <LocationItem locationID={id} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReactMap;
