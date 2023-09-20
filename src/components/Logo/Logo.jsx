import { Link } from "react-router-dom";
import scss from "../Logo/Logo.module.scss";
const Logo = () => {
  return (
    <Link style={{ textDecoration: "none" }} to="/">
      <h1 className={scss.logoImg}>
        Im<span>aginarium</span>
      </h1>
    </Link>
  );
};

export default Logo;
