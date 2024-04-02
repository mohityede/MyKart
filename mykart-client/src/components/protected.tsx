import { Navigate, Outlet } from "react-router-dom";
import { ProtectedProps } from "../types/props";

function Protected({
  isAuthenticated,
  isAdmin,
  isAdminRoute,
  children,
  redirect = "/",
}: ProtectedProps) {
  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (isAdminRoute && !isAdmin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
}

export default Protected;
