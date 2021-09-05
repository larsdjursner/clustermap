import {
  IFeature,
  selectClusterMap,
  setFocusedLocationId,
} from "../ReactMapSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FC } from "react";
import temp from "../../../assets/temp.jpg";
import { Link } from "react-router-dom";

interface ILocationItem {
  locationId: string;
  mutateViewport: (longitude: number, latitude: number, zoom: number) => void;
}

export const LocationItem: FC<ILocationItem> = ({
  locationId,
  mutateViewport,
}) => {
  const dispatch = useAppDispatch();
  const clusterMap = useAppSelector(selectClusterMap);
  const location = clusterMap.locations.features.find(
    (i) => i.id === locationId
  )!;

  const isFocus = clusterMap.focusedLocationID === location.id;
  const handleGoToLocation = (loc: IFeature) => {
    if (loc.geometry.type !== "Point") return;
    dispatch(setFocusedLocationId({ id: location.id }));
    mutateViewport(
      loc.geometry.coordinates[0],
      loc.geometry.coordinates[1],
      12
    );
  };

  return (
    <li
      onClick={() => handleGoToLocation(location)}
      className={`p-2 m-4 rounded flex flex-row justify-between cursor-pointer ${
        isFocus && "bg-gray-200"
      }
      transition duration-200 transform hover:bg-gray-200 hover:scale-105 hover:border-gray-700
      `}
    >
      <div className={`w-1/4`}>
        <img className="rounded shadow-lg object-scale-down max-h-full" src={temp} />
      </div>

      <div className={`flex flex-col w-3/4 mx-2 h-auto justify-between`}>
        <p
          className={` text-sm
            ${isFocus && "font-bold"}`}
        >
          {location.properties.name}
        </p>
        <p className={"text-xs"}>{location.properties.details}</p>
        <div
          className={`text-xs self-end mb-0 hover:underline ${
            isFocus && "font-bold"
          }`}
        >
          <Link to={`/locations/${location.id}`}>View more</Link>
        </div>
      </div>
    </li>
  );
};
