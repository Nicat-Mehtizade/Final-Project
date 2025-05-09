import { Outlet } from "react-router-dom"
import Footer from "../../components/Footer"
import ChatWidget from "../../components/ChatWidget"

const HomeLayout = () => {
  return (
    <div>
        <Outlet/>
        <ChatWidget/>
        <Footer/>
    </div>
  )
}

export default HomeLayout