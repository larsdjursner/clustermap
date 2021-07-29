import { Dispatch, FC, SetStateAction } from "react";
import { Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap, setFocusedLocationId } from "../ReactMapSlice";
interface IPopup {
  id: string;
  toggle: Dispatch<SetStateAction<string | null>>;
}

export const LocationPopup: FC<IPopup> = ({ id, toggle }) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const loc = clusterMap.locations.features.find(
    (l) => l.properties.id === id
  );

  dispatch(setFocusedLocationId({ id }));
  return (
    <Popup
      longitude={
        loc?.geometry.type === "Point" ? loc?.geometry.coordinates[0] : 0
      }
      latitude={loc?.geometry.type === "Point" ? loc?.geometry.coordinates[1] : 0}
      closeOnClick={false}
      closeButton={true}
      onClose={() => toggle(null)}
      anchor={"top"}
    >
      <p>{loc?.properties.id}</p>
      <div onClick={() => console.log(loc?.properties.id)}>
        <Link to={`/locations/${loc?.properties.id}`}>
          {loc?.properties.name}
        </Link>
      </div>

      <p>{loc?.properties.details}</p>
    </Popup>
  );
};
