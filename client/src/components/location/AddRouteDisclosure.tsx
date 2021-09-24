import { Disclosure, Transition } from "@headlessui/react";
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IFeature, IRoute, selectClusterMap } from "../map/ReactMapSlice";
import ListBox from "./Listbox";
import MultiListBox from "./MultiListBox";

const AddRouteDisclosure: FC<{ location: IFeature }> = ({ location }) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();
  const [route, setRoute] = useState<IRoute>({ name: "", feature: location });

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
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 flex flex-col">
                  {({ close }) => (
                    <form className="flex flex-col">
                      <div className="flex flex-col my-2">
                        Name
                        <input type="text" name="name" />
                      </div>
                      <div className="flex flex-col my-2">
                        Genre
                        <ListBox type="Genre" />
                      </div>
                      <div className="flex flex-col my-2">
                        Grade
                        <ListBox type="Grade" />
                      </div>
                      <div className="flex flex-col my-2">
                        Characteristics
                        <MultiListBox type="Characteristic" />
                      </div>
                      <div className="flex flex-col my-2">
                        Topology
                        <MultiListBox type="Topology" />
                      </div>
                      <button
                        className={
                          "rounded-lg border-2 border-black bg-gray-200"
                        }
                        onClick={async () => {
                          setTimeout(() => console.log("async post"), 200);
                          // close();
                        }}
                      >
                        Upload route
                      </button>
                    </form>
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
