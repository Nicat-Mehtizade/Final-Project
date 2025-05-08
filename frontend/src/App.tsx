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
import GiftCardPage from "./pages/GiftCardPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import FavoritesAndBasketLayout from "./layout/FavoritesAndBasketLayout";
import Favorites from "./pages/Favorites";
import SetPasswordPage from "./pages/setPasswordPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLayout from "./layout/Admin";
import Dashboard from "./pages/Dashboard";
import AdminEventPage from "./pages/AdminEventPage";
import Basket from "./pages/Basket";
import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminPaymentsPage from "./pages/AdminPaymentsPage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import AdminPromoCodePage from "./pages/AdminPromoCodePage";
import ResetPassword from "./pages/ResetPasswordPage";

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

        <Route element={<FavoritesAndBasketLayout />}>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/set-password" element={<SetPasswordPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/gift-card" element={<GiftCardPage />} />
          <Route
            path="/profile/update-password"
            element={<UpdatePasswordPage />}
          />
        </Route>

        <Route path="/events" element={<ClientLayout />}>
          <Route index element={<AllEvents />} />
          <Route path="concert" element={<ConcertPage />} />
          <Route path="theatre" element={<TheatrePage />} />
          <Route path="kids" element={<KidsPage />} />
          <Route path="dream-fest" element={<DreamFestPage />} />
          <Route path="tourism" element={<TourismPage />} />
          <Route path="museum" element={<MuseumPage />} />
        </Route>

        <Route element={<PrivateRoute roles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="event" element={<AdminEventPage />} />
            <Route path="new" element={<AdminAddPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="payments" element={<AdminPaymentsPage />} />
            <Route path="promo" element={<AdminPromoCodePage/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
