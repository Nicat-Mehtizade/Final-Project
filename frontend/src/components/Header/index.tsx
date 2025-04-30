import { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { MdCardGiftcard } from "react-icons/md";
import { PiHeartStraightBold } from "react-icons/pi";
import { TbLockPassword } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { BASE_URL } from "../../constant";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Activity } from "../../types/activityType";

const style = {
  position: "relative",
  top: "50%",
  height: "90vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "transparent",
  p: 4,
};
const Header = () => {
  const token = getTokenFromCookie();
  const [profileVisible, setProfileVisible] = useState(false);
  const [navbarActive, setNavbarActive] = useState(false);
  const [slideNavbarVisible, setSlideNavbarVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | null
  >(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    try {
      const response = await axios(`${BASE_URL}/activity`);
      const filtered = response.data.data.filter((q: Activity) =>
        q.title.toLowerCase().includes(value.toLowerCase().trim())
      );
      setFilteredActivities(filtered);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shadow-lg">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between py-5">
          <button
            className="block lg:hidden"
            onClick={() => setNavbarActive(!navbarActive)}
          >
            <RxHamburgerMenu className="text-gray-400 text-2xl" />
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
                <button onClick={handleOpen} className="border flex items-center border-gray-400 rounded-lg gap-2 p-2">
                  <IoSearch className="text-gray-400 text-2xl min-w-5" />
                  <p className="mr-2 text-gray-400">Search</p>
                </button>
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
                  <NavLink to={"/events/tourism"} className="text-left">
                    Tourism
                  </NavLink>
                  <NavLink to={"/events/museum"} className="text-left">
                    Museum
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
            <div className="relative">
              <button
                onClick={() => setSlideNavbarVisible(!slideNavbarVisible)}
                className="cursor-pointer"
              >
                ...
              </button>

              {slideNavbarVisible && (
                <div className="bg-white shadow-2xl font-semibold text-black text-lg gap-4 flex flex-col absolute right-0 top-12 rounded-xl py-3">
                  <NavLink
                    className={`transition duration-300 hover:bg-gray-100 px-5`}
                    to={"/events/tourism"}
                  >
                    Tourism
                  </NavLink>
                  <NavLink
                    className={`transition duration-300 hover:bg-gray-100 px-5`}
                    to={"/events/museum"}
                  >
                    Museum
                  </NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center font-semibold text-2xl gap-5 text-gray-500">
            <NavLink to={"/favorites"} className="hidden lg:block">
              <PiHeartStraightBold className="cursor-pointer" />
            </NavLink>
            <button onClick={handleOpen} className="hidden lg:block">
              <IoSearch className="cursor-pointer" />
            </button>
            <NavLink to={"/basket"}>
              <FaShoppingCart className="cursor-pointer" />
            </NavLink>
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
                    <NavLink  to={"/profile"} className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <FaUser /> Profile
                    </NavLink>
                    <NavLink to={"/profile/gift-card"} className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <MdCardGiftcard /> "iGift" Gift Card
                    </NavLink>
                    <NavLink to={"/profile/update-password"} className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full">
                      <TbLockPassword /> Update Password
                    </NavLink>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 text-lg py-2 mb-3 cursor-pointer"
                  >
                    <IoLogOutOutline /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <div className="relative top-[10%] rounded-xl bg-white flex gap-3 items-center mb-4 p-5 ">
              <IoSearch className="text-gray-400 text-2xl" />
              <input
                onChange={handleSearch}
                type="text"
                value={searchValue}
                placeholder="Search"
                className="focus:outline-0 w-full"
              />
            </div>

            {filteredActivities && (
              <div className="bg-white rounded-lg max-h-[300px] overflow-y-auto scrollbar-hide">
                {filteredActivities ? (
                  filteredActivities.length > 0 ? (
                    filteredActivities.map((activity) => {
                      const title = activity.title;
                      const search = searchValue.trim().toLowerCase();
                      const matchIndex = title.toLowerCase().indexOf(search);

                      if (matchIndex !== -1 && search.length > 0) {
                        const before = title.slice(0, matchIndex);
                        const match = title.slice(
                          matchIndex,
                          matchIndex + search.length
                        );
                        const after = title.slice(matchIndex + search.length);

                        return (
                          <NavLink
                            key={activity._id}
                            to={`/events/${activity._id}`}
                            className="block py-2 px-3 hover:bg-yellow-300 border-b border-gray-300"
                          >
                            {before}
                            <span className="font-bold text-black">
                              {match}
                            </span>
                            {after}
                          </NavLink>
                        );
                      }

                      return (
                        <NavLink
                          key={activity._id}
                          to={`/events/${activity._id}`}
                          className="block py-2 px-3 hover:bg-yellow-300 border-b border-gray-300"
                        >
                          {activity.title}
                        </NavLink>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 p-5">No results found.</p>
                  )
                ) : null}
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Header;
