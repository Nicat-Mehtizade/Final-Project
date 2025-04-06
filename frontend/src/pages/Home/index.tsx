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
import { PiHeartStraightBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

const Home = () => {
  const [sliderData, setSliderData] = useState<Activity[]>([]);
  const getAllActivities = async () => {
    try {
      const response = await axios(`${BASE_URL}/activity`);
      setSliderData(response.data.data.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllActivities();
  }, []);
  return (
    <div className="bg-gradient-to-br from-gray-300 to-white">
      <div className="yellowLine"></div>
      <div className="max-w-[1400px] mx-auto">
        <div>
          <div className="py-6">
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
              className="mySwiper !relative"
            >
              {sliderData.map((q) => {
                return (
                  <SwiperSlide
                    className="!rounded-2xl overflow-hidden"
                    key={q._id}
                  >
                    <img
                      className="w-full h-full object-cover rounded-2xl cursor-pointer"
                      src={q.image}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="absolute flex justify-between items-center left-30 top-15 z-50 w-[85%]">
              <img
                className="w-40 cursor-pointer"
                src="./123-removebg-preview.png"
                alt="iTicket Logo"
              />
              <div className="flex gap-4 text-white font-bold text-xl">
                <button className="nav-button">All events</button>
                <button className="nav-button">Concert</button>
                <button className="nav-button ">Theatre</button>
                <button className="nav-button">Kids</button>
                <button className="nav-button">Dream Fest 2025</button>
                <button className="nav-button">Sport</button>
                <button className="cursor-pointer">...</button>
              </div>
              <div className="flex items-center font-semibold text-2xl gap-5 text-white">
                <PiHeartStraightBold className="cursor-pointer" />
                <IoSearch className="cursor-pointer"/>
                <FaShoppingCart className="cursor-pointer"/>
                <FaUserLarge  className="bg-yellow-300 w-12 h-12 p-3 rounded-full text-black cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
