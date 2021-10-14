import { FC, useState } from "react";
import { Tab } from "@headlessui/react";
import RouteList from "./RouteList";
import AddRouteDisclosure from "./AddRouteDisclosure";
import { IFeature } from "../../map/ReactMapSlice";
import TabOverview from "./TabOverview";

interface Props {
  location: IFeature;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const TabGroup: FC<Props> = ({ location }) => {
  const categories = ["Overview", "List of featured routes"];

  return (
    <div className="bg-gray-900">
      <div className="w-full px-2 py-10 sm:px-0 bg-gray-80 flex flex-col">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-200 rounded-lg w-1/2 self-center">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel>
              <TabOverview location={location} />
            </Tab.Panel>
            <Tab.Panel>
              <AddRouteDisclosure location={location} />
              <RouteList location={location} />
            </Tab.Panel>
            <Tab.Panel></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TabGroup;
