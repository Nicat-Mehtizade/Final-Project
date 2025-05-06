import { jwtDecode } from "jwt-decode";
import getTokenFromCookie from "../../context/services/getTokenFromCookie"
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import JwtType from "../../types/jwtType";

const PrivateRoute = ({ roles }: { roles: string[] }) => {
  const token=getTokenFromCookie()
  if (token === null) {
    return <p>Loading...</p>
  }

  if (!token) {
    toast.error("You don't have access.", { duration: 2000 });
    return <Navigate to="/login" />;
  }
  let decoded;
  try {
    decoded = jwtDecode<JwtType>(token);
    if (!decoded || !decoded.role) {
      throw new Error("Invalid token structure");
    }
  } catch (error) {
    console.log(error);
    toast.error("Invalid or expired token.");
    return <Navigate to="/login" />;
  }

  if (!roles.includes(decoded.role)) {
    toast.error("Access denied.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRoute