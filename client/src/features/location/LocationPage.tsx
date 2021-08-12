import React, { FC } from "react";
import { useParams } from "react-router";
import temp from "../../assets/temp.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectClusterMap } from "../map/ReactMapSlice";

interface Props {
  id: string;
}

const LocationPage = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const { id } = useParams<Props>();
  const loc = clusterMap.locations.features.find(
    (l) => l.properties.id === id
  )!;
  // if (loc.geometry.type !== "Point") return;
  return (
    <div className={" h-full w-full"}>
      <div 
      // style={{ backgroundImage: `url(${temp})` }}
      // className={` h-48`}
      >
        <img src={temp} />
        <div className={`flex flex-row justify-center`}>
          {/* <h1>{loc.properties.name}</h1> */}
        </div>
        {/* <p>{loc.properties.details}</p> */}
      </div>
    </div>
  );
};

export default LocationPage;
