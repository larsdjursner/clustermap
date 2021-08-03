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
    <div
      className={}
      // style={{
      //   height: "100%",
      //   width: "20%",
      //   position: "fixed",
      //   top: "0",
      //   right: "0",
      //   backgroundColor: "white",
      //   opacity: "60%",
      //   overflowY: "scroll",
      //   overflowX: "hidden",
      // }}
    >
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
