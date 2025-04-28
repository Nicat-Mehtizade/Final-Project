import axios from "axios";
import { CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../constant";
import { motion } from "framer-motion";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import confetti from "canvas-confetti";
const SuccessPage = () => {
  useEffect(() => {
    const clearBasket = async () => {
      const token = getTokenFromCookie();
      if (!token) {
        console.log("Token not found");
        return;
      }
      try {
        await axios.patch(
          `${BASE_URL}/basket/clear`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Basket clear error:", error);
      }
    };

    clearBasket();

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
  }, []);


  
  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>

          <div className="bg-white p-8 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-green-100 rounded-full scale-[1.2] blur-md"></div>
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="relative"
              >
                <div className="bg-green-100 p-5 rounded-full">
                  <CircleCheck className="w-16 h-16 text-green-600" />
                </div>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center"
            >
              Payment Successful!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-center text-gray-600 mb-8 max-w-xs">
                We are pleased to inform you that your payment was successful.
                Your order is now being processed.
              </p>

              <div className="flex flex-col gap-3 w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink
                    to={"/"}
                    className="inline-block w-full text-center py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Return to Homepage
                  </NavLink>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
