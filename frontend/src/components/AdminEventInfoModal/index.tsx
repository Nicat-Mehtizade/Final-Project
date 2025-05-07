import { IoClose } from "react-icons/io5";
import { IoFilmOutline } from "react-icons/io5";
import { LuTag } from "react-icons/lu";
import { MdOutlineTranslate } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { PiArmchairLight } from "react-icons/pi";
import { PiArmchairFill } from "react-icons/pi";
import { Activity } from "../../types/activityType";
import DetailsLocationSection from "../DetailsLocationSection";

interface Props {
  event: Activity;
  onClose: () => void;
}

const AdminEventModal = ({ event, onClose }: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
      <div className="bg-white rounded-xl w-[700px] max-h-[700px] overflow-y-scroll text-black relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl cursor-pointer z-10"
        >
          <IoClose className="text-2xl" />
        </button>
        <div className="relative">
          <img
            className="rounded-tl-lg rounded-tr-lg h-[300px] w-full"
            src={event.image}
            alt={event.title}
          />
          <p className="absolute bg-gray-600 rounded-full px-3 py-0.5 bottom-15 left-6 text-white">
            {event.genre[0].toUpperCase() + event.genre.slice(1)}
          </p>
          <p
            title={event.title.length > 20 ? event.title : undefined}
            className="text-white absolute bottom-6 left-6 text-2xl font-semibold"
          >
            {event.title.length > 20
              ? event.title.slice(0, 20) + "..."
              : event.title}
          </p>
        </div>
        <div className="p-5">
          <h1 className="text-xl font-semibold mb-2">Details</h1>
          <div className="grid grid-cols-2 py-2 gap-4 mb-2">
            <div className="border border-gray-300 py-3 px-5 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <IoFilmOutline className="text-xl text-gray-500" />
                <span className="font-semibold">Genre:</span>
                <span className="text-gray-600 font-semibold">
                  {event.genre[0].toUpperCase() + event.genre.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuTag className="text-xl text-gray-500" />
                <span className="font-semibold">Tag:</span>
                <span className="text-gray-600 font-semibold">{event.tag}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineTranslate className="text-xl text-gray-500" />
                <span className="font-semibold">Language:</span>
                <span className="text-gray-600 font-semibold">
                  {event.language[0].toUpperCase() + event.language.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiDollarSign className="text-xl text-gray-500" />
                <span className="font-semibold">Price Range:</span>
                <span className="text-gray-600 font-semibold">
                  {event.price[0]} - {event.price[3]}₼
                </span>
              </div>
            </div>
            <div className="border border-gray-300 py-3 px-5 rounded-xl flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <LuUsers className="text-xl text-gray-500" />
                <span className="font-semibold">Age Limit:</span>
                <span className="text-gray-600 font-semibold">
                  {event.ageLimit}+
                </span>
              </div>
              <div className="flex items-center gap-2">
                <LuCalendar className="text-xl text-gray-500" />
                <span className="font-semibold">Date:</span>
                <span className="text-gray-600 font-semibold">
                  {new Date(event.showtimes[0].startTime).toLocaleDateString("en-GB", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PiArmchairLight className="text-xl text-gray-500" />
                <span className="font-semibold">Total Seats:</span>
                <span className="text-gray-600 font-semibold">
                  {event.seats.reduce((acc, zone) => acc + zone.length, 0)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PiArmchairFill className="text-xl text-gray-500" />
                <span className="font-semibold">Booked Seats:</span>
                <span className="text-gray-600 font-semibold">
                  {event.seats.flat().filter((seat) => seat.isBooked).length}
                </span>
              </div>
            </div>
          </div>
          <div className="border border-gray-300 py-3 px-5 rounded-xl max-h-[150px] overflow-y-scroll">
            <p className="font-semibold text-sm mb-2">Description</p>
            <p>{event.description}</p>
          </div>
          <DetailsLocationSection activity={event} />
        </div>
      </div>
    </div>
  );
};

export default AdminEventModal;
