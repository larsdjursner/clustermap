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
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./partials/LocationItem";
import { LocationPopup } from "./partials/LocationPopup";
import { GeoJSONSource, MapboxGeoJSONFeature } from "mapbox-gl";

interface SetIDS {
  currentIds: Set<string>;
}
const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();
  const [mapBounds, _] = useState<{ width: string; height: string }>({
    width: "100%",
    height: "40vw",
  });

  const mapRef = useRef<MapRef>(null);

  const [ids, setIds] = useState<SetIDS>({ currentIds: new Set() });

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

  const getLocationsIDSWithinViewport = () => {
    const width = mapRef.current?.getMap().getContainer().clientWidth;
    const height = mapRef.current?.getMap().getContainer().clientHeight;

    const features = mapRef.current?.queryRenderedFeatures(
      [
        [width / 2 - width / 2, height / 2 - height / 2],
        [width / 2 + width / 2, height / 2 + height / 2],
      ],
      {
        layers: ["unclustered-point", "clusters"],
      }
    );
    if (features === undefined) {
      return;
    }

    setIds({ currentIds: new Set() });

    const clusterSource: GeoJSONSource = mapRef.current
      ?.getMap()
      .getSource("locations");

    features.forEach((current: MapboxGeoJSONFeature) => {
      if (current.layer.id === "unclustered-point") {
        setIds({
          ...ids,
          currentIds: ids.currentIds.add(current.properties?.id),
        });
      }
      if (current.layer.id === "clusters") {
        const clusterId = current.properties?.cluster_id;
        const pointCount = current.properties?.point_count;

        clusterSource.getClusterLeaves(clusterId, pointCount, 0, (_, feats) => {
          feats.forEach((curr) => {
            setIds({
              ...ids,
              currentIds: ids.currentIds.add(curr.properties?.id),
            });
          });
        });
      }
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
        width={mapBounds.width}
        height={mapBounds.height}
        onViewportChange={(newViewport: ViewportProps) => {
          const { longitude, latitude, zoom, pitch } = newViewport;

          getLocationsIDSWithinViewport();
          dispatch(updateViewport({ longitude, latitude, zoom, pitch }));
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

      <div>
        <p>{`Locations: ${ids.currentIds.size}`}</p>

        <div style={{ height: "8em", width: "40em", overflowY: "scroll" }}>
          <ul>
            {Array.from(ids.currentIds).map((id: string) => {
              return <LocationItem locationID={id} />;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReactMap;
