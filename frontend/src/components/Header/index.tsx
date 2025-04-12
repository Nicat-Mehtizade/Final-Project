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
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { BASE_URL } from "../../constant";

const Header = () => {
  const token = getTokenFromCookie();
  const [profileVisible, setProfileVisible] = useState(false);
  const [navbarActive, setNavbarActive] = useState(false);

  const login = () => {
    window.location.href = "http://localhost:5173/login";
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-lg">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between py-5 ">
          <button onClick={() => setNavbarActive(!navbarActive)}>
            <RxHamburgerMenu className="text-gray-400 text-2xl block lg:hidden" />
          </button>
          {navbarActive && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-60 z-40"
                onClick={() => setNavbarActive(false)}
              ></div>

              <div className="fixed top-0 left-0 w-[75%] h-full bg-white z-50 p-3  shadow-lg transition-all duration-300">
                <div>
                  <NavLink to={"/"}>
                    <img
                      className="w-30 cursor-pointer mb-5"
                      src="/123-removebg-preview.png"
                      alt="iTicket Logo"
                    />
                  </NavLink>
                  <button
                    className="mb-4 text-white text-3xl font-bold absolute -right-10 top-5"
                    onClick={() => setNavbarActive(false)}
                  >
                    <IoMdClose />
                  </button>
                </div>
                <div className="border flex items-center border-gray-400 rounded-lg p-2 gap-2">
                  <IoSearch className="text-gray-400 text-2xl min-w-5" />
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search"
                    className="focus:outline-0"
                  />
                </div>
                <nav className="flex flex-col gap-4 py-5 font-bold text-lg">
                  <NavLink to={"/events"} end className="text-left">
                    All Events
                  </NavLink>
                  <NavLink to={"/events/concert"} end className="text-left">
                    Concert
                  </NavLink>
                  <NavLink to={"/events/theatre"} end className="text-left">
                    Theatre
                  </NavLink>
                  <NavLink to={"/events/kids"} className="text-left">
                    Kids
                  </NavLink>
                  <NavLink to={"/events/dream-fest"} className="text-left">
                    Dream Fest 2025
                  </NavLink>
                </nav>
              </div>
            </>
          )}
          <NavLink to={"/"}>
            <img
              className="w-40 cursor-pointer"
              src="/123-removebg-preview.png"
              alt="iTicket Logo"
            />
          </NavLink>
          <div className="hidden lg:flex gap-4 font-bold text-xl">
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
            <NavLink
              to={"/events/kids"}
              end
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
            >
              Kids
            </NavLink>
            <NavLink
              to={"/events/dream-fest"}
              end
              className={({ isActive }) =>
                isActive ? "nav-button active" : "nav-button"
              }
            >
              Dream Fest 2025
            </NavLink>
            <button className="cursor-pointer">...</button>
          </div>
          <div className="flex items-center font-semibold text-2xl gap-5 text-gray-500">
            <button className="hidden lg:block">
              <PiHeartStraightBold className="cursor-pointer" />
            </button>
            <button className="hidden lg:block">
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
                  <button onClick={handleLogout} className="flex items-center gap-4 text-lg py-2 mb-3 cursor-pointer">
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
