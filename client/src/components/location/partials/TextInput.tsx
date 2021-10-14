import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectRoute } from "../RouteSlice";

interface Props {
  attrType: "name" | "description";
  required: boolean;
  setter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput : FC<Props>= ({attrType, required, setter}) => {
  return (
    <input
      type="text"
      name={attrType}
      onChange={(e) => setter(e) }
      required={required}
      className={
        "relative w-full h-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      }
    />
  );
};
export default TextInput;
