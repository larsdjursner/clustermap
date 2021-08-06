import {
  IFeature,
  selectClusterMap,
  setFocusedLocationId,
} from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { FC, useState } from "react";
import temp from "../../../assets/temp.jpg";

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
  const isFocus = clusterMap.focusedLocationID === locationID;

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
      className={`p-2 m-2 h-24 rounded flex flex-row justify-between ${
        isFocus ? "bg-gray-100" : ""
      }
      transition duration-200 transform hover:bg-gray-200 hover:scale-105 hover:border-gray-700
      `}
    >
      <div className={`w-1/4`}>
        <img className="rounded shadow-lg object-scale-down" src={temp} />
      </div>

      <div className={`flex flex-col w-3/4 mx-2`}>
        <p
          className={` text-sm
            ${isFocus ? "font-bold" : ""}`}
        >
          {loc.properties.name}
        </p>
        <p className={"text-xs"}>{loc.properties.details}</p>
      </div>
    </li>
  );
};
