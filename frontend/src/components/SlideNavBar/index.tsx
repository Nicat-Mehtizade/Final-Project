import { PiHeartStraightBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

const SlideNavBar = () => {
  return (
    <div className="absolute  justify-between items-center left-10 top-15 z-50 lg:w-[95%] hidden lg:flex">
      <img
        className="w-40 cursor-pointer"
        src="./123-removebg-preview.png"
        alt="iTicket Logo"
      />
      <div className="flex gap-4 text-white font-bold text-xl">
        <button className="nav-button">All events</button>
        <button className="nav-button">Concert</button>
        <button className="nav-button ">Theatre</button>
        <button className="nav-button">Kids</button>
        <button className="nav-button">Dream Fest 2025</button>
        <button className="nav-button">Sport</button>
        <button className="cursor-pointer">...</button>
      </div>
      <div className="flex items-center font-semibold text-2xl gap-5 text-white">
        <PiHeartStraightBold className="cursor-pointer" />
        <IoSearch className="cursor-pointer" />
        <FaShoppingCart className="cursor-pointer" />
        <FaUserLarge className="bg-yellow-300 w-12 h-12 p-3 rounded-full text-black cursor-pointer" />
      </div>
    </div>
  );
};

export default SlideNavBar;
