import { NavLink } from "react-router-dom";
import scss from "./FooterNav.module.scss";
import { FaHome } from "react-icons/fa";
import { BsFilePost } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
const FooterNav = () => {
  const activeStyles = {
    color: "rgb(185 198 255)",
    fontWeight: "600",
    fontSize: "25px",
  };
  return (
    <ul className={scss.navList}>
      <li className={scss.navItem}>
        <NavLink
          className={scss.navLink}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          to="/"
        >
          <div className={scss.testOval}>
            <FaHome className={scss.navBthIcon} />
          </div>{" "}
        </NavLink>
      </li>
      <li className={scss.navItem}>
        <NavLink
          className={scss.navLink}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          to="posts"
        >
          <div className={scss.testOval}>
            <BsFilePost className={scss.navBthIcon} />
          </div>
        </NavLink>
      </li>
      <li className={scss.navItem}>
        <NavLink
          className={scss.navLink}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          to="new"
        >
          <div className={scss.testOval}>
            <AiOutlineFileAdd className={scss.navBthIcon} />{" "}
          </div>
        </NavLink>
      </li>
    </ul>
  );
};

export default FooterNav;
