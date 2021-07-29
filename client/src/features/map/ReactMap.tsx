import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactMapGl, {
  MapEvent,
  Source,
  Layer,
  MapRef,
  NavigationControl,
  FlyToInterpolator,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addLocation,
  selectClusterMap,
  clear,
  setRenderedLocationIds,
  setFocusedLocationId,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationItem } from "./partials/LocationItem";
import { LocationPopup } from "./partials/LocationPopup";
import { GeoJSONSource, MapboxGeoJSONFeature } from "mapbox-gl";
import { easeCubic } from "d3-ease";
import { ViewportProps } from "react-map-gl";

export interface ViewportMutateProps {
  longitude: number;
  latitude: number;
  zoom: number;
}
const DEFAULT_VIEWPORT = {
  longitude: 12.53887,
  latitude: 55.64115,
  zoom: 9,
  pitch: 0,
  transitionDuration: 2000,
  transitionInterpolator: new FlyToInterpolator(),
  transitionEasing: easeCubic,
};

const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();
  const [mapBounds] = useState<{ width: string; height: string }>({
    width: "100%",
    height: "40vw",
  });
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  const mapRef = useRef<MapRef>(null);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [popupID, setPopupID] = useState<null | string>(null);

  const width = mapRef.current?.getMap().getContainer().clientWidth;
  const height = mapRef.current?.getMap().getContainer().clientHeight;

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
    const features = mapRef.current?.queryRenderedFeatures(
      [
        [0, 0],
        [width, height],
      ],
      {
        layers: ["unclustered-point", "clusters"],
      }
    );
    if (features === undefined) {
      return;
    }

    const setOfRenderedLocationIds: Set<string> = new Set();
    const clusterSource: GeoJSONSource = mapRef.current
      ?.getMap()
      .getSource("locations");

    features.forEach((current: MapboxGeoJSONFeature) => {
      if (current.layer.id === "unclustered-point") {
        setOfRenderedLocationIds.add(current.properties?.id);
      }
      if (current.layer.id === "clusters") {
        const clusterId = current.properties?.cluster_id;
        const pointCount = current.properties?.point_count;

        clusterSource.getClusterLeaves(
          clusterId,
          pointCount,
          0,
          (_, clusteredFeatures) => {
            clusteredFeatures.forEach((clusteredFeature) => {
              setOfRenderedLocationIds.add(clusteredFeature.properties?.id);
            });
          }
        );
      }
    });
    setTimeout(() => {
      dispatch(
        setRenderedLocationIds({ ids: Array.from(setOfRenderedLocationIds) })
      );
    }, 400);
  };

  const mutateViewport = (
    longitude: number,
    latitude: number,
    zoom: number
  ) => {
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    });
  };

  return (
    <div style={{ margin: "10px" }}>
      <div className="sidebar">
        Locations: {clusterMap.renderedLocationsIds.length} | Longitude:{" "}
        {viewport.longitude} | Latitude: {viewport.latitude} | Zoom:{" "}
        {viewport.zoom}
      </div>

      <ReactMapGl
        ref={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        // style="mapbox://styles/mapbox/streets-v11"
        width={mapBounds.width}
        height={mapBounds.height}
        onViewportChange={(newViewport: any) => {
          setViewport(newViewport);
          getLocationsIDSWithinViewport();
        }}
        onClick={(e) => {
          isInLocations(e) ? handlePopup(e) : handleAddNewMarker(e);
        }}
        {...viewport}
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
              coordinates: [viewport.longitude!, viewport.latitude!],
              details: details,
            })
          )
        }
      >
        add location
      </button>
      <button onClick={() => dispatch(clear())}>clear</button>

      <div>
        <p>{`Locations: ${clusterMap.renderedLocationsIds.length}`}</p>

        <div style={{ height: "8em", width: "40em", overflowY: "scroll" }}>
          <ul>
            {filterByFocusedLocation(
              clusterMap.focusedLocationID,
              clusterMap.renderedLocationsIds
            ).map((id) => {
              return (
                <LocationItem locationID={id} mutateViewport={mutateViewport} />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const filterByFocusedLocation = (id: string | null, ids: string[]) => {
  if(ids.length === 0) return [];
  if (id === null) return ids;
  return [id, ...ids.filter((_id) => _id !== id)];
};
export default ReactMap;
