import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { Activity } from "../../types/activityType";
import "./index.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import MostPopularSection from "../../components/MostPopularSection";
import SlideNavBar from "../../components/SlideNavBar";
import AzerbaijanTravelSection from "../../components/AzerbaijanTravelSection";
import TourismSection from "../../components/TourismSection";
import HomeGifSection from "../../components/HomeGifSection";
import TheatreSection from "../../components/TheatreSection";
import KidsSection from "../../components/KidsSection";
import WeekendSection from "../../components/WeekendSection";
import WhatsNewSection from "../../components/WhatsNewSection";
import AnimationBottomSection from "../../components/AnimationBottomSection";
import { IoLogOutOutline, IoSearch, IoWallet } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import { NavLink, useNavigate } from "react-router-dom";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { GrHistory } from "react-icons/gr";
import { MdCardGiftcard } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
const Home = () => {
  const [sliderData, setSliderData] = useState<Activity[]>([]);
  const [tourismData, setTourismData] = useState<Activity[]>([]);
  const [theatreData, setTheatreData] = useState<Activity[]>([]);
  const [kidsData, setKidsData] = useState<Activity[]>([]);
  const [randomData, setRandomData] = useState<Activity[]>([]);
  const [whatsNewData, setWhatsNewData] = useState<Activity[]>([]);
  const [navbarActive, setNavbarActive] = useState(false);
  const nav = useNavigate();
  const token = getTokenFromCookie();
  console.log(token);
  const [profileVisible, setProfileVisible] = useState(false);

  const login = () => {
    window.location.href = "http://localhost:5173/login";
  };
  const getAllActivities = async () => {
    try {
      const response = await axios(`${BASE_URL}/activity`);
      setSliderData(response.data.data.slice(0, 8));

      const tourismActivities = response.data.data.filter(
        (q: Activity) => q.genre == "tourism"
      );
      const theatreActivities = response.data.data.filter(
        (q: Activity) => q.genre == "theatre"
      );
      const kidsActivities = response.data.data.filter(
        (q: Activity) => q.genre == "kids"
      );
      setTourismData(tourismActivities);
      setTheatreData(theatreActivities);
      setKidsData(kidsActivities);
      setRandomData([
        ...tourismActivities.slice(0, 2),
        ...theatreActivities.slice(0, 2),
        ...kidsActivities.slice(0, 2),
      ]);
      setWhatsNewData(
        [...response.data.data]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 6)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllActivities();
  }, []);

  const handleDetails = async (id: string) => {
    nav(`events/${id}`);
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
    <div className="bg-gradient-to-b from-gray-300 to-white">
      <div
        style={{ clipPath: "polygon(50% 0, 80% 0, 0 100%, 0 60%)" }}
        className="absolute w-full h-full bg-yellow-300 z-0"
      ></div>
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white flex lg:hidden justify-between items-center py-8 px-3 relative z-2">
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
                    className="mb-4 block lg:hidden text-white text-3xl font-bold absolute -right-10 top-5"
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
          <img
            className="w-35 cursor-pointer"
            src="./123-removebg-preview.png"
            alt="iTicket Logo"
          />
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
                  className={`absolute right-0 top-20 bg-white w-60 rounded-xl shadow-lg  py-3 px-3 text-black transition-all duration-300 ${
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
        <div className="relative overflow-hidden">
          <div className="lg:py-6 mb-4 ">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper !relative "
            >
              {sliderData.map((q) => {
                return (
                  <SwiperSlide
                    className="!lg:rounded-2xl overflow-hidden"
                    key={q._id}
                  >
                    <img
                      onClick={() => handleDetails(q._id)}
                      className="w-full h-full object-cover lg:rounded-2xl cursor-pointer"
                      src={q.image}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <SlideNavBar />
          </div>
        </div>
      </div>
      <MostPopularSection sliderData={sliderData} />
      <AzerbaijanTravelSection />
      <TourismSection tourismData={tourismData} />
      <HomeGifSection />
      <TheatreSection theatreData={theatreData} />
      <KidsSection kidsData={kidsData} />
      <WeekendSection randomData={randomData} />
      <WhatsNewSection whatsNewData={whatsNewData} />
      <AnimationBottomSection />
    </div>
  );
};

export default Home;
