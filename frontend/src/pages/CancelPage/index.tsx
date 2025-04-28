import { useEffect } from "react"
import { motion } from "framer-motion";
import { XCircle } from "lucide-react"
import { NavLink } from "react-router-dom";
import confetti from "canvas-confetti";

const CancelPage = () => {
    useEffect(() => {
        console.log("Payment was cancelled or failed")
        confetti({
            particleCount: 30,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#f87171", "#ef4444", "#dc2626"],
            gravity: 1.5,
          })
      }, [])
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-5 mb-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-xl"
      >
        <div className="relative">
       
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-400 via-red-500 to-red-400"></div>

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
              <div className="absolute inset-0 bg-red-100 rounded-full scale-[1.2] blur-md"></div>
              <motion.div
                animate={{
                  rotate: [0, -5, 5, -5, 5, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="bg-red-100 p-5 rounded-full">
                  <XCircle className="w-16 h-16 text-red-600" />
                </div>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center"
            >
              Payment Failed or Cancelled
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <p className="text-center text-gray-600 mb-8 max-w-xs">
                Unfortunately, your payment was not completed. Please try again or contact support if the issue
                persists.
              </p>

              <div className="flex flex-col gap-3 w-full">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <NavLink
                   
                    to={"/basket"}
                    className="inline-block w-full text-center py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Try Again
                  </NavLink>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NavLink
                    to="/"
                    className="inline-block w-full text-center py-3 px-6 rounded-xl border border-red-200 text-red-700 font-medium hover:bg-red-50 transition-all duration-200"
                  >
                    Return to Homepage
                  </NavLink>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CancelPage