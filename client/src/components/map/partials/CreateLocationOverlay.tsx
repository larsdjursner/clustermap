import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../sessions/AuthSlice";
import {
  CreateFeatureDTO,
  createLocationAsync,
  selectClusterMap,
  toggleCreateLocationMode,
} from "../ReactMapSlice";

const CreateLocationOverlay = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

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
      dispatch(createLocationAsync(dto)).then(res => console.log(res))
    }
  };

  const handleToggle = () => {
    if (auth.isAuth) {
      dispatch(toggleCreateLocationMode());
    }
  };

  return (
    <>
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
          <MinusIcon className={"h-7 w-7"} />
        ) : (
          <PlusIcon className={"h-7 w-7"} />
        )}
      </button>
      {open && (
        <div
          className={`rounded shadow-lg bg-white bg-opacity-80 flex flex-col justify-between self-stretch h-1/2 w-1/4`}
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
      ;
    </>
  );
};

export default CreateLocationOverlay;
