import { useEffect, useRef, useState } from "react";
import ReactMapGl, {
  MapEvent,
  Source,
  Layer,
  MapRef,
  FlyToInterpolator,
  Marker,
} from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createLocationAsync,
  IFeature,
  selectClusterMap,
  setCreateLocationCoordinates,
  setFocusedLocationId,
  setLocationsAPI,
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
import { LocationItemStatic } from "./partials/LocationItemStatic";
import { fetchLocationFeatures } from "./mapService";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import OverlayShowLocations from "./partials/OverlayShowLocations";
import OverlayCreateLocations from "./partials/OverlayCreateLocations";
import { selectAuth } from "../sessions/AuthSlice";

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
  width: "100vw",
  height: "100vh",
};

const ReactMap = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const auth = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  const mapRef = useRef<MapRef>(null);
  const [popupID, setPopupID] = useState<null | string>(null);

  const isInRenderedFeatures = (e: MapEvent): boolean => {
    return clusterMap.renderedLocationsIds.includes(
      e.features?.[0].properties.featureId
    );
  };

  const handlePopup = (e: MapEvent): void => {
    if (isInRenderedFeatures(e)) {
      const id = e.features?.[0]?.properties.featureId;
      dispatch(setFocusedLocationId({ id: id }));
      setPopupID(id);
      console.log(popupID);
      return;
    }
    setPopupID(null);
    console.log(popupID);
    return;
  };

  const handleOnClick = (e: MapEvent): void => {
    if (clusterMap.createLocationMode) {
      handleCreateLocation(e);
      return;
    }
    handlePopup(e);
  };

  const handleCreateLocation = (e: MapEvent): void => {
    dispatch(setCreateLocationCoordinates({ coords: e.lngLat }));
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

  useEffect(() => {
    fetchLocationFeatures().then((res: IFeature[]) => {
      dispatch(setLocationsAPI({ locations: res }));
    });
  }, []);

  //add skeleton loading for list
  useEffect(() => {
    if (clusterMap.status === "idle") {
      const features = mapRef.current?.queryRenderedFeatures(
        [
          [0, 0],
          [
            mapRef.current?.getMap().getContainer().clientWidth,
            mapRef.current?.getMap().getContainer().clientHeight,
          ],
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
          const feature = clusterMap.locations.features.find(
            (i) => i.properties.featureId === current.properties?.featureId
          );
          if (feature) {
            setOfRenderedLocationIds.add(feature.properties.featureId);
          }
        }
        if (current.layer.id === "clusters") {
          const clusterId = current.properties?.cluster_id;
          const pointCount = current.properties?.point_count;

          clusterSource.getClusterLeaves(
            clusterId,
            pointCount,
            0,
            (_, clusteredFeatures) => {
              clusteredFeatures?.map((clusteredFeature) => {
                const feature = clusteredFeature as IFeature;
                return setOfRenderedLocationIds.add(
                  feature.properties.featureId
                );
              });
            }
          );
        }
      });
      setTimeout(() => {
        dispatch(
          setRenderedLocationIds({ ids: Array.from(setOfRenderedLocationIds) })
        );
      }, 500);
    }
  }, [viewport]);

  return (
    <>
      <ReactMapGl
        className={"overflow-hidden "}
        ref={mapRef}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={(newViewport: any) => {
          setViewport(newViewport);
        }}
        onClick={(e) => handleOnClick(e)}
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

        {clusterMap.createLocationCoordinates && (
          <Marker
            longitude={clusterMap.createLocationCoordinates[0]}
            latitude={clusterMap.createLocationCoordinates[1]}
            offsetLeft={-15}
            offsetTop={-25}
          >
            <LocationMarkerIcon
              className={"h-7 w-7 stroke-current text-white"}
            />
          </Marker>
        )}

        {popupID && (
          <LocationPopup featureId={popupID} setPopupId={setPopupID} />
        )}
      </ReactMapGl>

      <OverlayShowLocations mutateViewport={mutateViewport} />
      <OverlayCreateLocations mutateViewport={mutateViewport} />
    </>
  );
};

export default ReactMap;
