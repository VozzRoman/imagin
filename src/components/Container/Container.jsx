import { useLocation } from "react-router-dom";
import scss from "../Container/Container.module.scss";
const Container = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div
      className={scss.container}
      style={{
        padding:
          pathname === "/signup" || pathname === "/signin"
            ? "0 15px"
            : "0px 0px",
      }}
    >
      {children}
    </div>
  );
};

export default Container;
