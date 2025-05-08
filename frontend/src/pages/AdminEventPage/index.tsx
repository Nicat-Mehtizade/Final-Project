import { useEffect, useState } from "react";
import { Activity } from "../../types/activityType";
import axios from "axios";
import { BASE_URL } from "../../constant";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import AdminEventModal from "../../components/AdminEventInfoModal";
import AdminEventUpdateModal from "../../components/AdminEventUpdateModal";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const AdminEventPage = () => {
  const [allEvents, setAllEvents] = useState<Activity[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Activity | null>(null);
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateEvent, setUpdateEvent] = useState<Activity | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Activity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const token = getTokenFromCookie();
  const getAllActivities = async () => {
    setLoading(true);
    try {
      const response = await axios(`${BASE_URL}/activity`);
      setAllEvents(response.data.data);
      setFilteredEvents(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllActivities();
  }, [currentPage]);

  const uniqueGenres = [...new Set(allEvents.map((event) => event.genre))];

  const handleDeleteEvent = async (id?: string) => {
    if (!token) {
      console.log("Token not found");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This event will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#2f363e",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/activity/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          title: "Deleted!",
          text: "Event has been deleted.",
          icon: "success",
          background: "#2f363e",
          color: "#fff",
          confirmButtonColor: "#facc15",
        });

        getAllActivities();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong during deletion.", {
          style: {
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "700",
            borderRadius: "12px",
          },
        });
      }
    }
  };

  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    let filteredData = allEvents;

    if (searchValue) {
      filteredData = filteredData.filter((event) =>
        event.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (selectedGenre) {
      filteredData = filteredData.filter(
        (event) => event.genre === selectedGenre
      );
    }

    setFilteredEvents(filteredData);
  }, [searchValue, selectedGenre, allEvents]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-[#24292d] w-full p-5">
      <div>
        <h1 className="font-bold text-white text-3xl py-5">
          Events Management
        </h1>
        <div className="flex mb-6 space-x-6 justify-center md:justify-start">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by event title"
            className="px-5 py-3 rounded-lg bg-[#2f363e] text-white placeholder-gray-400 w-full sm:w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />

          <select
            value={selectedGenre}
            onChange={(e) => handleGenreFilter(e.target.value)}
            className="px-5 py-3 rounded-lg bg-[#2f363e] text-white w-full sm:w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="">All Genres</option>
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre.slice(0, 1).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-[#2f363e] p-4 rounded-xl shadow-lg min-h-[650px]">
          <table className="min-w-full table-auto text-left text-white">
            <thead>
              <tr className="bg-[#444e56] text-sm uppercase tracking-wider">
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Genre</th>
                <th className="px-6 py-3">Language</th>
                <th className="px-6 py-3">Age Limit</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-white">
                    Loading...
                  </td>
                </tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((q) => (
                  <tr
                    key={q._id}
                    className="border-b border-gray-600 font-semibold"
                  >
                    <td className="px-6 py-4 text-sm">
                      <img
                        className="w-12 h-12 object-cover rounded"
                        src={q.image}
                        alt={q.title}
                      />
                    </td>
                    <td
                      className="px-6 py-4 text-sm"
                      title={q.title.length > 30 ? q.title : undefined}
                    >
                      {q.title.length > 30
                        ? q.title.slice(0, 30) + "..."
                        : q.title}
                    </td>
                    <td className="px-6 py-4 text-sm" title={q.description}>
                      {q.description.length > 30
                        ? q.description.slice(0, 30) + "..."
                        : q.description}
                    </td>
                    <td className="px-6 py-4 text-sm">{q.genre}</td>
                    <td className="px-6 py-4 text-sm">
                      {q.language.slice(0, 1).toUpperCase() +
                        q.language.slice(1)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {q.ageLimit ? q.ageLimit : 0}+
                    </td>
                    <td className="px-6 py-6 text-xl flex">
                      <button
                        onClick={() => {
                          setSelectedEvent(q);
                          setEventInfoModal(true);
                        }}
                        className="cursor-pointer"
                      >
                        <MdOutlineRemoveRedEye size={20} />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === q._id ? null : q._id)
                          }
                          className="ml-3 cursor-pointer"
                        >
                          <BsThreeDots />
                        </button>
                        {openMenuId === q._id && (
                          <div className="bg-white rounded-xl absolute w-24 pl-2 top-7 shadow-xl right-0 z-50">
                            <button
                              onClick={() => {
                                setUpdateEvent(q);
                                setUpdateModal(true);
                                setOpenMenuId(null);
                              }}
                              className="w-full text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-t-lg transition-colors text-left cursor-pointer"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(q._id)}
                              className="w-full text-sm text-red-600 hover:bg-gray-100 px-4 py-2 rounded-b-lg transition-colors text-left cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-white">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {!loading && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    goToPage(index + 1);
                    setFilteredEvents(allEvents);
                  }}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    currentPage === index + 1 ? "bg-blue-500" : "bg-gray-700"
                  } text-white text-sm`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {eventInfoModal && selectedEvent && (
        <AdminEventModal
          event={selectedEvent}
          onClose={() => setEventInfoModal(false)}
        />
      )}
      {updateModal && updateEvent && (
        <AdminEventUpdateModal
          event={updateEvent}
          onClose={() => setUpdateModal(false)}
          onUpdate={() => getAllActivities()}
        />
      )}
    </div>
  );
};

export default AdminEventPage;
