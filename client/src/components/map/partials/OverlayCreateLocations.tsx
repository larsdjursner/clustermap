import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../sessions/AuthSlice";
import {
  CreateFeatureDTO,
  createLocationAsync,
  resetCreateLocationCoordinates,
  selectClusterMap,
  toggleCreateLocationMode,
} from "../ReactMapSlice";
import { IOverlayChildLocations } from "./OverlayShowLocations";

const OverlayCreateLocations: FC<IOverlayChildLocations> = ({
  mutateViewport,
}) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleToggle = () => {
    if (auth.isAuth) {
      dispatch(toggleCreateLocationMode());
    }
  };

  const cleanUp = (bool: boolean) => {
    dispatch(resetCreateLocationCoordinates());
    setName("");
    setOpen(bool);
  };

  const trimCoords = () => {
    const arr = clusterMap.createLocationCoordinates;
    if (arr) {
      return [arr[0].toString().slice(0, 5), arr[1].toString().slice(0, 5)];
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (clusterMap.createLocationCoordinates) {
      const dto: CreateFeatureDTO = {
        properties: {
          name: name,
          creatorId: auth.user?.id!,
        },
        geometry: {
          coordinates: clusterMap.createLocationCoordinates,
        },
      };
      dispatch(createLocationAsync(dto)).then((res) => console.log(res));

      mutateViewport(
        clusterMap.createLocationCoordinates[0],
        clusterMap.createLocationCoordinates[1],
        12
      );

      cleanUp(false);
    }
  };
  return (
    <div
      className={
        "absolute top-16 right-0 mx-2 w-1/4 max-w-1/4 min-w-1/4  2xl:w-1/6"
      }
    >
      <div className={`flex flex-row-reverse items-start`}>
        {open && (
          <div
            className={`rounded shadow-lg bg-white bg-opacity-80 flex flex-col justify-between self-stretch h-1/2 w-full`}
          >
            {auth.isAuth ? (
              <div>
                <div className={"m-4 h-14"}>
                  <p className={"text-sm w-full break-normal"}>
                    {clusterMap.createLocationCoordinates != null
                      ? `Your location ${name} will be placed at ${trimCoords()}`
                      : "Click a spot on the map to place coordinates for your new climbing location!"}
                  </p>
                </div>
                <div className={"m-2 max-w-full"}>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={40}
                    className=" overflow-x-scroll appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className={"flex justify-start m-2"}>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                  >
                    Add
                  </button>

                  <button
                    type="button"
                    onClick={() => cleanUp(true)}
                    className="mx-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className={"m-4 text-sm"}>
                {"You need to log in in order to create new climbing locations"}
              </p>
            )}
          </div>
        )}
        <button
          title="Toggle Sidebar"
          className={
            "self-baseline mb-2 focus:outline-none hover:scale-110 transform"
          }
          onClick={() => {
            setOpen(!open);
            handleToggle();
          }}
        >
          {open ? (
            <MinusIcon className={"h-7 w-7 mx-2 stroke-current text-white"} />
          ) : (
            <PlusIcon className={"h-7 w-7 mx-2 stroke-current text-white"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default OverlayCreateLocations;
