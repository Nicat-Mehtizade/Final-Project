import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ChatWidget from "../../components/ChatWidget"

const FavoritesAndBasketLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <ChatWidget/>
        <Footer/>
    </div>
  )
}

export default FavoritesAndBasketLayout