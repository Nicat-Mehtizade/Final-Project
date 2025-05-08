import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constant";
import { Activity } from "../../types/activityType";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";

const AdminAddPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    tag: "",
    startTime: "",
    endTime: "",
    image: null as File | null,
    language: "",
    price: "",
    ageLimit: "",
    latitude: "",
    longitude: "",
  });
  const [genres, setGenres] = useState<string[]>([]);
  const token = getTokenFromCookie();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("genre", formData.genre);
    form.append("tag", formData.tag);

    form.append(
      "showtimes[0][startTime]",
      new Date(formData.startTime).toISOString()
    );
    form.append(
      "showtimes[0][endTime]",
      new Date(formData.endTime).toISOString()
    );

    if (formData.image) {
      form.append("image", formData.image); 
    }
    form.append("language", formData.language);

    formData.price
      .split(",")
      .map((p) => Number(p.trim()))
      .filter((price) => !isNaN(price))
      .forEach((price) => form.append("price", price.toString()));

    form.append("ageLimit", formData.ageLimit);
    form.append("location.latitude", formData.latitude);
    form.append("location.longitude", formData.longitude);

    if (!token) {
      console.log("Token not found");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/activity`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/activity`);
        const allGenres = res.data.data.map((a: Activity) => a.genre);
        const uniqueGenres = [...new Set(allGenres)] as string[];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="bg-[#1f2937] w-full min-h-screen p-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-[#2d3748] rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Add New Event
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
        >
          <input
            name="title"
            placeholder="Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="genre"
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Genre</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre.slice(0, 1).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
          <input
            name="tag"
            placeholder="Tag"
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            name="language"
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="Azerbaycanca">Azerbaycanca</option>
            <option value="English">English</option>
            <option value="russia">Русский</option>
            <option value="multilingual">Multilingual</option>
          </select>
          <input
            name="price"
            placeholder="Price (comma separated)"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="ageLimit"
            placeholder="Age Limit"
            onChange={(e) =>
              setFormData({ ...formData, ageLimit: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="startTime"
            type="datetime-local"
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="endTime"
            type="datetime-local"
            onChange={(e) =>
              setFormData({ ...formData, endTime: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="image"
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFormData({ ...formData, image: e.target.files[0] });
              }
            }}
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="latitude"
            placeholder="Latitude"
            onChange={(e) =>
              setFormData({ ...formData, latitude: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="longitude"
            placeholder="Longitude"
            onChange={(e) =>
              setFormData({ ...formData, longitude: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition text-white font-semibold py-3 rounded-xl col-span-1 md:col-span-2 shadow-lg"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddPage;
