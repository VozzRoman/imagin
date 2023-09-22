import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../../redux/auth/selectors";
import { ThreeDots } from "react-loader-spinner";

export const PrivateRoute = () => {
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  console.log(user);
  console.log(token);

  return token || user === "" ? (
    <div>
      {!token ? (
        <ThreeDots
          height="40"
          width="40"
          radius="9"
          color="#ffffff"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ marginTop: "15px", justifyContent: "center" }}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <Outlet />
      )}
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};
