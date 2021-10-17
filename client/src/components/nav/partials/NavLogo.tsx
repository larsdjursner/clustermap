import { Link } from "react-router-dom";
import LogoSmall from "../../logo/LogoSmall";

const NavLogo = () => {
  return (
    <Link to="/" className="flex flex-row gap-4 h-auto">
      <LogoSmall />
      <p
        className={
          "text-xl h-full w-full font-bold text-gray-100 my-2 invisible md:visible"
        }
      >
        28 CRAGS
      </p>
    </Link>
  );
};

export default NavLogo;
