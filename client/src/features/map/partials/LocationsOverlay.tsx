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

  const [isShown, setIsShown] = useState(true);

  return (
    <div className={"flex flex-row justify-end items-start m-2"}>
      <button className={`mr-2`} onClick={() => setIsShown(!isShown)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {isShown ? (
        <div
          className={`h-4/5 w-1/5 rounded-lg overflow-x-hidden overflow-y-scroll bg-white bg-opacity-60 no-scrollbar`}
        >
          {clusterMap.renderedLocationsIds.length === 0 ? (
            <p className={"m-2 text-sm"}>{"No locations to be found. Zoom and navigate to discover!"}</p>
          ) : (
            <ul className={`list-none flex-1`}>
              {filterByFocusedLocation(
                clusterMap.focusedLocationID,
                clusterMap.renderedLocationsIds
              ).map((id) => {
                return (
                  <LocationItem
                    locationID={id}
                    mutateViewport={mutateViewport}
                  />
                );
              })}
            </ul>
          )}
          <p
            className={"m-4 mb-2"}
          >{`Locations: ${clusterMap.renderedLocationsIds.length}`}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationsOverlay;
