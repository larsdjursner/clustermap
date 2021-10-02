import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectRoute, setName } from "../RouteSlice";

const NameInput = () => {
  const routeState = useAppSelector(selectRoute);
  const dispatch = useAppDispatch();

  return (
    <input
      type="text"
      name="name"
      onChange={(e) =>
        dispatch(setName({name: e.target.value}))
      }
      className={
        "relative w-full h-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
      }
    />
  );
};
export default NameInput;
