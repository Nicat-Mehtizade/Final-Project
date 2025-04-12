import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { GrHistory } from "react-icons/gr";
import { IoLogOutOutline, IoSearch, IoWallet } from "react-icons/io5";
import { MdCardGiftcard } from "react-icons/md";
import { PiHeartStraightBold } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";

const Header = () => {
  const token = getTokenFromCookie();
  const [profileVisible, setProfileVisible] = useState(false);
  const login = () => {
    window.location.href = "http://localhost:5173/login";
  };
  return (
    <div className="shadow-lg">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between py-5 ">
          <NavLink to={"/"}>
            <img
              className="w-40 cursor-pointer"
              src="/123-removebg-preview.png"
              alt="iTicket Logo"
            />
          </NavLink>
          <div className="flex gap-4 font-bold text-xl">
            <NavLink
              to={"/events"}
              end
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
            >
              All events
            </NavLink>
            <NavLink
              to={"/events/concert"}
              end
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
            >
              Concert
            </NavLink>
            <NavLink
              to={"/events/theatre"}
              end
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
            >
              Theatre
            </NavLink>
            <button className="nav-button">Kids</button>
            <button className="nav-button">Dream Fest 2025</button>
            <button className="nav-button">Sport</button>
            <button className="cursor-pointer">...</button>
          </div>
          <div className="flex items-center font-semibold text-2xl gap-5 text-gray-500">
            <button>
              <PiHeartStraightBold className="cursor-pointer" />
            </button>
            <button>
              <IoSearch className="cursor-pointer" />
            </button>
            <button>
              <FaShoppingCart className="cursor-pointer" />
            </button>
            <div
              onMouseOver={() => token && setProfileVisible(true)}
              onMouseLeave={() => token && setProfileVisible(false)}
              className="relative"
            >
              <button onClick={() => !token && login()}>
                <FaUserLarge
                  className={`bg-yellow-300 w-12 h-12 p-3 rounded-full cursor-pointer ${
                    token ? "text-white" : "text-black"
                  }`}
                />
              </button>
              {profileVisible && (
                <div
                  className={`absolute right-0 top-14 bg-white w-60 rounded-xl z-1 shadow-lg  py-3 px-3 text-black transition-all duration-300 ${
                    profileVisible ? "block" : "hidden"
                  }`}
                >
                  <div>
                    <button className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <FaUser /> Profile
                    </button>
                    <button className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <GrHistory /> Order History
                    </button>
                    <button className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <IoWallet /> Wallet
                    </button>
                    <button className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <MdCardGiftcard /> "iGift" Gift Card
                    </button>
                    <button className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <TbLockPassword /> Update Password
                    </button>
                  </div>
                  <button className="flex items-center gap-4 text-lg py-2 mb-3 cursor-pointer">
                    <IoLogOutOutline /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
