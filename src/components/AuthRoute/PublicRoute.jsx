import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getToken } from "../../redux/auth/selectors";
import { ThreeDots } from "react-loader-spinner";

export const PublickRoute = ({ children }) => {
  const token = useSelector(getToken);

  return token === "" ? (
    <div>
      <>
        {!children ? (
          <ThreeDots
            height="70"
            width="70"
            radius="9"
            color="#ffffff"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              marginTop: "75px",
              justifyContent: "center",
            }}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <div>{children}</div>
        )}
      </>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
