import {  useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { Grade, Genre, selectRoute, setGrade} from "./RouteSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

enum Enum {}
interface Props<T> {
  type: T;
}
const ListBox = <T extends typeof Enum>({ type }:Props<T>) => {
  const routeState = useAppSelector(selectRoute);
  const dispatch = useAppDispatch();
  
  const [selected, setSelected] = useState("");

  const isSelected = (v: string) => {
    return selected === v;
  };


  return (
    <div className={"w-full"}>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button
          className={
            "flex justify-between relative w-full py-2 px-3 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          }
        >
          <span>{selected}</span>
          <ChevronDownIcon className={"h-5 w-5"} />
        </Listbox.Button>
        <Listbox.Options
          className={
            "z-50 absolute object-bottom w-96 mx-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-32 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          }
        >
          {Object.values(type).map((option) => (
            <Listbox.Option
              className={({ active }) =>
                `   ${active ? "text-gray-900 bg-gray-200" : "text-gray-900"}
                    cursor-default select-none relative py-2 pl-2 pr-4 flex justify-start gap-2`
              }
              key={option}
              value={option}
            >
              <div className={"w-5 h-5"}>
                {isSelected(option) && <CheckIcon />}
              </div>
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ListBox;
