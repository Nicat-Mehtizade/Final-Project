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
import { FaShoppingCart } from "react-icons/fa";
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
const Home = () => {
  const [sliderData, setSliderData] = useState<Activity[]>([]);
  const [tourismData, setTourismData] = useState<Activity[]>([]);
  const [theatreData, setTheatreData] = useState<Activity[]>([]);
  const [kidsData, setKidsData] = useState<Activity[]>([]);
  const [randomData, setRandomData] = useState<Activity[]>([]);
  const [whatsNewData, setWhatsNewData] = useState<Activity[]>([]);

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
  console.log(tourismData);
  return (
    <div className="bg-gradient-to-b from-gray-300 to-white">
      <div
        style={{ clipPath: "polygon(50% 0, 80% 0, 0 100%, 0 60%)" }}
        className="absolute w-full h-full bg-yellow-300 z-0"
      ></div>
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white flex lg:hidden justify-between items-center py-8 px-3 relative z-2">
          <button>
            <RxHamburgerMenu className="text-gray-400 text-2xl" />
          </button>
          <img
            className="w-35 cursor-pointer"
            src="./123-removebg-preview.png"
            alt="iTicket Logo"
          />
          <div className="flex items-center gap-4 text-2xl text-gray-300">
            <FaShoppingCart className="cursor-pointer" />
            <FaUserLarge className="bg-yellow-300 w-12 h-12 p-3 rounded-full text-black cursor-pointer" />
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="py-6 mb-4 ">
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
      <AnimationBottomSection/>
    </div>
  );
};

export default Home;
