import { PiHeartStraightBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { IoWallet } from "react-icons/io5";
import { MdCardGiftcard } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { useState } from "react";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../constant";
import axios from "axios";
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

const SlideNavBar = () => {
  const token = getTokenFromCookie();
  const [profileVisible, setProfileVisible] = useState(false);
  const [slideNavbarVisible, setSlideNavbarVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
    <div className="absolute  justify-between items-center left-10 top-15 z-50 lg:w-[95%] hidden lg:flex">
      <NavLink to={"/"}>
        <img
          className="w-40 cursor-pointer"
          src="/1234-removebg-preview.png"
          alt="iTicket Logo"
        />
      </NavLink>
      <div className="flex gap-4 text-white font-bold text-xl">
        <NavLink to={"/events"} end className="nav-button">
          All events
        </NavLink>
        <NavLink to={"/events/concert"} end className="nav-button">
          Concert
        </NavLink>
        <NavLink to={"/events/theatre"} end className="nav-button ">
          Theatre
        </NavLink>
        <NavLink to={"/events/kids"} end className="nav-button">
          Kids
        </NavLink>
        <NavLink to={"/events/dream-fest"} end className="nav-button">
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
            <div className="bg-white font-semibold text-black text-lg gap-4 flex flex-col absolute right-0 top-12 rounded-xl py-3">
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
      <div className="flex items-center font-semibold text-2xl gap-5 text-white">
        <NavLink to={"/favorites"}>
          <PiHeartStraightBold className="cursor-pointer" />
        </NavLink>
        <button onClick={handleOpen}>
          <IoSearch className="cursor-pointer" />
        </button>
        <NavLink to={"/basket"} className="cursor-pointer">
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
              className={`absolute right-0 top-14 bg-white w-60 rounded-xl shadow-lg  py-3 px-3 text-black transition-all duration-300 ${
                profileVisible ? "block" : "hidden"
              }`}
            >
              <div>
                <NavLink
                  to={"/profile"}
                  className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full"
                >
                  <FaUser /> Profile
                </NavLink>
                <NavLink
                  to={"/profile/orders"}
                  className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full"
                >
                  <GrHistory /> Order History
                </NavLink>
                <NavLink
                  to={"/profile/wallet"}
                  className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full"
                >
                  <IoWallet /> Wallet
                </NavLink>
                <NavLink
                  to={"/profile/gift-card"}
                  className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full"
                >
                  <MdCardGiftcard /> "iGift" Gift Card
                </NavLink>
                <NavLink
                  to={"/profile/update-password"}
                  className="flex items-center gap-4 py-2 mb-3 border-b-1 text-lg cursor-pointer border-gray-300 w-full"
                >
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

export default SlideNavBar;
