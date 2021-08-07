import { selectClusterMap, setFocusedLocationId } from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { FC, useState } from "react";
import temp from "../../../assets/temp.jpg";

interface ILocationItemStatic {
  locationID: string;
}

export const LocationItemStatic: FC<ILocationItemStatic> = ({ locationID }) => {
  const dispatch = useAppDispatch();
  const clusterMap = useAppSelector(selectClusterMap);
  const loc = clusterMap.locations.features.filter(
    (i) => i.properties.id === locationID
  )[0];

  return (
    <div
      key={locationID}
      className={`p-2 m-2 h-24 rounded flex flex-row justify-between bg-white
        `}
    >
      <div className={`w-1/4`}>
        <img className="rounded shadow-lg object-scale-down" src={temp} />
      </div>

      <div className={`flex flex-col w-3/4 mx-2`}>
        <div className ={"flex flex-row justify-between"}>
          <p className={`text-sm `}>{loc.properties.name}</p>
          <button  className={"self-start"} onClick={() => dispatch(setFocusedLocationId({ id: null }))}>
            x
          </button>
        </div>

        <p className={"text-xs"}>{loc.properties.details}</p>
      </div>
    </div>
  );
};
