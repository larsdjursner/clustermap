import { Link } from "react-router-dom";
import logomountain from "../../../assets/logomountain.svg";

const MountainLogo = () => {
  return (
    <div className=" h-auto my-2">
      <Link to="/">
        <img className="rounded max-h-full" src={logomountain} />
      </Link>
    </div>
  );
};

export default MountainLogo;
