import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";

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
          <div className="mb-5 md:mb-0 flex justify-between md:block md:border-">
            <img className="w-40 mb-20" src="./123-removebg-preview.png" alt="" />
            <div>
              <p className="text-gray-600 text-lg ">Support service</p>
              <p className="text-2xl font-bold">+994 12 424 24 24</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 mb-5 md:mb-0">
            <h1 className="font-bold text-2xl mb-2">Information</h1>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">FAQ</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Support</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Terms & Conditions</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">E-ticket</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Ticket refund or change</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Privacy Policy</button>
          </div>
          <div className="flex flex-col  gap-3 items-start mb-5 md:mb-0">
            <h1 className="font-bold text-2xl mb-2">iTicket</h1>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">About us</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Venues</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Point of Sales</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Karabakh Revival Foundation</button>
            <button className="text-gray-500 font-medium text-lg cursor-pointer hover:underline">Contacts</button>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl mb-2">Security</h1>
            <p className="text-gray-500 text-lg font-medium mb-5">All payments are protected by 3D Secure from Visa, Visa Electron, Maestro & MasterCard</p>
            <img className="w-50" src="https://iticket.az/images/cards.svg" alt="" />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <p className="text-gray-500 text-lg font-medium">ITICKET® is a registered trademark of «ITICKET» LLC.</p>
          <div className="flex bg-yellow-300 gap-10 p-5 text-3xl">
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