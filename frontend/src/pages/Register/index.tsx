import { useFormik } from "formik";
import { LuTicket } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constant";
import styles from "./index.module.css";
import toast, { Toaster } from "react-hot-toast";
import { registerValidation } from "../../validation/registerValidation";
const Register = () => {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema:registerValidation,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(`${BASE_URL}/register`, values);
        console.log(response);

        if (response.data.status == "success") {
          toast.success("Registered Successfully!", {
            duration: 2000,
          });
          setTimeout(() => {
            nav("/login");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        toast.error("Registration failed. Please try again.", {
          duration: 2000,
        });
      }
    },
  });


  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className={styles.yellowLine}></div>
      <div className="max-w-[1280px] mx-auto relative z-10 flex justify-center items-center min-h-screen">
        <div className="max-w-md bg-white w-full  flex flex-col gap-2 shadow-[0px_12px_24px_rgba(0,0,0,0.35)] rounded-lg">
          <div className={styles.secondYellowLine}></div>
          <div className="px-5 py-10">
            <div className="flex justify-center mx-auto items-center p-2 bg-yellow-200 rounded-full w-13 h-13 ">
              <LuTicket className=" text-yellow-500 text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-center">
              Create an account
            </h1>
            <p className="text-center text-gray-500 mb-2">
              Sign up for your iTicket account
            </p>
            <div className="flex justify-between gap-4 bg-yellow-300 px-2 py-1 rounded-sm mb-2">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  `w-[50%] text-center font-semibold py-0.5 rounded-sm ${
                    isActive ? "bg-white" : ""
                  }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `w-[50%] text-center font-semibold py-0.5 rounded-sm ${
                    isActive ? "bg-white" : ""
                  }`
                }
              >
                Login
              </NavLink>
            </div>
            <div>
              <form
                className="flex flex-col"
                onSubmit={formik.handleSubmit}
              >
                <label htmlFor="username" className="font-semibold mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onBlur={formik.handleBlur}
                  placeholder="Enter your username..."
                  className="border p-1 rounded-lg border-gray-400 focus:outline-yellow-300 "
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500">{formik.errors.username}</div>
                ): null}
                <label htmlFor="email" className="font-semibold mb-1 mt-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email..."
                  onBlur={formik.handleBlur}
                  className="border p-1 rounded-lg border-gray-400 focus:outline-yellow-300"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ): null}
                <label htmlFor="password" className="font-semibold mb-1 mt-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password..."
                  autoComplete="on"
                  onBlur={formik.handleBlur}
                  className="border p-1 rounded-lg border-gray-400 focus:outline-yellow-300"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                  {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ): null}
                <button
                  type="submit"
                  className={styles.button}
                >
                  Register
                </button>
                <div className="flex justify-between items-center my-2">
                  <p className="bg-yellow-300 h-[1px] w-33"></p>
                  <p className="font-semibold">Or continue with</p>
                  <p className="bg-yellow-300 h-[1px] w-33"></p>
                </div>
                <div className="flex justify-center gap-4 py-2">
                  <a href={`${BASE_URL}/auth/google`} className="flex gap-2 items-center border px-6 py-2 border-gray-500 rounded-sm cursor-pointer">
                    <img
                      className="w-6"
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt=""
                    />
                    <span className="font-semibold">Google</span>
                  </a>
                  <a
                    href={`${BASE_URL}/auth/facebook`}
                    className="flex gap-2 items-center border px-6 py-2 border-gray-500 rounded-sm cursor-pointer"
                  >
                    <FaFacebook />
                    <span>Facebook</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
