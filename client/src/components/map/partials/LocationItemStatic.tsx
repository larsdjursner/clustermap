import { selectClusterMap, setFocusedLocationId } from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FC } from "react";
import temp from "../../../assets/temp.jpg";

interface ILocationItemStatic {
  locationID: string;
}

export const LocationItemStatic: FC<ILocationItemStatic> = ({ locationID }) => {
  const dispatch = useAppDispatch();
  const clusterMap = useAppSelector(selectClusterMap);
  const loc = clusterMap.locations.features.filter(
    (i) => i.id === locationID
  )[0];

  return (
    <div className={"flex flex-row justify-center"}>
      <div className={" self-end w-1/3"}>
        <div
          className={`p-2 m-2 rounded flex flex-row justify-between bg-white
        `}
        >
          <div className={`w-1/4`}>
            <img className="rounded shadow-lg object-scale-down" src={temp} />
          </div>

          <div className={`flex flex-col w-3/4 mx-2`}>
            <div className={"flex flex-row justify-between"}>
              <p className={`text-sm `}>{loc.properties.name}</p>
              <button
                className={"self-start"}
                onClick={() => dispatch(setFocusedLocationId({ id: null }))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className={"text-xs"}>{loc.properties.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
