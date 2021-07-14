import {
  deleteLocation,
  IFeature,
  updateViewport,
} from "../ReactMapSlice";
import { useAppDispatch } from "../../../app/hooks";
import React, { FC } from "react";

interface ILocationItem {
  loc: IFeature;
}

export const LocationItem: FC<ILocationItem> = ({ loc }) => {
  const dispatch = useAppDispatch();

  const handleGoToLocation = (loc: IFeature) => {
    if (loc.geometry.type !== "Point") return;

    dispatch(
      updateViewport({
        longitude: loc.geometry.coordinates[0],
        latitude: loc.geometry.coordinates[1],
        zoom: 12,
      })
    );
  };

  return (
    <li key={loc.id}>
      <p onClick={() => handleGoToLocation(loc)}>
        {`${loc.properties.name}, ${
          loc.geometry.type === "Point" ? loc.geometry.coordinates : ""
        }`}
      </p>

      <button onClick={() => dispatch(deleteLocation(loc))}> delete </button>
    </li>
  );
};
