import { FC, useState } from "react";
import { Listbox } from "@headlessui/react";
import { Characteristic } from "../map/ReactMapSlice";

const CharacteristicListBox = () => {
  const [selected, setSelected] = useState(Object.values(Characteristic)[0]);

  return (
    <div className={"w-full"}>
      <Listbox value={selected} onChange={setSelected} >
        <Listbox.Button
          className={
            "relative w-full h-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          }
        >
          {selected}
        </Listbox.Button>
        <Listbox.Options
          className={
            "z-50 absolute object-bottom w-72 overflow-auto text-base bg-white rounded-md shadow-lg max-h-32 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          }
        >
          {Object.values(Characteristic).map((option) => (
            <Listbox.Option className={"my-1 mx-2 cursor-pointer"} key={option} value={option}>
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default CharacteristicListBox;