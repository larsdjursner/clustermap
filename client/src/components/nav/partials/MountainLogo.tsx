import { Link } from "react-router-dom";
import logomountain from "../../../assets/logomountain.svg";

const MountainLogo = () => {
  return (
    <Link to="/" className="flex flex-row justify-between h-full w-full align-middle gap-4">
      <img
        className="bg-gray-400 hover:bg-gray-500 w-10 h-10 rounded-full object-contain"
        src={logomountain}
      />
      <p className={" text-xl h-full w-full font-bold align-middle"}>27++ CRAGS</p>
    </Link>
  );
};

export default MountainLogo;
