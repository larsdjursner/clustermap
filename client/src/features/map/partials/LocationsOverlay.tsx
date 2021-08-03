import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
import { LocationItem } from "./LocationItem";

const filterByFocusedLocation = (id: string | null, ids: string[]) => {
  if (id === null || !ids.includes(id)) return ids;
  return [id, ...ids.filter((_id) => _id !== id)];
};

interface ILocationsOverlay {
  mutateViewport: (longitude: number, latitude: number, zoom: number) => void;
}

const LocationsOverlay: FC<ILocationsOverlay> = ({ mutateViewport }) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  return (
    <div className="h-4/5 w-1/5 fixed top-0 right-0 overflow-x-hidden overflow-y-scroll bg-gray-100 bg-opacity-60 no-scrollbar">
      <p>{`Locations: ${clusterMap.renderedLocationsIds.length}`}</p>

      <ul style={{ listStyleType: "none" }}>
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
  );
};

export default LocationsOverlay;
