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

        <Route path="/events" element={<ClientLayout />}>
          <Route index element={<AllEvents />} />
          <Route path="concert" element={<ConcertPage/>}/>
          <Route path="theatre" element={<TheatrePage/>}/>
          <Route path="kids" element={<KidsPage/>}/>
          <Route path="dream-fest" element={<DreamFestPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
