import { FC, useState } from "react";
import { Listbox } from "@headlessui/react";
import { Genre, Grade } from "../map/ReactMapSlice";
import { CheckIcon } from "@heroicons/react/solid";

const ListBox: FC<{ type: string }> = ({ type }) => {
  const category = type === "Grade" ? Grade : type === "Genre" ? Genre : Genre; //revaluate this

  const [selected, setSelected] = useState("");

  const isSelected = (v: string) => {
    return selected === v;
  };

  return (
    <div className={"w-full"}>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button
          className={
            "relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          }
        >
          {selected}
        </Listbox.Button>
        <Listbox.Options
          className={
            "z-50 absolute object-bottom w-96 overflow-auto text-base bg-white rounded-md shadow-lg max-h-32 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          }
        >
          {Object.values(category).map((option) => (
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
            // <Listbox.Option className={"my-1 mx-2"} key={option} value={option}>
            //   {option}
            // </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default ListBox;
