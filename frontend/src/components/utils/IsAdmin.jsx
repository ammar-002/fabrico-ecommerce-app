import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const IsAdmin = ()=> {
  const { User } = useSelector((state) => state.user);

  // If not logged in → redirect to login
  if (!User) return <Navigate to="/user/login" replace />;

  // If logged in but not admin → redirect to home
  if (User.role !== "admin") return <Navigate to="/" replace />;

  // If admin → allow nested routes
  return <Outlet />;
}
export default IsAdmin;