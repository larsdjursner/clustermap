import { FC, useState } from "react";
import { NavigationControl } from "react-map-gl";
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
    <div
      className={
        "flex flex-row justify-end items-start m-2 h-4/5 max-h-4/5 min-h-4/5"
      }
    >
      <div className={"flex flex-col justify-start"}>
        <button className={"self-baseline mb-2"} onClick={() => setIsShown(!isShown)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
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
        <div className={" self-baseline"}>
          <NavigationControl />
        </div>
      </div>

      {isShown ? (
        <div
          className={`rounded shadow-lg bg-white bg-opacity-80 w-1/5 flex flex-col justify-between self-stretch ml-2`}
        >
          {clusterMap.renderedLocationsIds.length === 0 ? (
            <p className={"m-4 text-sm"}>
              {"No locations to be found. Zoom and navigate to discover!"}
            </p>
          ) : (
            <ul
              className={`list-none h-full flex-1 overflow-y-scroll overflow-x-hidden`}
            >
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
            className={"m-4 text-sm"}
          >{`Locations: ${clusterMap.renderedLocationsIds.length}`}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationsOverlay;
