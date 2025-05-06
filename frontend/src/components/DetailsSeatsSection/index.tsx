import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { Activity, Seat } from "../../types/activityType";
import toast, { Toaster } from "react-hot-toast";
import userType from "../../types/userType";

const DetailsSeatsSection = forwardRef<
  HTMLDivElement,
  { activity: Activity; user: userType | null }
>(({ activity, user }, ref) => {
  const [basketSeats, setBasketSeats] = useState<string[]>([]);

  useEffect(() => {
    if (user?.basket) {
      const basketSeatNumbers = user.basket
        .filter((item) => item.activityId.toString() === activity._id)
        .filter((item) => item.seat)
        .map((item) => item.seat.seatNumber);
      setBasketSeats(basketSeatNumbers);
    }
  }, [user, activity._id]);

  const handleSeatSelect = async (seat: Seat) => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("You must be logged in to add items to the basket");
      return;
    }

    if (seat.isBooked) {
      toast.error("This seat is already booked.",{
        style: {
          backgroundColor:"var(--color-yellow-300)",
          fontWeight: "700",
          borderRadius:"20px"
        },
      })
      return;
    }

    const isSelected = basketSeats.includes(seat.seatNumber);

    let priceIndex = 0;

    if (seat.zone === "A") priceIndex = 3;
    else if (seat.zone === "B") priceIndex = 2;
    else if (seat.zone === "C") priceIndex = 1;
    else if (seat.zone === "D") priceIndex = 0;
    const selectedPrice = activity.price[priceIndex];

    try {
      await axios.post(
        `${BASE_URL}/basket`,
        {
          seat,
          activityId: activity._id,
          price: selectedPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (isSelected) {
        setBasketSeats((prev) => prev.filter((s) => s !== seat.seatNumber));
      } else {
        setBasketSeats((prev) => [...prev, seat.seatNumber]);
        toast.success("Tickets were added to basket",{
          icon:null,
          style: {
            backgroundColor:"var(--color-yellow-300)",
            fontWeight: "700",
            borderRadius:"20px"
          },
        })
      }
    } catch (error) {
      console.log(error);
      toast.error("You must be logged in to add items to the basket");
    }
  };

  return (
    <div
      ref={ref}
      className="shadow-[0px_12px_24px_rgba(0,0,0,0.35)] rounded-xl mb-10"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col lg:flex-row items-start justify-between py-5 px-9 border-b-1 border-gray-300 lg:items-center bg-white rounded-tl-lg rounded-tr-lg relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-6 bg-yellow-300 rounded-tl-lg"></div>
        <div className="relative lg:pl-3 font-semibold text-lg">
          <span title={activity.title}>
            {activity.title.length > 50
              ? activity.title.slice(0, 50) + "..."
              : activity.title}{" "}
          </span>
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
        {activity.seats
          .slice()
          .reverse()
          .map((seatRow, rowIndex) => {
            return (
              <div
                key={`row-${rowIndex}`}
                className="grid grid-cols-10 gap-2 mb-2 lg:gap-5 lg:mb-5 justify-center"
              >
                {seatRow.map((s) => (
                  <button
                    onClick={() => handleSeatSelect(s)}
                    className={`relative w-8 h-8 lg:w-12 lg:h-12 flex justify-center items-end cursor-pointer transition-all duration-200 ${
                      basketSeats.includes(s.seatNumber)
                      ? "bg-yellow-400"
                      : s.isBooked
                      ? "bg-gray-500"
                      : "bg-gray-300"
                    } rounded-t-full border-2 ${
                      basketSeats.includes(s.seatNumber)
                      ? "border-yellow-600"
                      : s.isBooked
                      ? "border-gray-700"
                      : "border-gray-400"
                    } hover:scale-105`}
                    key={s._id}
                  >
                    <span className="text-[10px] lg:text-[12px] font-semibold mb-1">
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
});

export default DetailsSeatsSection;
