import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
import { LocationItem } from "./LocationItem";

export interface IOverlayChildLocations {
  mutateViewport: (longitude: number, latitude: number, zoom: number) => void;
}

const filterByFocusedLocation = (id: string | null, ids: string[]) => {
  if (id === null || !ids.includes(id)) return ids;
  return [id, ...ids.filter((_id) => _id !== id)];
};

const OverlayShowLocations: FC<IOverlayChildLocations> = ({
  mutateViewport,
}) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const [open, setOpen] = useState(true);

  return (
    <div className={"absolute top-16 mx-2 w-1/4 min-1/4 2xl:w-1/6"}>
      <div className={`flex items-start`}>
        {open && (
          <div
            className={`rounded shadow-lg bg-white bg-opacity-80 h-screen4/5`}
            // style={{ height: "80vh" }}
          >
            {clusterMap.renderedLocationsIds.length === 0 ? (
              <p className={"m-4 text-sm"}>
                {"No locations to be found. Zoom and navigate to discover!"}
              </p>
            ) : (
              <ul
                className={`list-none flex-1 overflow-y-scroll overflow-x-hidden h-5/6`}
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
            <div>
              <p
                className={"m-4 text-sm"}
              >{`Locations rendered: ${clusterMap.renderedLocationsIds.length}`}</p>

              <p
                className={"m-4 text-sm"}
              >{`Locations in total: ${clusterMap.locations.features.length}`}</p>
            </div>
          </div>
        )}
        <button
          title="Toggle Sidebar"
          className={
            "self-baseline mb-2 focus:outline-none hover:scale-110 transform"
          }
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ChevronLeftIcon className={"h-7 w-7 stroke-current text-white"} />
          ) : (
            <ChevronRightIcon className={"h-7 w-7 stroke-current text-white"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default OverlayShowLocations;
