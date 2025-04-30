import axios from "axios";
import { BASE_URL } from "../../constant";
import getTokenFromCookie from "../../context/services/getTokenFromCookie";
import { jwtDecode } from "jwt-decode";
import JwtType from "../../types/jwtType";
import { useEffect, useState } from "react";
import { PromoCode } from "../../types/promoCodeType";
import SyncLoader from "react-spinners/SyncLoader";
import { motion } from "framer-motion";

const GiftCardPage = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[] | null>();
  const [loading, setLoading] = useState(true);

  const token = getTokenFromCookie();
  const getPromoCodes = async () => {
    if (!token) {
      console.log("Token not found");
      return;
    }
    try {
      const decoded = jwtDecode<JwtType>(token);
      const response = await axios(
        `${BASE_URL}/users/${decoded.id}/promocodes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setPromoCodes(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPromoCodes();
  }, []);

  return (
    <div className="w-full">
      <h1 className="py-5 text-3xl font-semibold">Used Promo Codes</h1>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <SyncLoader color="#facc15" />
        </div>
      ) : (
        <div className="py-5 flex gap-5">
          {promoCodes && promoCodes.length > 0 ? (
            promoCodes.map((q) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="mb-5 relative group rounded-2xl"
                  key={q._id}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg ">
                    <div className="absolute"></div>
                    <img
                      className="w-80"
                      src="https://iticket.az/images/gift-card.png"
                      alt="iTicket Gift Card"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="absolute bottom-13 left-4 italic  text-2xl font-bold "
                      >
                        <span className="text-black">{q.code.slice(0, 1)}</span>
                        <span className="text-yellow-400">
                          {q.code.slice(1)}
                        </span>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="absolute italic font-semibold bottom-7 left-4 text-lg"
                      >
                        Expires on{" "}
                        {new Date(q.expiresAt)
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, ".")}
                      </motion.p>
                    </div>
                    <motion.div
                      className="absolute top-4 right-4 bg-red-500 rounded-full w-16 h-16 flex justify-center items-center shadow-lg"
                      initial={{ rotate: -10, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3,
                      }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <div className="text-white font-bold flex flex-col items-center justify-center">
                        <span className="text-2xl ">
                          {q.discount}%
                        </span>
                        <span className="text-xs">
                          OFF
                        </span>
                      </div>
                    </motion.div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out z-30"></div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="flex items-center gap-2 font-semibold">
              <img
                className="w-7"
                src="https://iticket.az/images/warning.svg"
                alt=""
              />
              No promo code has been used yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GiftCardPage;
