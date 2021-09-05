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
import LocationsOverlay from "./partials/LocationsOverlay";
import { LocationItemStatic } from "./partials/LocationItemStatic";
import { fetchLocationFeatures } from "./mapService";
import CreateLocationOverlay from "./partials/CreateLocationOverlay";
import Overlay from "./partials/Overlay";
import { LocationMarkerIcon } from "@heroicons/react/solid";

export type UnclusteredFeature = {
  id: string;
} & MapboxGeoJSONFeature;
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
  const [settings, setSettings] = useState({
    scrollZoom: true,
  });

  const mapRef = useRef<MapRef>(null);
  const [popupID, setPopupID] = useState<null | string>(null);

  const width = mapRef.current?.getMap().getContainer().clientWidth;
  const height = mapRef.current?.getMap().getContainer().clientHeight;

  const isInLocations = (e: MapEvent): boolean => {
    return clusterMap.locations.features
      .map((i) => i.id)
      .includes(e.features?.[0]?.id);
  };

  const handlePopup = (e: MapEvent): void => {
    if (isInLocations(e)) {
      setPopupID(e.features?.[0]?.id);
      return;
    }
    setPopupID(null);
  };

  const handleOnClick = (e: MapEvent): void => {
    if (clusterMap.createLocationMode) {
      handleCreateLocation(e);
      return;
    }
    // handleFocus(e);
  };
  const handleFocus = (e: MapEvent): void => {
    if (isInLocations(e)) {
      const id = e.features?.[0]?.id;
      dispatch(setFocusedLocationId({ id: id }));
    }
  };

  const handleCreateLocation = (e: MapEvent): void => {
    console.log(e.lngLat);
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
  }, [dispatch]);

  //add skeleton loading for list
  useEffect(() => {
    if (clusterMap.status == "idle") {
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
          const feature = clusterMap.locations.features.find(
            (i) =>
              i.properties.name === current.properties?.name &&
              i.properties.createdAt === current.properties?.createdAt
          ); //super unsatisfying hack until id can be properly assigned to locations through mapbox api
          if (feature) {
            setOfRenderedLocationIds.add(feature?.id!);
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
              clusteredFeatures.map((clusteredFeature) => {
                const feature = clusteredFeature as IFeature;
                return setOfRenderedLocationIds.add(feature.id);
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
    }
  }, [viewport, dispatch]);

  return (
    <ReactMapGl
      className={"overflow-hidden absolute"}
      ref={mapRef}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!}
      // style={"mapbox://styles/mapbox/streets-v11"}
      width={mapBounds.width}
      height={mapBounds.height}
      onViewportChange={(newViewport: any) => {
        setViewport(newViewport);
      }}
      onHover={(e) => handlePopup(e)}
      onClick={(e) => handleOnClick(e)}
      {...viewport}
      {...settings}
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

      <Overlay>
        <LocationsOverlay
          mutateViewport={mutateViewport}
          setSettings={setSettings}
        />
        <CreateLocationOverlay />
      </Overlay>

      {clusterMap.createLocationCoordinates && (
        <Marker
          longitude={clusterMap.createLocationCoordinates[0]}
          latitude={clusterMap.createLocationCoordinates[1]}
          offsetLeft={-15}
          offsetTop={-25}
        >
          <LocationMarkerIcon  className={"h-7 w-7"}/>
        </Marker>
      )}

      {clusterMap.focusedLocationID && (
        <LocationItemStatic locationID={clusterMap.focusedLocationID} />
      )}
      {popupID !== null && (
        <LocationPopup id={popupID} setPopupId={setPopupID} />
      )}
    </ReactMapGl>
  );
};

export default ReactMap;
