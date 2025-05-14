import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const facebookBtn=()=>{
    window.open("https://www.facebook.com/iTicket.az/")
  }
  const instagramBtn=()=>{
    window.open("https://www.instagram.com/iticket.az/")
  }
  const tiktokBtn=()=>{
    window.open("https://www.tiktok.com/@iticketaz")
  }
  const twitterXBtn=()=>{
    window.open("https://x.com/iticketaz")
  }
  const linkedInBtn=()=>{
    window.open("https://www.linkedin.com/company/iticket.az/")
  }
  return (
    <div>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between mb-5">
          <div className="mb-5 md:mb-0">
            <img className="w-40 mb-10 md:mb-20" src="./123-removebg-preview.png" alt="" />
            <div>
              <p className="text-gray-600 text-lg ">Support service</p>
              <p className="text-2xl font-bold">+994 12 424 24 24</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 mb-5 md:mb-0">
            <h1 className="font-bold text-2xl mb-2">Events</h1>
            <NavLink to={"/events/concert"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Concert</NavLink>
            <NavLink to={"/events/theatre"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Theatre</NavLink>
            <NavLink to={"/events/kids"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Kids</NavLink>
            <NavLink to={"/events/dream-fest"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Dream Fest 2025</NavLink>
            <NavLink to={"/events/tourism"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Tourism</NavLink>
            <NavLink to={"/events/museum"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Museum</NavLink>
          </div>
          <div className="flex flex-col  gap-3 items-start mb-5 md:mb-0">
            <h1 className="font-bold text-2xl mb-2">iTicket</h1>
            <NavLink to={"/about"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">About us</NavLink>
            <NavLink to={"/contact"} className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Contact</NavLink>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl mb-2">Security</h1>
            <p className="text-gray-500 text-lg font-medium mb-5">All payments are protected by 3D Secure from Visa, Visa Electron, Maestro & MasterCard</p>
            <img className="w-50" src="https://iticket.az/images/cards.svg" alt="" />
          </div>
        </div>
        <div className="md:flex items-center justify-between ">
          <p className="text-gray-500 text-sm md:text-lg font-medium">ITICKET® is a registered trademark of «ITICKET» LLC.</p>
          <div className="flex justify-center bg-yellow-300 gap-10 p-5 text-3xl">
            <button className="cursor-pointer" onClick={facebookBtn}><FaFacebookF /></button>
            <button className="cursor-pointer" onClick={instagramBtn}><RiInstagramFill /></button>
            <button className="cursor-pointer" onClick={tiktokBtn}><FaTiktok /></button>
            <button className="cursor-pointer" onClick={twitterXBtn}><BsTwitterX /></button>
            <button className="cursor-pointer" onClick={linkedInBtn}><FaLinkedinIn /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer