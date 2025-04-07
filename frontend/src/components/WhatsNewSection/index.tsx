import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Activity } from "../../types/activityType"; 

interface ArrowProps {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
  }

interface WhatsNewSectionProps {
    whatsNewData: Activity[];
  }
const WhatsNewSection = ({whatsNewData}:WhatsNewSectionProps) => {
    function SampleNextArrow({ className, style, onClick }: ArrowProps) {
        return (
          <div
            className={`${className} custom-arrow`}
            style={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFDD00",
              padding: "70px",
              borderRadius: "100%",
              right: "-85px",
              zIndex: 2,
            }}
            onClick={onClick}
          ></div>
        );
      }
    
      function SamplePrevArrow({ className, style, onClick }: ArrowProps) {
        return (
          <div
            className={className}
            style={{
              ...style,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFDD00",
              padding: "70px",
              borderRadius: "100%",
              left: "-85px",
              zIndex: 2,
            }}
            onClick={onClick}
          />
        );
      }
    
      const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "130px",
        slidesToShow: 4,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow className="" style={{}} onClick={() => {}}/>,
        prevArrow: <SamplePrevArrow className="" style={{}} onClick={() => {}} />,
        responsive: [
          {
            breakpoint: 1100, 
            settings: {
              slidesToShow: 3, 
              centerPadding: "60px", 
            },
          },
          {
            breakpoint: 768, 
            settings: {
              slidesToShow: 2, 
              centerPadding: "30px", 
            },
          },
          {
            breakpoint: 480, 
            settings: {
              slidesToShow: 1, 
              centerPadding: "0px", 
            },
          },
        ],
      };
  return (
     <div className="max-w-[1550px] mx-auto overflow-hidden relative mb-20">
                 <div style={{clipPath: "polygon(0 0 , 100% 0, 100% 10% ,0 100%)"}} className="absolute w-full h-full bg-yellow-300 z-0"></div>
                            <h1 className="text-3xl font-bold py-4 mb-2 ml-10 md:ml-20 lg:ml-30 relative z-10">What's new</h1>
                            <div className="relative z-10">
                              <Slider {...settings}>
                                {whatsNewData.map((q) => {
                                  return (
                                    <div
                                      className="px-3 relative group group-hover:bg-white overflow-hidden rounded-lg"
                                      key={q._id}
                                    >
                                      <div className="relative">
                                        <img
                                          className="rounded-xl shadow-md transition duration-300 group-hover:scale-90 group-hover:translate-y-[-15px] object-cover h-100 w-full cursor-pointer"
                                          src={q.image}
                                          alt={q.title}
                                        />
                                      </div>
                                      <p className="absolute top-2 right-5 bg-yellow-300 font-bold text-lg rounded-full p-3 transform duration-300 group-hover:top-4 group-hover:right-9 transition-all">
                                        from {q.price[0]} ₼
                                      </p>
                                      <div>
                                        <p className="text-white absolute bottom-10 left-8 font-semibold text-lg lg:text-xl transform group-hover:translate-y-10.5 transition-all duration-300 group-hover:text-gray-500 group-hover:text-sm">
                                          {new Date(q.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                          })}
                                        </p>
                                        <p className="text-white absolute bottom-2 left-8 font-semibold text-lg lg:text-xl transform group-hover:translate-y-[-3px] transition-all duration-300 group-hover:text-black group-hover:text-lg">
                                          {q.title.length > 20
                                            ? q.title.slice(0, 20) + "..."
                                            : q.title}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </Slider>
                            </div>
                          </div>
  )
}

export default WhatsNewSection