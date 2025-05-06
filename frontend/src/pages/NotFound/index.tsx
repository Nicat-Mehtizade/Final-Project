import { BsTicket } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const NotFound = () => {
  return (
    <div className="h-[70vh] flex justify-center items-center">
      <div className="max-w-[600px] mx-auto ">
        <div className="flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-red-50 p-6 rounded-full mb-2"
          >
            <div className="bg-red-100 rounded-full p-3">
            <BsTicket className="text-8xl relative text-red-500" />
            <p className="absolute top-16 left-14 text-red-500 font-semibold text-3xl">
              404
            </p>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-black text-3xl mb-2"
          >
            Page Not Found!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-500 font-semibold text-lg text-center mb-5"
          >
            The page you are looking for does not exist. It may have been
            deleted, moved, or never existed in the first place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <NavLink
              to={"/"}
              className="bg-[#F43F5E] transition duration-300 hover:bg-red-600  py-3 px-10 rounded-xl text-white text-lg font-semibold cursor-pointer"
            >
              Return to Home
            </NavLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
