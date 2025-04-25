import { NavLink, useParams } from "react-router-dom";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import { IoMdClose } from "react-icons/io";
import userType from "../../types/userType";
import { jwtDecode } from "jwt-decode";
import JwtType from "../../types/jwtType";
import { IoMdHeart } from "react-icons/io";
import DetailsSeatsSection from "../../components/DetailsSeatsSection";
import DetailsAboutSection from "../../components/DetailsAboutSection";
import DetailsLocationSection from "../../components/DetailsLocationSection";
import DetailsSimilarEventsSection from "../../components/DetailsSimilarEventsSection";

const Details = () => {
  const { id } = useParams();
  const token = getTokenFromCookie();
  const [profileVisible, setProfileVisible] = useState(false);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [navbarActive, setNavbarActive] = useState(false);
  const [slideNavbarVisible, setSlideNavbarVisible] = useState(false);
  const [user, setUser] = useState<userType | null>(null);
  const priceTicketInfo = useRef<HTMLDivElement | null>(null);
  const activityLocation = useRef<HTMLDivElement | null>(null);
  const activityLanguageAndAge = useRef<HTMLDivElement | null>(null);

  const getActivity = async (id: string | undefined) => {
    try {
      const response = await axios(`${BASE_URL}/activity/${id}`);
      setActivity(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    if (!token) {
      console.log("Token not found");
      return;
    }
    const decoded = jwtDecode<JwtType>(token);
    try {
      const response = await axios(`${BASE_URL}/users/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getActivity(id);
  }, [id]);

  // console.log(activity);

  const login = () => {
    window.location.href = "/login";
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

  const handleFav = async (id: string) => {
    try {
      await axios.post(
        `${BASE_URL}/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const scrollPriceTicketInfo = () => {
    priceTicketInfo.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollActivityLocation = () => {
    activityLocation.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollActivityLanguageAndAge = () => {
    activityLanguageAndAge.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-b from-gray-300 to-white">
      <div className="max-w-[1350px] mx-auto">
        <div className="bg-white flex lg:hidden justify-between items-center py-4 px-3 relative z-2">
          <button onClick={() => setNavbarActive(!navbarActive)}>
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
              className="w-35 cursor-pointer"
              src="/123-removebg-preview.png"
              alt="iTicket Logo"
            />
          </NavLink>
          <div className="flex items-center gap-4 text-2xl text-gray-300">
            <FaShoppingCart className="cursor-pointer" />
            <div
              onMouseOver={() => token && setProfileVisible(true)}
              onMouseLeave={() => token && setProfileVisible(false)}
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
                <button
                  onClick={() => handleFav(activity._id)}
                  className={`cursor-pointer text-2xl text-white border-3 rounded-full px-3 ${
                    user?.wishlist.includes(activity._id)
                      ? "border-yellow-300"
                      : ""
                  }`}
                >
                  {user?.wishlist.includes(activity._id) ? (
                    <IoMdHeart className="text-yellow-300" />
                  ) : (
                    <PiHeartStraightBold />
                  )}
                </button>
              </div>
              <div className="absolute  justify-between items-center left-10 top-8 z-50 lg:w-[95%] hidden lg:flex">
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
              </div>
            </div>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
              <button
                onClick={scrollActivityLocation}
                className="bg-white flex items-center px-15 p-5 gap-5 shadow-2xl rounded-2xl"
              >
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

              <button
                onClick={scrollActivityLanguageAndAge}
                className="bg-white flex items-center  px-15 p-5 gap-5 shadow-2xl rounded-2xl"
              >
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

              <button
                onClick={scrollPriceTicketInfo}
                className="bg-white flex items-center px-15 p-5 gap-5 shadow-2xl rounded-2xl"
              >
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

              <button
                onClick={scrollActivityLanguageAndAge}
                className="bg-white flex items-center px-15 p-5 gap-5 shadow-2xl rounded-2xl"
              >
                <img
                  className="max-w-full h-auto"
                  src="https://iticket.az/images/info.svg"
                  alt=""
                />
                <p className="text-xl font-semibold">About event</p>
              </button>
            </div>
            <DetailsSeatsSection ref={priceTicketInfo} activity={activity} />
            <DetailsAboutSection
              ref={activityLanguageAndAge}
              activity={activity}
            />
            <DetailsLocationSection
              ref={activityLocation}
              activity={activity}
            />
            <DetailsSimilarEventsSection activity={activity} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
