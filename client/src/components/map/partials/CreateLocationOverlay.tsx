import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../sessions/AuthSlice";
import { selectClusterMap, toggleCreateLocationMode } from "../ReactMapSlice";

const CreateLocationOverlay = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log(name);
  };

  useEffect(() => {
    setOpen(clusterMap.toggleCreateLocationMode);
  }, [clusterMap.toggleCreateLocationMode]);

  return (
    <>
      <button
        title="Toggle Sidebar"
        className={
          "self-baseline mb-2 focus:outline-none hover:scale-110 transform"
        }
        onClick={() => dispatch(toggleCreateLocationMode())}
      >
        {open ? (
          <MinusIcon className={"h-7 w-7"} />
        ) : (
          <PlusIcon className={"h-7 w-7"} />
        )}
      </button>
      {open && (
        <div
          className={`rounded shadow-lg bg-white bg-opacity-80 w-1/5 flex flex-col justify-between self-stretch mr-2 `}
        >
          {auth.isAuth ? (
            <div>
              <p className={"m-4 text-sm"}>
                {
                  "Click once to select the location for your new climbing spot!"
                }
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </form>
            </div>
          ) : (
            <p className={"m-4 text-sm"}>
              {"Click once to select the location for your new climbing spot!"}
            </p>
          )}
        </div>
      )}
      ;
    </>
  );
};

export default CreateLocationOverlay;
