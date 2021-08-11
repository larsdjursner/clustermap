import { useCallback, useMemo, useRef, useState } from "react";
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
  setFocusedLocationId,
  setRenderedLocationIds,
} from "./ReactMapSlice";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { LocationPopup } from "./partials/LocationPopup";
import { GeoJSONSource, MapboxGeoJSONFeature } from "mapbox-gl";
import { easeCubic } from "d3-ease";
import LocationsOverlay from "./partials/LocationsOverlay";
import NavBar from "../nav/NavBar";
import { LocationItemStatic } from "./partials/LocationItemStatic";

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
    height: "55vw",
  });
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  const mapRef = useRef<MapRef>(null);
  const [popupID, setPopupID] = useState<null | string>(null);

  const width = mapRef.current?.getMap().getContainer().clientWidth;
  const height = mapRef.current?.getMap().getContainer().clientHeight;

  const isInLocations = (e: MapEvent) => {
    return clusterMap.locations.features
      .map((i) => i.properties.id)
      .includes(e.features?.[0]?.properties.id);
  };

  const handlePopup = (e: MapEvent): void => {
    if (isInLocations(e)) {
      setPopupID(e.features?.[0]?.properties.id);
      return;
    }
    setPopupID(null);
  };

  const handleFocus = (e: MapEvent): void => {
    if (isInLocations(e)) {
      const id = e.features?.[0]?.properties.id;
      dispatch(setFocusedLocationId({ id: id }));
      return;
    }
    handleAddNewMarker(e);
  };

  const handleAddNewMarker = (e: MapEvent): void => {
    e.preventDefault();
    setPopupID(null);
    if (!e.rightButton) return;
    dispatch(addLocation({ name: "test", coordinates: e.lngLat }));
  };

  useMemo(() => {
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
    }, 200);
  }, [viewport]);

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
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    });
  };
  return (
    <>
      <NavBar />

      <ReactMapGl
        className={"overflow-hidden"}
        ref={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        // style={"mapbox://styles/mapbox/streets-v11"}
        width={mapBounds.width}
        height={mapBounds.height}
        onViewportChange={(newViewport: any) => {
          setViewport(newViewport);
          // getLocationsIDSWithinViewport();
        }}
        onHover={(e) => handlePopup(e)}
        onClick={(e) => handleFocus(e)}
        {...viewport}
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

        <LocationsOverlay mutateViewport={mutateViewport} />
        {clusterMap.focusedLocationID ? (
          <LocationItemStatic locationID={clusterMap.focusedLocationID} />
        ) : (
          <></>
        )}

        {popupID !== null ? (
          <LocationPopup id={popupID} setPopupId={setPopupID} />
        ) : (
          <></>
        )}
      </ReactMapGl>

      {/* <input
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
      <button onClick={() => dispatch(clear())}>clear</button> */}
    </>
  );
};

export default ReactMap;
