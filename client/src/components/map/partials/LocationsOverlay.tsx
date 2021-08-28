import { Dispatch, FC, SetStateAction, useState } from "react";
import { NavigationControl } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
import { LocationItem } from "./LocationItem";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

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
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(true);

  return (
    <div
      className={
        "flex flex-row justify-start items-start m-2 h-4/5 max-h-4/5 min-h-4/5"
      }
    >
      {open && (
        <div
          className={`rounded shadow-lg bg-white bg-opacity-80 w-1/5 flex flex-col justify-between self-stretch mr-2 `}
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
                const loc = clusterMap.locations.features.find(i => i.id === id)
                console.log(id)
                console.log(clusterMap.locations.features[0].id)
                if(loc) {

                return (
                  <LocationItem
                    key={"li"+id}
                    location={loc}
                    mutateViewport={mutateViewport}
                  />
                );
                }
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
