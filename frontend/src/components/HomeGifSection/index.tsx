import { NavLink } from "react-router-dom"

const HomeGifSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto py-15 flex justify-center items-center">
        <NavLink to={"/profile/gift-card"} className="cursor-pointer">
            <img src="https://cdn.iticket.az/images/banners/icard-banner-desktop-03-2023.gif" alt="iTicket Gif" />
        </NavLink>
    </div>
  )
}

export default HomeGifSection