import { features } from "process";
import { Dispatch, FC, SetStateAction } from "react";
import { Popup } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectClusterMap } from "../ReactMapSlice";
interface IPopup {
  featureId: string;
  setPopupId: Dispatch<SetStateAction<string | null>>;
}

export const LocationPopup: FC<IPopup> = ({
  featureId: featureId,
  setPopupId,
}) => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const loc = clusterMap.locations.features.find(
    (l) => l.properties.featureId === featureId
  );
  return (
    <Popup
      longitude={
        loc?.geometry.type === "Point" ? loc?.geometry.coordinates[0] : 0
      }
      latitude={
        loc?.geometry.type === "Point" ? loc?.geometry.coordinates[1] : 0
      }
      tipSize={5}
      closeOnClick={false}
      onClose={() => {
        setPopupId(null);
      }}
      anchor={"top"}
    >
      <p>{loc?.properties.name}</p>
    </Popup>
  );
};
