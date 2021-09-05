import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { NavigationControl } from "react-map-gl";
import { useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
import { LocationItem } from "./LocationItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import CreateLocationOverlay from "./CreateLocationOverlay";

const filterByFocusedLocation = (id: string | null, ids: string[]) => {
  if (id === null || !ids.includes(id)) return ids;
  return [id, ...ids.filter((_id) => _id !== id)];
};

interface ILocationsOverlay {
  mutateViewport: (longitude: number, latitude: number, zoom: number) => void;
  setSettings: Dispatch<SetStateAction<{ scrollZoom: boolean }>>;
}

const LocationsOverlay: FC<ILocationsOverlay> = ({
  mutateViewport,
  setSettings,
}) => {
  const clusterMap = useAppSelector(selectClusterMap);

  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(false);
  }, [clusterMap.createLocationMode]);
  return (
    <div
      className={
        "flex items-start w-full"
      }
    >
        {open && (
          <div
            className={`rounded shadow-lg bg-white bg-opacity-80 flex flex-col justify-between self-stretch mr-2 w-1/4`}
            onMouseEnter={() => setSettings({ scrollZoom: false })}
            onMouseLeave={() => setSettings({ scrollZoom: true })}
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
                      key={"li" + id}
                      locationId={id}
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
        )}
        <div className={"flex flex-col justify-start"}>
          <button
            title="Toggle Sidebar"
            className={
              "self-baseline mb-2 focus:outline-none hover:scale-110 transform"
            }
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <ChevronLeftIcon className={"h-7 w-7"} />
            ) : (
              <ChevronRightIcon className={"h-7 w-7"} />
            )}
          </button>
          <div className={"self-baseline"}>
            <NavigationControl />
          </div>
        </div>
    </div>
  );
};

export default LocationsOverlay;
