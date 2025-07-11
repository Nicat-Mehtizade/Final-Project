import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import JwtType from "../../types/jwtType";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import userType from "../../types/userType";
import { Activity } from "../../types/activityType";
import { MdDelete } from "react-icons/md";
import { Seat } from "../../types/activityType";
import toast, { Toaster } from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import { loadStripe } from "@stripe/stripe-js";
const Basket = () => {
  const token = getTokenFromCookie();
  const [user, setUser] = useState<userType | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [promoCode, setPromoCode] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripePromise = loadStripe(
    "pk_test_51RITo2Cam93Y6EX3TyMSVqFSAdp5JMa3vzN2lTugzONNd00EKrF1d9xWdJpIEXdBvKeZ2Ux5ps7hO8vXIhUU1GHi00mZg7TiO3"
  );
  const [promoInput, setPromoInput] = useState("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const discountedTotal = useMemo(() => {
    return promoApplied
      ? totalPrice - totalPrice * (promoDiscount / 100)
      : totalPrice;
  }, [totalPrice, promoApplied, promoDiscount]);

  const handleCheckout = async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const stripe = await stripePromise;
    if (!token) {
      console.log("Token not found");
      return;
    }
    try {
      const basketItems = basketActivities.map((item) => ({
        title: item.activity?.title,
        image: item.activity?.image,
        price: promoApplied
          ? item.price - item.price * (promoDiscount / 100)
          : item.price,
        ticketCount: item.seat ? 1 : 0,
        activityId: item.activity?._id,
        seat: item.seat
          ? {
              seatNumber: item.seat.seatNumber,
              zone: item.seat.zone,
              row: item.seat.row,
              col: item.seat.col,
            }
          : null,
      }));
      localStorage.setItem("basketItems", JSON.stringify(basketItems));
      const response = await axios.post<{ sessionId: string }>(
        `${BASE_URL}/create-checkout-session`,
        {
          basketItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 100));
      const { sessionId } = response.data;
      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error(
          "Stripe could not be initialized or sessionId is missing"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment error. Please try again.", {
        position: "top-right",
        style: {
          backgroundColor: "var(--color-yellow-300)",
          fontWeight: "700",
          borderRadius: "20px",
        },
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
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

        await getActivities();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getActivities = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/activity`);
        setActivities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [token]);

  const basketActivities = useMemo(() => {
    return (
      user?.basket.map((basketItem) => {
        const activity = activities.find(
          (activity) =>
            activity._id.toString() === basketItem.activityId.toString()
        );
        return { ...basketItem, activity: activity || null };
      }) ?? []
    );
  }, [user, activities]);

  useEffect(() => {
    const total = basketActivities.reduce((acc, item) => {
      if (item.activity && item.seat) {
        return acc + item.price;
      }
      return acc;
    }, 0);
    setTotalPrice(total);
  }, [basketActivities]);
  

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    activityId: string,
    seat: Seat
  ) => {
    event.preventDefault();
    if (!token || !user) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/basket`,
        {
          activityId,
          seat,
          price: seat.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({ ...user, basket: response.data.basket });
      toast.success("Event removed successfully!", {
        position: "top-right",
        style: {
          backgroundColor: "var(--color-yellow-300)",
          fontWeight: "700",
          borderRadius: "20px",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyPromo = async () => {
    if (!user || !user._id) {
      toast.error("User information is missing. Please log in..", {
        position: "top-right",
        style: {
          backgroundColor: "var(--color-yellow-300)",
          fontWeight: "700",
          borderRadius: "20px",
        },
      });
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/promo/validate`, {
        code: promoInput.trim(),
        userId: user._id,
      });

      const { discount } = response.data;

      if (discount) {
        const numericDiscount = parseFloat(discount.replace("%", ""));
        setPromoDiscount(numericDiscount);
        setPromoApplied(true);

        toast.success("Promo code applied!", {
          position: "top-right",
          style: {
            backgroundColor: "var(--color-yellow-300)",
            fontWeight: "700",
            borderRadius: "20px",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Promo code not found!", {
        position: "top-right",
        style: {
          backgroundColor: "var(--color-yellow-300)",
          fontWeight: "700",
          borderRadius: "20px",
        },
      });
    }
  };

  return (
    <div className="py-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white shadow-[0px_6px_24px_rgba(0,0,0,0.35)] rounded-2xl">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[73%] py-7 px-6">
              <h1 className="text-3xl font-semibold mb-2">Cart</h1>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <SyncLoader color="#facc15" />
                </div>
              ) : basketActivities && basketActivities.length > 0 ? (
                basketActivities.map((item) => {
                  if (!item.activity) {
                    return null;
                  }
                  console.log(item);
                  const { activity, seat } = item as {
                    activity: Activity;
                    seat: Seat;
                  };

                  const isBooked = seat.isBooked;
                  return (
                    <div
                      className={`flex flex-col md:flex-row gap-2 justify-between items-start md:items-center py-5 ${
                        basketActivities.length > 1
                          ? "border-b-2 border-gray-300"
                          : ""
                      }`}
                      key={`${activity._id}-${seat.seatNumber}`}
                    >
                      <div className="flex gap-2 items-center">
                        <img
                          className="w-25 h-25 rounded-lg"
                          src={activity.image}
                          alt={activity.title}
                        />
                        <div>
                          <p className="text-gray-500 text-sm font-semibold">
                            {new Date(activity.date).toLocaleString("en-GB", {
                              weekday: "long",
                            })}{" "}
                            ,{" "}
                            {new Date(activity.date).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "long",
                            })}{" "}
                            -{" "}
                            {new Date(
                              activity.showtimes[0].startTime
                            ).toLocaleString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "UTC",
                            })}
                          </p>
                          <p
                            title={activity.title}
                            className="font-semibold text-2xl"
                          >
                            {activity.title.length > 40
                              ? activity.title.slice(0, 40) + "..."
                              : activity.title}
                          </p>
                          <div className="text-gray-700 ">
                            <span className="font-bold">Type:</span>{" "}
                            <span
                              className={`italic font-medium ${
                                seat.type === "silver"
                                  ? "text-gray-400 dark:text-gray-300"
                                  : seat.type === "gold"
                                  ? "text-amber-500 dark:text-amber-400"
                                  : seat.type === "vip"
                                  ? "text-indigo-600 dark:text-indigo-400"
                                  : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {seat.type.toUpperCase()}
                            </span>
                            , <span className="font-bold">Zone:</span>{" "}
                            {seat.zone},{" "}
                            <span className="font-bold">Seat Number:</span>{" "}
                            {seat.seatNumber},{" "}
                            <span className="font-bold">Row:</span> {seat.row}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full md:w-auto gap-3">
                        <p
                          className={`bg-yellow-300 rounded-xl w-30 h-20 flex justify-center items-center text-2xl font-semibold ${
                            isBooked ? "bg-gray-600" : ""
                          }`}
                        >
                          {promoDiscount
                            ? (item.price * (1 - promoDiscount / 100)).toFixed(
                                2
                              )
                            : item.price}{" "}
                          ₼
                        </p>
                        <button
                          onClick={(event) =>
                            handleDelete(
                              event,
                              item.activity?._id || "",
                              item.seat
                            )
                          }
                          className={`rounded-full cursor-pointer transition duration-300 hover:bg-red-500 flex justify-center items-center w-10 h-10 ${
                            isBooked
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-red-400"
                          }`}
                          disabled={isBooked}
                        >
                          <MdDelete className="text-white text-3xl" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center gap-2 font-semibold py-10">
                  <img
                    className="w-7"
                    src="https://iticket.az/images/warning.svg"
                    alt=""
                  />
                  No tickets in the basket.
                </div>
              )}
            </div>
            <div className="w-full md:w-[25%] flex flex-col border-l border-gray-200 p-6 md:pl-6 py-8">
              <h1 className="text-xl text-gray-500 font-semibold mb-10">
                Payment information
              </h1>
              <div className="mb-5">
                <h1 className="text-gray-500 mb-2 font-semibold text-lg">
                  Promocode
                </h1>
                <button
                  className={`font-semibold cursor-pointer ${
                    !promoCode ? "text-blue-500" : "text-red-400 mb-3"
                  }`}
                  onClick={() => setPromoCode(!promoCode)}
                >
                  {!promoCode
                    ? "I have a promo code"
                    : "I dont have a promo code"}
                </button>
                {promoCode && (
                  <div className="flex flex-col">
                    <input
                      className="border border-gray-300 mb-3 p-3 rounded-xl placeholder:text-gray-400 focus:outline-0 focus:bg-gray-100"
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="PROMO"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="bg-yellow-300 cursor-pointer py-4 px-3 rounded-xl text-lg font-semibold"
                    >
                      {promoApplied ? "Applied" : "Apply Promo Code"}
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between text-xl font-semibold">
                <p className="text-gray-500">Total</p>
                <div className="flex flex-col items-end">
                  {promoApplied ? (
                    <p className="text-gray-500 line-through text-lg">
                      {totalPrice.toFixed(2)} ₼
                    </p>
                  ) : null}

                  <p className="font-bold text-lg">
                    {discountedTotal.toFixed(2)} ₼
                  </p>
                </div>
              </div>
              <div className="pt-10">
                <button
                  onClick={handleCheckout}
                  disabled={basketActivities.length === 0 || isProcessing}
                  className="bg-yellow-300 w-full py-3 text-xl font-semibold rounded-xl cursor-pointer"
                >
                  {isProcessing ? (
                    <SyncLoader color="#fff" size={10} />
                  ) : (
                    "Create Order   "
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
