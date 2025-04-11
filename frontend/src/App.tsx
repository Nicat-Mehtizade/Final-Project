import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HomeLayout from "./layout/HomeLayout";
import Details from "./pages/Details";
import AllEvents from "./pages/AllEvents";
import ClientLayout from "./layout/Client";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
