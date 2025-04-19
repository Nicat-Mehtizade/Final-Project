import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { jwtDecode } from "jwt-decode";
import JwtType from "../../types/jwtType";
import { useFormik } from "formik";
import { setPasswordValidation } from "../../validation/setPasswordValidation";
import axios from "axios";
import { BASE_URL } from "../../constant";

const SetPasswordPage = () => {
  const navigate = useNavigate();
  const token = getTokenFromCookie();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<JwtType>(token);
      if (decoded.hasPassword) {
        navigate("/"); 
      }
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: setPasswordValidation,
    onSubmit: async (values) => {
      try {
        const decoded = jwtDecode<JwtType>(token!);

        await axios.patch(
          `${BASE_URL}/users/${decoded.id}/set-password`,
          { password: values.password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Password set successfully!");
        navigate("/"); 
      } catch (error) {
        toast.error("Error setting password");
        console.error(error);
      }
    },
  });


  return (
    <div className="py-15 mb-20 w-full">
      <div className="max-w-[1300px] mx-auto">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-3xl font-semibold mb-3">Set Password</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-15 py-4 mb-4 px-5 items-center">
            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-500 font-semibold">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-lg px-5 py-2 focus:outline-0 focus:bg-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-500 font-semibold">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-lg px-5 py-2 focus:outline-0 focus:bg-gray-100"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-yellow-300 ml-5 px-5 font-bold py-3 rounded-lg w-[25%] text-xl cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPasswordPage;
