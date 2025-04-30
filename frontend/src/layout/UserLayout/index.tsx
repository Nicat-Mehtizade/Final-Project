import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[1280px] mx-auto py-10">
        <div className="rounded-xl px-5 flex justify-between shadow-[0px_3px_24px_1px_rgba(0,0,0,0.35)]">
          <Outlet />
          <div className="hidden lg:flex flex-col gap-5 p-5 items-start w-[25%] border-gray-200 border-l-1">
            <NavLink
              className={({ isActive }) =>
                `rounded-3xl w-full py-1 px-4 font-medium ${
                  isActive ? "bg-black text-white" : ""
                }`
              }
              to={"/profile"}
              end
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `rounded-3xl w-full py-1 px-4 font-medium ${
                  isActive ? "bg-black text-white" : ""
                }`
              }
              to={"/profile/gift-card"}
              end
            >
              "iGift" Gift Card
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `rounded-3xl w-full py-1 px-4 font-medium ${
                  isActive ? "bg-black text-white" : ""
                }`
              }
              to={"/profile/update-password"}
              end
            >
              Update Password
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
