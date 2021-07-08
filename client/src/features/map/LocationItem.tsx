import { deleteLocation, IFeature, selectClusterMap, updateViewport } from "./ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React, { FC } from "react";

interface ILocationItem {
  loc: IFeature
}

export const LocationItem : FC<ILocationItem> = ({loc}) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const handleGoToLocation = (loc: IFeature) => {
    if (loc.geometry.type !== "Point") return;
  
    updateViewport({
      ...clusterMap.viewport,
      latitude: loc.geometry.coordinates[0],
      longitude: loc.geometry.coordinates[1],
      zoom: 12,
    });
  };
  
  return (
    <li>
      <p onClick={() => handleGoToLocation(loc)}>
        {`${loc.properties.name}, ${
          loc.geometry.type === "Point" ? loc.geometry.coordinates : ""
        }`}
      </p>

      <button onClick={() => dispatch(deleteLocation(loc))}> delete </button>
    </li>
  );
};
