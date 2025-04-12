import { NavLink, useParams } from "react-router-dom";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { Activity } from "../../types/activityType";
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
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { RxHamburgerMenu } from "react-icons/rx";

const Details = () => {
  const { id } = useParams();
  const token = getTokenFromCookie();
  console.log(token);
  const [profileVisible, setProfileVisible] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const getActivity = async (id: string | undefined) => {
    try {
      const response = await axios(`${BASE_URL}/activity/${id}`);
      setActivity(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActivity(id);
  }, [id]);

  const login = () => {
    window.location.href = "/login";
  };

  return (
    <div className="bg-gradient-to-b from-gray-300 to-white">
      <div className="max-w-[1350px] mx-auto">
        <div className="bg-white flex lg:hidden justify-between items-center py-4 px-3 relative z-2">
          <button>
            <RxHamburgerMenu className="text-gray-400 text-2xl" />
          </button>
          <img
            className="w-35 cursor-pointer"
            src="/123-removebg-preview.png"
            alt="iTicket Logo"
          />
          <div className="flex items-center gap-4 text-2xl text-gray-300">
            <FaShoppingCart className="cursor-pointer" />
            <FaUserLarge className="bg-yellow-300 w-12 h-12 p-3 rounded-full text-black cursor-pointer" />
          </div>
        </div>
        {activity && (
          <div className="lg:py-10">
            <div className="flex justify-center relative mb-5">
              <img
                className="lg:rounded-2xl w-full h-90 lg:h-130"
                src={activity.image}
                alt={activity.title}
              />
              <div className="absolute bottom-8 left-9 lg:bottom-13 lg:left-15 flex gap-5">
                <button className="bg-yellow-300 font-bold text-lg rounded-full p-3">
                  from {activity.price[0]} ₼
                </button>
                <button className="cursor-pointer text-2xl text-white border-3 rounded-full px-3">
                  <PiHeartStraightBold />
                </button>
              </div>
              <div className="absolute  justify-between items-center left-10 top-8 z-50 lg:w-[95%] hidden lg:flex">
                <NavLink to={"/"}>
                <img
                  className="w-40 cursor-pointer"
                  src="/123-removebg-preview.png"
                  alt="iTicket Logo"
                />
                </NavLink>
                <div className="flex gap-4 text-white font-bold text-xl">
                  <NavLink to={"/events"} end className="nav-button">All events</NavLink>
                  <button className="nav-button">Concert</button>
                  <button className="nav-button ">Theatre</button>
                  <button className="nav-button">Kids</button>
                  <button className="nav-button">Dream Fest 2025</button>
                  <button className="nav-button">Sport</button>
                  <button className="cursor-pointer">...</button>
                </div>
                <div className="flex items-center font-semibold text-2xl gap-5 text-white">
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
                        className={`absolute right-0 top-14 bg-white w-60 rounded-xl shadow-lg  py-3 px-3 text-black transition-all duration-300 ${
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
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bg-white flex items-center px-15 p-5 gap-5 shadow-2xl rounded-2xl">
                <div className="flex relative">
                  <img
                    className="relative min-w-13 max-w-full h-auto"
                    src="https://iticket.az/images/date.svg"
                    alt=""
                  />
                  <img
                    className="absolute min-w-13 right-8 max-w-full h-auto"
                    src="https://iticket.az/images/venue.svg"
                    alt=""
                  />
                </div>
                <p className="text-xl font-semibold">Venue Date</p>
              </button>

              <button className="bg-white flex items-center  px-15 p-5 gap-5 shadow-2xl rounded-2xl">
                <div className="flex relative">
                  <img
                    className="relative  min-w-13 max-w-full h-auto"
                    src="https://iticket.az/images/locale.svg"
                    alt=""
                  />
                  <p className="bg-[#7A83CE] min-w-13 rounded-full px-4 py-3 flex items-center justify-center text-lg text-white absolute right-7">
                    {activity.ageLimit}+
                  </p>
                </div>
                <p className="text-xl font-semibold">
                  Language Age restrictions
                </p>
              </button>

              <button className="bg-white flex items-center px-15 p-5 gap-5 shadow-2xl rounded-2xl">
                <div className="flex relative">
                  <img
                    className="relative min-w-13 max-w-full h-auto"
                    src="https://iticket.az/images/tickets.svg"
                    alt=""
                  />
                  <img
                    className="absolute min-w-13 right-8 max-w-full h-auto"
                    src="https://iticket.az/images/currency.svg"
                    alt=""
                  />
                </div>
                <p className="text-xl font-semibold">Price Ticket info</p>
              </button>

              <button className="bg-white flex items-center px-15 p-5 gap-5 shadow-2xl rounded-2xl">
                <img
                  className="max-w-full h-auto"
                  src="https://iticket.az/images/info.svg"
                  alt=""
                />
                <p className="text-xl font-semibold">About event</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
