import {
  deleteLocation,
  IFeature,
  selectClusterMap,
  setFocusedLocationId,
} from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { FC, useState } from "react";
import temp from "../../../assets/temp.jpg"

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
    <li
      key={locationID}
      onClick={() => handleGoToLocation(loc)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`p-2 m-2 rounded-lg ${isHover ? "bg-gray-200" : ""}`}
      >
        {/* <img
          className={"object-scale-down flex-initial"}
          src={temp}
        /> */}
        <p
          className={`
            ${clusterMap.focusedLocationID === locationID ? "font-bold" : ""}`}
        >
          {loc.properties.name}
        </p>
        <p className={"text-xs"}>{loc.properties.details}</p>
      </div>
    </li>
  );
};
