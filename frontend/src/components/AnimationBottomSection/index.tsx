import { motion } from "framer-motion";
const googlePlayBtn=()=>{
    window.open("https://play.google.com/store/apps/details?id=az.iticket.iticket")

}
const appStoreBtn=()=>{
    window.open("https://apps.apple.com/az/app/iticket-az/id1456260325")
}
const AnimationBottomSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto relative mb-25">
    <div className="flex items-center bg-yellow-300 py-5 px-6 md:px-20 rounded-2xl relative ">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="w-[140%] h-[103px] top-[30%] left-[10%] absolute bg-black rotate-[-21deg] hidden lg:block">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="absolute top-[41%] left-0 -translate-y-1/2 text-[50px] sm:text-[70px] md:text-[90px] lg:text-[150px] font-bold text-white whitespace-nowrap pointer-events-none select-none"
          >
            DOWNLOAD NOW
          </motion.div>
        </div>
      </div>
      <div className="py-10 flex flex-col gap-5 z-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-[600px]">
          FIND YOUR NEXT VISUAL JOURNEY
        </h1>
        <p className="max-w-[600px] text-sm sm:text-base">
          The iTicket.AZ application makes it easy and fast to purchase
          tickets for all kinds of events (to the theater, to sport,
          concerts, exhibitions, etc.).
        </p>

        <div className="flex items-center bg-black rounded-2xl py-3 px-6 gap-4 w-fit z-1">
          <button onClick={googlePlayBtn} className="border-r border-gray-600 pr-4 cursor-pointer">
            <img
              src="https://iticket.az/images/android@2x.png"
              alt="android"
              className="w-28 sm:w-32"
            />
          </button>
          <button onClick={appStoreBtn} className="pl-4 cursor-pointer">
            <img
              src="https://iticket.az/images/ios@2x.png"
              alt="ios"
              className="w-28 sm:w-32"
            />
          </button>
        </div>
      </div>
      <img
        className="absolute bottom-0 right-20 h-105 hidden lg:block z-10"
        src="https://cdn.iticket.az/images/app@2x.png"
        alt=""
      />
    </div>
  </div>
  )
}

export default AnimationBottomSection