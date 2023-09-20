import { Navigate } from "react-router-dom";

export const PublickRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return !token ? <div>{children}</div> : <Navigate to="/" />;
};
