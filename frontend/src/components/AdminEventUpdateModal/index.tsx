import { useState } from "react";
import { Activity } from "../../types/activityType";
import axios from "axios";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import toast,{ Toaster } from 'react-hot-toast';
interface Props {
  event: Activity;
  onClose: () => void;
  onUpdate: () => void;
}

const AdminEventUpdateModal: React.FC<Props> = ({ event, onClose,onUpdate }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    genre: event.genre,
    tag: event.tag,
    language: event.language,
    ageLimit: event.ageLimit || 0,
    price: event.price,
    image: event.image,
    location: {
      latitude: event.location.latitude,
      longitude: event.location.longitude,
    },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const token = getTokenFromCookie();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "latitude" || name === "longitude") {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: parseFloat(value),
        },
      }));
    } else if (name === "ageLimit") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePriceChange = (index: number, value: string) => {
    const newPrices = [...formData.price];
    newPrices[index] = Number(value);
    setFormData((prev) => ({ ...prev, price: newPrices }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.log("Token not found");
    }
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("genre", formData.genre);
      formDataToSend.append("tag", formData.tag);
      formDataToSend.append("language", formData.language);
      formDataToSend.append("ageLimit", String(formData.ageLimit));

      formDataToSend.append("price", JSON.stringify(formData.price));

      formDataToSend.append(
        "location[latitude]",
        String(formData.location.latitude)
      );
      formDataToSend.append(
        "location[longitude]",
        String(formData.location.longitude)
      );

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      await axios.patch(`${BASE_URL}/activity/${event._id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdate()
      toast.success("Event updated successfully!");
      setTimeout(() => {
        onClose();
      }, 1000)
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Update Event</h2>
        <label className="block mb-1 font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageFile(e.target.files[0]);
            }
          }}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label className="block mb-1 font-medium">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label className="block mb-1 font-medium">Tag</label>
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Tag"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label className="block mb-1 font-medium">Language</label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label className="block mb-1 font-medium">Age Limit</label>
        <input
          type="number"
          name="ageLimit"
          value={formData.ageLimit}
          onChange={handleChange}
          placeholder="Age Limit"
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <div className="mb-3">
          <label className="block mb-1 font-medium">Prices</label>
          {formData.price.map((price, i) => (
            <input
              key={i}
              type="number"
              value={price}
              onChange={(e) => handlePriceChange(i, e.target.value)}
              placeholder={`Price ${i + 1}`}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventUpdateModal;
