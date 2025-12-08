import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const {User} = useSelector((state) => state.user);
  return User ? <Outlet /> : <Navigate to="/user/login" replace />;
};
export default ProtectedRoutes;