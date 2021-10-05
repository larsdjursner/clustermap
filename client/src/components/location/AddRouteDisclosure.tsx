import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IFeature, selectClusterMap } from "../map/ReactMapSlice";
import NameInput from "./partials/NameInput";
import GenreListBox from "./partials/GenreListbox";
import GradeListBox from "./partials/GradeListbox";
import {
  createRouteAsync,
  resetFeature,
  selectRoute,
  setFeature,
} from "./RouteSlice";
import CharacteristicsListBox from "./partials/CharacteristicsListbox";
import TopologyListBox from "./partials/TopologyListbox";
import { selectAuth } from "../sessions/AuthSlice";

const AddRouteDisclosure: FC<{ location: IFeature }> = ({ location }) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const routeState = useAppSelector(selectRoute);
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleDisabled = (): boolean => {
    // return routeState.routeToCreate?.name === "" && ;
    return false;
  };
  useEffect(() => {
    dispatch(
      setFeature({
        featureId: location.properties.featureId,
        userId: authState.user?.id,
      })
    );
    return () => {
      dispatch(resetFeature());
    };
  }, []);
  return (
    <div className="w-full px-4">
      <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-600 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{`Add routes to ${location.properties.name}`}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-400 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col">
                  {({ close }) => (
                    <div className="flex flex-col">
                      <div className="flex flex-col my-2">
                        Name
                        <NameInput />
                      </div>
                      <div className="flex flex-col my-2">
                        Genre
                        <GenreListBox />
                      </div>
                      <div className="flex flex-col my-2">
                        Grade
                        <GradeListBox />
                      </div>
                      <div className="flex flex-col my-2">
                        Characteristics
                        <CharacteristicsListBox />
                      </div>
                      <div className="flex flex-col my-2">
                        Topology
                        <TopologyListBox />
                      </div>
                      <button
                        className={"rounded-lg border-2 bg-gray-200 h-8 mt-4"}
                        disabled={handleDisabled()}
                        onClick={async () => {
                          if (routeState.routeToCreate) {
                            dispatch(
                              createRouteAsync(routeState.routeToCreate)
                            ).then((res) => console.log(res));
                          }
                          close();
                        }}
                      >
                        Upload route
                      </button>
                    </div>
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default AddRouteDisclosure;
