import React, { FC } from "react";
import { useParams } from "react-router";

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

  return (
    <div>
      <h1>{loc.properties.name}</h1>
      <p>{loc.properties.details}</p>
    </div>
  );
};

export default LocationPage;
