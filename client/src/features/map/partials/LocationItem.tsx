import {
  deleteLocation,
  IFeature,
  selectClusterMap,
  updateViewport,
} from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { FC } from "react";

interface ILocationItem {
  locationID: string;
}

export const LocationItem: FC<ILocationItem> = ({ locationID }) => {
  const dispatch = useAppDispatch();
  const clusterMap = useAppSelector(selectClusterMap);
  const loc = clusterMap.locations.features.filter(
    (i) => i.properties.id === locationID
  )[0];

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
    <li key={locationID}>
      <div>
        <p onClick={() => handleGoToLocation(loc)}>
          {`${loc.properties.name}, ${
            loc.geometry.type === "Point" ? loc.geometry.coordinates : ""
          }`}
        </p>

        <button onClick={() => dispatch(deleteLocation({ id: locationID }))}>
          {" "}
          delete{" "}
        </button>
      </div>
    </li>
  );
};
