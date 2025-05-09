import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ChatWidget from "../../components/ChatWidget"

const ClientLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <ChatWidget/>
      <Footer/>
    </div>
  )
}

export default ClientLayout