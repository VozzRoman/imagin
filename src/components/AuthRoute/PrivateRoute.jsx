import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};
