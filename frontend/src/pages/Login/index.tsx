import { useFormik } from "formik";
import { LuTicket } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constant";
import styles from "./index.module.css";
import toast, { Toaster } from "react-hot-toast";
import { loginValidation } from "../../validation/emailValidation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const nav = useNavigate();
  const { setToken } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post(`${BASE_URL}/login`, values,{
          withCredentials: true
        });
        console.log(response);

        if (response.data.status == "success") {
          toast.success("Login Successfully!", {
            duration: 2000,
          });
          setTimeout(() => {
            setToken(response.data.token)
            nav("/");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        toast.error("Login failed. Please try again.", {
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
            <h1 className="text-3xl font-bold text-center">Welcome back</h1>
            <p className="text-center text-gray-500 mb-2">
              Sign in to your iTicket account
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
                <label htmlFor="email" className="font-semibold mt-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Enter your email..."
                  className="border p-1 rounded-lg border-gray-400 focus:outline-yellow-300"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
                <label htmlFor="password" className="font-semibold mt-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onBlur={formik.handleBlur}
                  placeholder="Enter your password..."
                  autoComplete="on"
                  className="border p-1 rounded-lg border-gray-400 focus:outline-yellow-300"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
                <div className="flex justify-between py-2 mt-2">
                  <div className="flex gap-2 items-center">
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      id="remember"
                      name="remember"
                    />
                    <label htmlFor="remember" className="font-semibold">
                      Remember me
                    </label>
                  </div>
                  <p className="cursor-pointer hover:underline">
                    Forgot password?
                  </p>
                </div>
                <button
                  type="submit"
                  className={styles.button}
                >
                  Login
                </button>
                <div className="flex justify-between items-center my-2">
                  <p className="bg-yellow-300 h-[1px] w-33"></p>
                  <p className="font-semibold">Or continue with</p>
                  <p className="bg-yellow-300 h-[1px] w-33"></p>
                </div>
                <div className="flex justify-center gap-4 py-2">
                  <div className="flex gap-2 items-center border px-6 py-2 border-gray-500 rounded-sm cursor-pointer">
                    <img
                      className="w-6"
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt=""
                    />
                    <span className="font-semibold">Google</span>
                  </div>
                  <div className="flex gap-2 items-center border px-6 py-2 border-gray-500 rounded-sm cursor-pointer">
                    <FaFacebook />
                    <span>Facebook</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
