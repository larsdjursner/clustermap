import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { FC, FormEvent, useState } from "react";
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

  const cleanUp = () => {
    dispatch(resetCreateLocationCoordinates());
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (clusterMap.createLocationCoordinates) {
      const dto: CreateFeatureDTO = {
        properties: {
          name: name,
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

      cleanUp();
    }
  };
  return (
    <div className={"absolute top-10 right-0 m-2 w-1/4"}>
      <div className={`flex flex-row-reverse items-start`}>
        {open && (
          <div
            className={`rounded shadow-lg bg-white bg-opacity-80 flex flex-col justify-between self-stretch h-1/2`}
          >
            {auth.isAuth ? (
              <div>
                <p className={"m-4 text-sm"}>
                  {clusterMap.createLocationCoordinates != null
                    ? `${clusterMap.createLocationCoordinates}`
                    : "Click a spot on the map to place coordinates for your new climbing location!"}
                </p>

                <form onSubmit={handleSubmit} className={"m-2"}>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    placeholder="name"
                    autoComplete="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button className={" border-black"}>add location</button>
                </form>
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
            <MinusIcon className={"h-7 w-7 stroke-current text-white"} />
          ) : (
            <PlusIcon className={"h-7 w-7 stroke-current text-white"} />
          )}
        </button>
      </div>
    </div>
  );
};

export default OverlayCreateLocations;
