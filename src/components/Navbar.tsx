import { Link } from "react-router-dom";

import { RiHome6Line } from "react-icons/ri";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl text-center">TODO LIST</a>
      </div>
      <div className="flex-none ">
        <div>
          <Link to="/" className="btn btn-square btn-ghost">
            <RiHome6Line />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
