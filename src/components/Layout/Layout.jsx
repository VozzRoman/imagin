import scss from "../Layout/Layout.module.scss";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import { FaUserAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { LiaSignInAltSolid, LiaSignOutAltSolid } from "react-icons/lia";

// import { useEffect } from "react";
import Headroom from "react-headroom";
import { Burger } from "../Burger/Burger";
import FooterNav from "../FooterNav/FooterNav";

const activeStyles = {
  color: "rgb(110, 116, 161)",
  fontWeight: "600",
  //  borderBottom: "2px solid rgb(255, 159, 159)",
};
const firstBackGround = {
  background: "rgb(132, 147, 190)",
};
const secondBackGround = {
  background: "rgb(227, 227, 227)",
};

const Layout = () => {
  const loggedUser = useSelector(getToken);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogut = () => {
    dispatch(logout()).then(navigate("/signin"));
  };

  return (
    <div className={scss.wrapper}>
      <Headroom>
        <header className={scss.header}>
          <Container>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                height: "68px",
              }}
            >
              <Logo />
              {loggedUser && <Burger />}
              <div className={scss.headerBoady}>
                {loggedUser && <Navigation />}
                <div className={scss.profileControls}>
                  {loggedUser ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <NavLink
                        className={scss.iconProfile}
                        style={({ isActive }) =>
                          isActive ? activeStyles : undefined
                        }
                        to="profile"
                      >
                        <FaUserAlt className={scss.profileBth} />
                      </NavLink>
                      <button onClick={handleLogut} className={scss.navButton}>
                        <MdLogout />
                        <span> Вихід</span>
                      </button>
                      <LiaSignOutAltSolid className={scss.logOut} />
                    </div>
                  ) : (
                    <Link
                      className={scss.navButton}
                      style={{
                        display: pathname === "/signin" ? "none" : "block",
                      }}
                      to="signin"
                    >
                      <p>Вже маю акаунт</p>
                      <LiaSignInAltSolid className={scss.sigInIcon} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </header>
      </Headroom>

      <main
        className={scss.main}
        style={
          pathname === "/signup" || pathname === "/signin" || !loggedUser
            ? firstBackGround
            : secondBackGround
        }
      >
        <Outlet />
      </main>
      <footer className={scss.footer}>
        <Container>
          {" "}
          <div className={scss.container}>
            <div className={scss.footerTitle}>
              <span>Imaginarium</span> 2023
            </div>
            <FooterNav />
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
