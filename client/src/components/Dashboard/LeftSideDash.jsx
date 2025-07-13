import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { FaThList, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from '../../context/auth.context';

function LeftSideDash() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col border-r-[1px] border-zinc-300 justify-between h-full py-8 px-4 bg-black text-white text-lg font-light capitalize">
      {/* Navigation Links */}
      <div className="space-y-6">
        <Link to='/dashboard' className="flex items-center border border-white px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
          <MdOutlineDashboard className="mr-2  " />
          <span>home</span>
        </Link>

        <Link to='/form' className="flex items-center border border-white px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
          <AiOutlineForm className="mr-2" />
          <span>form</span>
        </Link>

        <Link to='/list' className="flex items-center border border-white px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300">
          <FaThList className="mr-2" />
          <span>list</span>
        </Link>
      </div>

      {/* Logout Button */}
      <div>
        <Link
          to="/auth/login"
          onClick={logout}
          className="flex items-center border border-white px-3 py-2 rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          <span>logout</span>
        </Link>
      </div>
    </div>
  );
}

export default LeftSideDash;
