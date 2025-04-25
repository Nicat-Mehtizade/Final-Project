import { Activity } from "../../types/activityType";
import { forwardRef } from "react";

const DetailsSeatsSection = forwardRef<HTMLDivElement, { activity: Activity }>(
  ({ activity }, ref) => {
    return (
      <div
      ref={ref}
      className="shadow-[0px_12px_24px_rgba(0,0,0,0.35)] rounded-xl mb-10">
        <div className="flex flex-col lg:flex-row items-start justify-between py-5 px-9 border-b-1 border-gray-300 lg:items-center bg-white rounded-tl-lg rounded-tr-lg relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-6 bg-yellow-300 rounded-tl-lg"></div>
          <div className="relative lg:pl-3 font-semibold text-lg">
            <span>{activity.title} </span>
            <span>(Language: {activity.language}) </span>
            <span>({activity.ageLimit}+)</span>
          </div>
          <div className="lg:border-l border-gray-300 lg:pl-4">
            <p className="text-gray-500 text-lg">Date</p>
            <p className="font-semibold text-lg">
              {new Date(activity.showtimes[0].startTime).toLocaleDateString(
                "en-GB",
                { weekday: "short" }
              )}{" "}
              {new Date(activity.showtimes[0].startTime)
                .toLocaleDateString("en-GB")
                .replace(/\//g, ".")}{" "}
              {new Date(activity.showtimes[0].startTime).toLocaleTimeString(
                "en-GB",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }
              )}{" "}
              -{" "}
              {new Date(activity.showtimes[0].endTime).toLocaleTimeString(
                "en-GB",
                { hour: "2-digit", minute: "2-digit", hour12: false }
              )}
            </p>
          </div>
          <div className="lg:border-l border-gray-300 lg:px-8">
            <p className="text-gray-500 text-lg">Price</p>
            <p className="font-semibold text-lg">
              {activity.price[0]}-{activity.price[3]} ₼
            </p>
          </div>
        </div>
        <div className="max-w-[800px] mx-auto py-5">
          {activity.seats.map((seatRow, rowIndex) => {
            return (
              <div
                key={`row-${rowIndex}`}
                className="grid grid-cols-10 gap-2 mb-2 lg:gap-5 lg:mb-5 justify-center"
              >
                {seatRow.map((s) => (
                  <button
                    className="border-2 w-5 h-7 lg:w-9 lg:h-10 rounded-tl-lg flex justify-center items-center rounded-tr-lg cursor-pointer bg-[#CCCCCC] border-gray-400"
                    key={s._id}
                  >
                    <span className="bg-white rounded-full w-4 h-4 lg:w-6 text-[7px] lg:text-[9px] font-bold lg:h-6 flex items-center justify-center">
                      {s.seatNumber}
                    </span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default DetailsSeatsSection;

{
  /* <div
      
className="shadow-[0px_12px_24px_rgba(0,0,0,0.35)] rounded-xl mb-10"
>
<div className="flex flex-col lg:flex-row items-start justify-between py-5 px-9 border-b-1 border-gray-300 lg:items-center bg-white rounded-tl-lg rounded-tr-lg relative overflow-hidden">
  <div className="absolute left-0 top-0 h-full w-6 bg-yellow-300 rounded-tl-lg"></div>
  <div className="relative lg:pl-3 font-semibold text-lg">
    <span>{activity.title} </span>
    <span>(Language: {activity.language}) </span>
    <span>({activity.ageLimit}+)</span>
  </div>
  <div className="lg:border-l border-gray-300 lg:pl-4">
    <p className="text-gray-500 text-lg">Date</p>
    <p className="font-semibold text-lg">
      {new Date(activity.showtimes[0].startTime).toLocaleDateString(
        "en-GB",
        { weekday: "short" }
      )}{" "}
      {new Date(activity.showtimes[0].startTime)
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")}{" "}
      {new Date(activity.showtimes[0].startTime).toLocaleTimeString(
        "en-GB",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }
      )}{" "}
      -{" "}
      {new Date(activity.showtimes[0].endTime).toLocaleTimeString(
        "en-GB",
        { hour: "2-digit", minute: "2-digit", hour12: false }
      )}
    </p>
  </div>
  <div className="lg:border-l border-gray-300 lg:px-8">
    <p className="text-gray-500 text-lg">Price</p>
    <p className="font-semibold text-lg">
      {activity.price[0]}-{activity.price[3]} ₼
    </p>
  </div>
</div>
<div className="max-w-[800px] mx-auto py-5">
  {activity.seats.map((seatRow, rowIndex) => {
    return (
      <div
        key={`row-${rowIndex}`}
        className="grid grid-cols-10 gap-2 mb-2 lg:gap-5 lg:mb-5 justify-center"
      >
        {seatRow.map((s) => (
          <button
            className="border-2 w-5 h-7 lg:w-9 lg:h-10 rounded-tl-lg flex justify-center items-center rounded-tr-lg cursor-pointer bg-[#CCCCCC] border-gray-400"
            key={s._id}
          >
            <span className="bg-white rounded-full w-4 h-4 lg:w-6 text-[7px] lg:text-[9px] font-bold lg:h-6 flex items-center justify-center">
              {s.seatNumber}
            </span>
          </button>
        ))}
      </div>
    );
  })}
</div>
</div> */
}
