import { useParams } from "react-router";
import temp from "../../assets/temp.jpg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectClusterMap } from "../map/ReactMapSlice";


interface Props {
  id: string;
}

const Location = () => {
  const clusterMap = useAppSelector(selectClusterMap);
  const dispatch = useAppDispatch();

  const { id } = useParams<Props>();
  const loc = clusterMap.locations.features
    .filter((l) => l.geometry.type === "Point")
    .find((l) => l.id === id)!;

  return (
    <div className={"h-80vh"}>
      <div
        style={{ backgroundImage: `url(${temp})` }}
        className={`object-scale-down w-full h-full`}
      >
        <div className={`flex flex-row justify-center items-center h-full`}>
          <p className={`text-4xl text-white text font-black`}>{loc.properties.name}</p>
        </div>
      </div>
      <div className={`w-full h-screen`}>
        <p className={"text-3xl"}>{loc.properties.name}</p>
      </div>
    </div>
  );
};

export default Location;
