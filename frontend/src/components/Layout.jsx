import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector hook
import { selectUserInfo } from "../features/auth/authSlice";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  // const token = useSelector(selectCurrentToken); // Get the token from Redux state
  const userInfo = useSelector(selectUserInfo);

  return userInfo ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Layout;
