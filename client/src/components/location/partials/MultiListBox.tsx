// import { FC, useEffect, useState } from "react";
// import { Listbox } from "@headlessui/react";
// import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
// import { Enum } from "./RouteSlice";


// // type Props = {
// //   type: "Topology" | "Characteristic";
// // };
// interface Props<T> {
//   type: T;
// }
// const MultiListBox = <T extends typeof Enum>({ type }: Props<T>) => {
//   const [selected, setSelected] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

//   const isSelected = (v: string) => {
//     return selectedCategory.includes(v);
//   };

//   const handleSelect = (v: string) => {
//     if (selectedCategory.includes(v)) {
//       setSelectedCategory((arr) => arr.filter((el) => el !== v));
//     } else {
//       setSelectedCategory((arr) => [...arr, v]);
//     }
//   };

//   useEffect(() => {
//     const newSelected = selectedCategory.reduce(
//       (prev, curr, i) => (i === 0 ? curr : prev + ", " + curr),
//       ""
//     );
//     setSelected(newSelected);
//   }, [selectedCategory]);

//   return (
//     <Listbox
//       value={selected}
//       onChange={(v: string) => handleSelect(v)}
//       as="div"
//       className={"w-full"}
//     >
//       <Listbox.Button
//         className={
//           "flex justify-between relative w-full h-full py-2 px-3 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
//         }
//       >
//         <span>{selected}</span>
//         <ChevronDownIcon className={"h-5 w-5"} />
//       </Listbox.Button>
//       <Listbox.Options
//         className={
//           "z-50 absolute object-bottom w-96 mx-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-32 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
//         }
//       >
//         {Object.values(type).map((option) => (
//           <Listbox.Option
//             className={({ active }) =>
//               `   ${active ? "text-gray-900 bg-gray-200" : "text-gray-900"}
//                     cursor-default select-none relative py-2 pl-2 pr-4 flex justify-start gap-2`
//             }
//             key={option}
//             value={option}
//           >
//             <div className={"w-5 h-5"}>
//               {isSelected(option) && <CheckIcon />}
//             </div>
//             {option}
//           </Listbox.Option>
//         ))}
//       </Listbox.Options>
//     </Listbox>
//   );
// };

// export default MultiListBox;
export {}