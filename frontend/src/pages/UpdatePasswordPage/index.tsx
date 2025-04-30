import { useState } from "react";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { jwtDecode } from "jwt-decode";
import JwtType from "../../types/jwtType";
import { BASE_URL } from "../../constant";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";  

const UpdatePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePassword = async () => {
    const token = getTokenFromCookie();
    if (!token) {
      toast.error("Token not found. Please log in again.");
      return;
    }
    if (
      !currentPassword ||
      !newPassword.newPassword ||
      !newPassword.confirmNewPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword.newPassword)) {
      toast.error("Password must contain both letters and numbers.");
      return;
    }
    if (newPassword.newPassword !== newPassword.confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword.newPassword) {
      toast.error("New password cannot be the same as the current password.");
      return;
    }

    const decoded = jwtDecode<JwtType>(token);
    try {
      await axios.patch(
        `${BASE_URL}/users/update-password/${decoded.id}`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCurrentPassword("");  
      setNewPassword({ newPassword: "", confirmNewPassword: "" });
      toast.success("Password updated successfully!");
    } catch (error:unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);  
      } else {
        toast.error("An error occurred while updating password.");
      }
    }
  };

  return (
    <div className="py-8 w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-semibold mb-3">Update Password</h1>
      <div className="flex flex-col lg:flex-row gap-15 py-4 mb-4 px-5 lg:items-center">
        <div className="flex flex-col ">
          <label htmlFor="" className="text-gray-500 font-semibold">
            Current Password
          </label>
          <input
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            name=""
            id=""
            value={currentPassword}
            className="border border-gray-300  rounded-lg px-5 py-2 focus:outline-0 focus:bg-gray-100"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="text-gray-500 font-semibold">
            New Password
          </label>
          <input
            onChange={(e) =>
              setNewPassword({ ...newPassword, newPassword: e.target.value })
            }
            type="password"
            name=""
            id=""
            value={newPassword.newPassword}
            className="border border-gray-300 rounded-lg px-5 py-2 focus:outline-0 focus:bg-gray-100"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="text-gray-500 font-semibold">
            Confirm New Password
          </label>
          <input
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                confirmNewPassword: e.target.value,
              })
            }
            type="password"
            name=""
            value={newPassword.confirmNewPassword}
            id=""
            className="border border-gray-300 rounded-lg px-5 py-2 focus:outline-0 focus:bg-gray-100"
          />
        </div>
      </div>
      <button
        onClick={handleChangePassword}
        className="bg-yellow-300 ml-5 px-5 font-bold py-3 rounded-lg lg:w-[25%] text-xl cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UpdatePasswordPage;
