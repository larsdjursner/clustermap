import React, { FC } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";

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
    <div>
      <h1>{loc.properties.name}</h1>
      <p>{loc.properties.details}</p>
      {/* <Link
        to={{
          pathname: `https://www.google.com/maps/@${loc.geometry.coordinates[0]},${loc.geometry.coordinates[1]},12z`,
        }}
        target="_blank"
      > 
         Navigate to this crag
      </Link> */}
    </div>
  );
};

export default LocationPage;
