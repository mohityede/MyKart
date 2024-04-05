import { Navigate, Outlet } from "react-router-dom";
import { ProtectedProps } from "../types/props";
import toast from "react-hot-toast";

function Protected({
  isAuthenticated,
  isAdmin,
  isAdminRoute,
  children,
  redirect = "/",
}: ProtectedProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }
  if (isAuthenticated && isAdminRoute && !isAdmin) {
    toast.error("You don't have admin access");
    return <Navigate to={redirect} />;
  }
  return children ? children : <Outlet />;
}

export default Protected;
