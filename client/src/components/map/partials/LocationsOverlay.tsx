import { Dispatch, FC, SetStateAction, useState } from "react";
import { NavigationControl } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
import { LocationItem } from "./LocationItem";
import { ReactComponent as LeftChevronIcon } from "../../../icons/LeftChevron.svg";
import { ReactComponent as RightChevronIcon } from "../../../icons/RightChevron.svg";

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
        "flex flex-row justify-end items-start m-2 h-4/5 max-h-4/5 min-h-4/5"
      }
    >
      <div className={"flex flex-col justify-start"}>
        <button
          title="Toggle Sidebar"
          className={
            "self-baseline mb-2 focus:outline-none hover:scale-110 transform"
          }
          onClick={() => setOpen(!open)}
        >
          {open ? <RightChevronIcon /> : <LeftChevronIcon />}
        </button>
        <div className={"self-baseline"}>
          <NavigationControl />
        </div>
      </div>

      {open ? (
        <div
          className={`rounded shadow-lg bg-white bg-opacity-80 w-1/5 flex flex-col justify-between self-stretch ml-2 `}
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
