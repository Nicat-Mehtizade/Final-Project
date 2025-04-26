import axios from "axios";
import { Activity } from "../../types/activityType";
import { BASE_URL } from "../../constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailsSimilarEventsSection = ({ activity }: { activity: Activity }) => {
  const [similarActivities, setSimilarActivities] = useState<Activity[]>([]);
  const nav=useNavigate()
  const getAllEvents = async () => {
    try {
      const response = await axios(`${BASE_URL}/activity`);
      const filteredActivities = response.data.data.filter(
        (q: Activity) => q.genre == activity.genre && q._id !== activity._id
      );
      setSimilarActivities(filteredActivities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const handleDetails = async (id: string) => {
    nav(`/events/${id}`);
  };


  return (
    <div className="max-w-[1200px] mx-auto py-5">
      <h1 className="text-3xl font-bold mb-2">Similar Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-10 py-5">
        {similarActivities.length > 0 ? (
          similarActivities.map((a) => {
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
          <div className="flex items-center gap-2 font-semibold py-10">
            <img
              className="w-7"
              src="https://iticket.az/images/warning.svg"
              alt=""
            />
            No similar events found for this event.
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsSimilarEventsSection;
