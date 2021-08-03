import {
  deleteLocation,
  IFeature,
  selectClusterMap,
  setFocusedLocationId,
} from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { FC, useState } from "react";

interface ILocationItem {
  locationID: string;
  mutateViewport: (longitude: number, latitude: number, zoom: number) => void;
}

export const LocationItem: FC<ILocationItem> = ({
  locationID,
  mutateViewport,
}) => {
  const dispatch = useAppDispatch();
  const clusterMap = useAppSelector(selectClusterMap);
  const loc = clusterMap.locations.features.filter(
    (i) => i.properties.id === locationID
  )[0];

  const [isHover, setIsHover] = useState(false);

  const handleGoToLocation = (loc: IFeature) => {
    if (loc.geometry.type !== "Point") return;

    dispatch(setFocusedLocationId({ id: locationID }));
    mutateViewport(
      loc.geometry.coordinates[0],
      loc.geometry.coordinates[1],
      12
    );
  };

  return (
    <div
      onMouseEnter={(e) => setIsHover(true)}
      onMouseLeave={(e) => setIsHover(false)}
    >
      {loc ? (
        <li key={locationID}>
          <div style={{ background: isHover ? "gray" : "white", opacity: "100%"}}>
            <p onClick={() => handleGoToLocation(loc)}>
              {clusterMap.focusedLocationID === locationID ? (
                <b>{loc.properties.name}</b>
              ) : (
                <>{loc.properties.name}</>
              )}
            </p>
            <p>{loc.properties.details}</p>
          </div>
        </li>
      ) : (
        <></>
      )}
    </div>
  );
};
