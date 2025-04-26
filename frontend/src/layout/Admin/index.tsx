import { NavLink, Outlet } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { ImStatsBars } from "react-icons/im";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { PiDotsNineLight } from "react-icons/pi";

const AdminLayout = () => {
  const [sideBarActive, setSideBarActive] = useState(false);
  return (
    <div className="flex h-screen">
      <div
        className={`bg-[#2f363e] flex flex-col relative py-5 pl-5 transition-all duration-300 ${
          !sideBarActive ? "w-75" : "w-18"
        }`}
      >
        <button
          onClick={() => setSideBarActive(!sideBarActive)}
          className="absolute cursor-pointer transition duration-300 text-white right-3 top-3 z-10 hover:text-gray-400"
        >
          <IoClose className=" text-3xl" />
        </button>
        <img
          className={`w-40 mb-8 ${sideBarActive ? "opacity-0" : "opacity-100"}`}
          src="/1234-removebg-preview.png"
          alt="iTicket Logo"
        />
        <p
          className={`text-[#6b7074] text-nowrap font-bold mb-3 text-lg ${
            sideBarActive ? "opacity-0" : "opacity-100"
          }`}
        >
          Main Menu
        </p>
        <div className="flex flex-col items-start gap-4 mb-10">
          <NavLink end className="w-full" to="/admin">
            {({ isActive }) => (
              <div
                className={`relative py-4 flex gap-4 items-center text-[#969b9f] text-xl cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-l from-[#2b4548] to-[#2f373e] text-white"
                    : ""
                }`}
              >
                <ImStatsBars className="text-2xl min-w-6" />
                <span
                  className={`${
                    !sideBarActive
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  Dashboard
                </span>
                {isActive && (
                  <span className="absolute right-0 top-0 h-full w-2 bg-[#00d6b9] rounded-tl-2xl rounded-bl-2xl" />
                )}
              </div>
            )}
          </NavLink>

          <NavLink end className="w-full" to="/admin/event">
            {({ isActive }) => (
              <div
                className={`relative py-4 flex gap-4 items-center text-[#969b9f] text-xl cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-l from-[#2b4548] to-[#2f373e] text-white"
                    : ""
                }`}
              >
                <IoCalendarOutline className="text-2xl min-w-6" />
                <span
                  className={`${
                    !sideBarActive
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  Event
                </span>
                {isActive && (
                  <span className="absolute right-0 top-0 h-full w-2 bg-[#00d6b9] rounded-tl-2xl rounded-bl-2xl" />
                )}
              </div>
            )}
          </NavLink>
          <NavLink end className="w-full" to="/admin/customer">
            {({ isActive }) => (
              <div
                className={`relative py-4 flex gap-4 items-center text-[#969b9f] text-xl cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-l from-[#2b4548] to-[#2f373e] text-white"
                    : ""
                }`}
              >
                <FaRegUser className="text-2xl min-w-6" />
                <span
                  className={`${
                    !sideBarActive
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  Customer
                </span>
                {isActive && (
                  <span className="absolute right-0 top-0 h-full w-2 bg-[#00d6b9] rounded-tl-2xl rounded-bl-2xl" />
                )}
              </div>
            )}
          </NavLink>
          <NavLink end className="w-full" to="/admin/new">
            {({ isActive }) => (
              <div
                className={`relative py-4 flex gap-4 items-center text-[#969b9f] text-xl cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-l from-[#2b4548] to-[#2f373e] text-white"
                    : ""
                }`}
              >
                <MdLibraryAdd className="text-2xl min-w-6" />
                <span
                  className={`${
                    !sideBarActive
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  Add Event
                </span>
                {isActive && (
                  <span className="absolute right-0 top-0 h-full w-2 bg-[#00d6b9] rounded-tl-2xl rounded-bl-2xl" />
                )}
              </div>
            )}
          </NavLink>
        </div>
        <div className={`bg-[#0a7460] ml-3 relative py-4 rounded-xl flex justify-center items-center w-[80%] ${sideBarActive ? "opacity-0" : "opacity-100"}`}>
          <PiDotsNineLight className="text-3xl absolute text-gray-300 -top-3 left-3" />
          <p className="text-white font-semibold text-nowrap">iTicket Admin <br />Dashboard</p>
          <PiDotsNineLight className="absolute text-3xl text-gray-400 -bottom-3 right-0" />
        </div>
        <p className={`text-gray-500 mt-auto text-nowrap ml-3 ${sideBarActive ? "opacity-0" : "opacity-100"}`}>© 2025 All Rights Reserved</p>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
