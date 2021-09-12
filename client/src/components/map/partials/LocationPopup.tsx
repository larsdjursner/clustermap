import { Dispatch, FC, SetStateAction } from "react";
import { Popup } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
interface IPopup {
  id: string;
  setPopupId: Dispatch<SetStateAction<string | null>>;
}

export const LocationPopup: FC<IPopup> = ({ id, setPopupId }) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const loc = clusterMap.locations.features.find((l) => l.id === id);

  return (
    <Popup
      longitude={
        loc?.geometry.type === "Point" ? loc?.geometry.coordinates[0] : 0
      }
      latitude={
        loc?.geometry.type === "Point" ? loc?.geometry.coordinates[1] : 0
      }
      // closeOnClick={false}
      // closeButton={true}
      // onClose={() => {
      //   setPopupId(null);
      // }}
      anchor={"top"}
    >
      <p>{loc?.properties.name}</p>
    </Popup>
  );
};
