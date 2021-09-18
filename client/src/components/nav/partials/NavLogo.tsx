import { Link } from "react-router-dom";
import LogoSmall from "../../logo/LogoSmall";

const NavLogo = () => {
  return (
    <Link
      to="/"
      className="flex flex-row justify-between h-full w-full align-middle gap-4"
    >
      <LogoSmall />
      <p
        className={
          " text-xl h-full w-full font-bold align-middle text-gray-100 hover:text-gray-500"
        }
      >
        27++ CRAGS
      </p>
    </Link>
  );
};

export default NavLogo;
