import axios from "axios";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { useEffect, useState } from "react";
import { PromoCode } from "../../types/promoCodeType";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const AdminPromoCodePage = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [modalData, setModalData] = useState<PromoCode | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    usageLimit: "",
    expiresAt: "",
  });
  const token = getTokenFromCookie();

  const getPromoCodes = async () => {
    if (!token) {
      console.log("Token not found");
      return;
    }
    try {
      const response = await axios(`${BASE_URL}/promo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPromoCodes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPromoCodes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!token) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/promo/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPromoCodes(promoCodes.filter((promoCode) => promoCode._id !== id));
        toast.success("Promo code deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete promo code.");
      }
    }
  };

  const handleUpdateModal = (promoCode: PromoCode) => {
    setFormData({
      code: promoCode.code,
      discount: promoCode.discount,
      usageLimit: promoCode.usageLimit,
      expiresAt: promoCode.expiresAt
        ? new Date(promoCode.expiresAt).toISOString().split("T")[0]
        : "",
    });
    setModalData(promoCode);
    setShowUpdateModal(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePromoCode = async () => {
    if (!token || !modalData) return;

    const updatedPromoCode = {
      ...formData,
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
    };

    try {
      const response = await axios.patch(
        `${BASE_URL}/promo/${modalData._id}`,
        updatedPromoCode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPromoCodes(
        promoCodes.map((promoCode) =>
          promoCode._id === modalData._id ? response.data.data : promoCode
        )
      );
      toast.success("Promo code updated successfully!");
      setShowUpdateModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update promo code.");
    }
  };

  const handleCreatePromoCode = async () => {
    if (!token) return;

    const newPromoCode = {
      ...formData,
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/promo`,
        newPromoCode,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPromoCodes([...promoCodes, response.data.data]);
      toast.success("Promo code created successfully!");
      setShowCreateModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create promo code.");
    }
  };

  return (
    <div className="bg-[#24292d] w-full p-5 h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-white text-3xl py-5 mb-4 flex justify-between items-center">
            Promo Codes Management
          </h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 text-white px-4 font-semibold py-2 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            Create Promo Code
          </button>
        </div>
        <div className="bg-[#2f363e] p-4 rounded-xl shadow-lg ">
          <table className="min-w-full table-auto text-left text-white">
            <thead>
              <tr className="bg-[#444e56] text-sm uppercase tracking-wider">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Discount</th>
                <th className="px-6 py-3">Usage Limit</th>
                <th className="px-6 py-3">Used Count</th>
                <th className="px-6 py-3">Expires On</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-white">
                    No promo codes found.
                  </td>
                </tr>
              ) : (
                promoCodes.map((promoCode) => (
                  <tr
                    key={promoCode._id}
                    className="border-b border-gray-600 font-semibold"
                  >
                    <td title={promoCode._id}>
                      {promoCode._id.slice(0, 8) + "..."}
                    </td>
                    <td className="px-6 py-4 text-sm">{promoCode.code}</td>
                    <td className="px-6 py-4 text-sm">{promoCode.discount}%</td>
                    <td className="px-6 py-4 text-sm">
                      {promoCode.usageLimit}
                    </td>
                    <td className="px-6 py-4 text-sm">{promoCode.usedCount}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(promoCode.expiresAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        className="text-blue-500 cursor-pointer hover:text-blue-300"
                        onClick={() => handleUpdateModal(promoCode)}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-500 ml-4 cursor-pointer hover:text-red-300"
                        onClick={() => handleDelete(promoCode._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create Promo Code</h2>
            <div>
              <label className="block mb-2">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <label className="block mb-2">Discount (%)</label>
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <label className="block mb-2">Usage Limit</label>
              <input
                type="text"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <label className="block mb-2">Expires On</label>
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 cursor-pointer hover:bg-red-700"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                onClick={handleCreatePromoCode}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && modalData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Update Promo Code</h2>
            <div>
              <label className="block mb-2">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <label className="block mb-2">Discount (%)</label>
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <label className="block mb-2">Usage Limit</label>
              <input
                type="text"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <label className="block mb-2">Expires On</label>
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleFormChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 cursor-pointer hover:bg-red-700"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                onClick={handleUpdatePromoCode}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromoCodePage;
