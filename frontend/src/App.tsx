import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HomeLayout from "./layout/HomeLayout";
import Details from "./pages/Details";
import AllEvents from "./pages/AllEvents";
import ClientLayout from "./layout/Client";
import ConcertPage from "./pages/ConcertPage";
import TheatrePage from "./pages/TheatrePage";
import KidsPage from "./pages/KidsPage";
import DreamFestPage from "./pages/DreamFestPage";
import TourismPage from "./pages/TourismPage";
import MuseumPage from "./pages/MuseumPage";
import ProfilePage from "./pages/ProfilePage";
import UserLayout from "./layout/UserLayout";
import OrdersHistory from "./pages/OrdersHistoryPage";
import WalletPage from "./pages/WalletPage";
import GiftCardPage from "./pages/GiftCardPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";

function App() {
  return (
    <>
      <Routes>

        <Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="events/:id" element={<Details />} />
        </Route>

        <Route path="/profile" element={<UserLayout/>}>
          <Route index element={<ProfilePage/>}/>
          <Route path="orders" element={<OrdersHistory/>}/>
          <Route path="wallet" element={<WalletPage/>}/>
          <Route path="gift-card" element={<GiftCardPage/>}/>
          <Route path="update-password" element={<UpdatePasswordPage/>}/>
        </Route>

        <Route path="/events" element={<ClientLayout />}>
          <Route index element={<AllEvents />} />
          <Route path="concert" element={<ConcertPage/>}/>
          <Route path="theatre" element={<TheatrePage/>}/>
          <Route path="kids" element={<KidsPage/>}/>
          <Route path="dream-fest" element={<DreamFestPage/>}/>
          <Route path="tourism" element={<TourismPage/>}/>
          <Route path="museum" element={<MuseumPage/>}/>
        </Route>

      </Routes>
    </>
  );
}

export default App;
