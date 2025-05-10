import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useGetActivitiesQuery } from "../../redux/services/activity";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const TourismPage = () => {
   const {data:allActivities,isError,isLoading}=useGetActivitiesQuery({genre:"tourism"})
    const [priceRange, setPriceRange] = useState<number[]>([1, 10000]);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const nav = useNavigate();

      const handleDetails = async (id: string) => {
        nav(`/events/${id}`);
      };
    
      const handlePriceChange = (_: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
      };
      
      if (isLoading) {
        return <div className="max-w-[1280px] mx-auto flex items-center gap-2 font-semibold py-15 mb-10"><img className="w-7" src="https://iticket.az/images/warning.svg" alt="" />Loading events, please wait a moment...</div>
      }
    
      if (isError) {
        return <div className="max-w-[1280px] mx-auto flex items-center gap-2 font-semibold py-15 mb-10"><img className="w-7" src="https://iticket.az/images/warning.svg" alt="" />There was an error loading the events.</div>
      }
    
      const filteredActivities = (allActivities || []).filter((a) => {
        const minPrice = Math.min(...a.price);
        const activityDate = dayjs(a.showtimes[0].startTime);
    
        const isPriceInRange =
          minPrice >= priceRange[0] && minPrice <= priceRange[1];
    
        const isStartValid = startDate
          ? activityDate.isSameOrAfter(startDate, "day")
          : true;
        const isEndValid = endDate
          ? activityDate.isSameOrBefore(endDate, "day")
          : true;
    
        return isPriceInRange && isStartValid && isEndValid;
      });

  return (
    <div className=" py-12">
      <div className="max-w-[1320px] mx-auto">
        <div>
          <h1 className="text-3xl font-medium mb-10">Tourism</h1>
          <div className="md:flex md:justify-around mb-5">
            <div className="mb-4 md:mb-0">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  format="DD/MM/YYYY"
                />
                <DatePicker
                  label="End date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </div>
            <div className="relative md:w-[35%] bg-white rounded-full p-2 py-3 shadow-[0px_2px_8px_rgba(0,0,0,0.35)] ">
              <p className="text-center font-semibold">
                Price from {priceRange[0].toFixed(2)} ₼ to{" "}
                {priceRange[1].toFixed(2)} ₼
              </p>
              <Box
                className="absolute left-0 -bottom-6.5 2xl:-bottom-5.5 w-full px-4"
                
              >
                <Slider
                  track="inverted"
                  aria-labelledby="track-inverted-range-slider"
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={1}
                  max={10000}
                  sx={{
                    color: "#FFD700",
                    height: 5,
                    "& .MuiSlider-thumb": {
                      borderRadius: "50%",
                      height: 24,
                      width: 24,
                      "&:hover": {
                        boxShadow: "0 0 0 8px rgba(255, 215, 0, 0.3)",
                      },
                    },
                    "& .MuiSlider-track": {
                      backgroundColor: "#FFD700",
                      border: "none",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#FFD700",
                    },
                    "&.Mui-focusVisible": {
                      boxShadow: "0 0 0 8px rgba(255, 215, 0, 0.5)",
                      outline: "none",
                    },
                    "& .MuiSlider-valueLabel": {
                      backgroundColor: "#FFD700",
                      color: "black",
                    },
                  }}
                />
              </Box>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10 py-5">
            {filteredActivities ? (
              filteredActivities.map((a) => {
                return (
                  <div
                    onClick={() => handleDetails(a._id)}
                    className="px-3 relative group group-hover:bg-white overflow-hidden rounded-lg"
                    key={a._id}
                  >
                    <div className="relative">
                      <img
                        className="rounded-xl shadow-md transition duration-300 group-hover:scale-90 group-hover:translate-y-[-15px] object-cover h-100 w-full cursor-pointer"
                        src={a.image}
                        alt={a.title}
                      />
                    </div>
                    <p className="absolute top-2 right-5 bg-yellow-300 font-bold text-lg rounded-full p-3 transform duration-300 group-hover:top-4 group-hover:right-9 transition-all">
                      from {a.price[0]} ₼
                    </p>
                    <div>
                      <p className="text-white absolute bottom-10 left-8 font-semibold text-lg lg:text-xl transform group-hover:translate-y-10.5 transition-all duration-300 group-hover:text-gray-500 group-hover:text-sm">
                        {new Date(a.showtimes[0].startTime).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-white absolute bottom-2 left-8 font-semibold text-lg lg:text-xl transform group-hover:translate-y-[-3px] transition-all duration-300 group-hover:text-black group-hover:text-lg">
                        {a.title.length > 20
                          ? a.title.slice(0, 20) + "..."
                          : a.title}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>There is no activity,yet!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TourismPage