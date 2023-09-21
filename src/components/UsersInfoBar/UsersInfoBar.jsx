import { BsFilePost, BsAwardFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import scss from "../UsersInfoBar/UsersInfoBar.module.scss";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";
const UsersInfoBar = ({ userData }) => {
  const [awards, setAwards] = useState(0);
  const [awardsImage, setAwardImage] = useState("");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogut = () => {
    dispatch(logout()).then(navigate("/signin"));
  };
  useEffect(() => {
    const awardsCount = userData?.posts?.length;
    setAwards(awardsCount);
    if (awards < 3) {
      setAwardImage("ще відсутній");
    }
    if (awards >= 3) {
      setAwardImage("Junior");
    }
    if (awards >= 6) {
      setAwardImage("Senior");
    }
    if (awards >= 9) {
      setAwardImage("Image Master");
    }
  }, [awards, userData?.posts?.length]);

  return (
    <ul className={scss.userInfoList}>
      <li className={scss.userInfoItem}>
        <BiUserCircle className={scss.userInfoBar} />
        Ім'я користувача: <span>{userData?.name}</span>
      </li>
      <li className={scss.userInfoItem}>
        <MdOutlineMailOutline className={scss.userInfoBar} />
        Пошта користувача:{" "}
        <a
          style={{ marginLeft: "10px", color: "red" }}
          href={`mailto:${userData?.email}`}
        >
          {userData?.email}
        </a>
      </li>
      <li className={scss.userInfoItem}>
        <BsFilePost className={scss.userInfoBar} />
        Кількість постів: <span>{userData ? userData.posts?.length : 0}</span>
      </li>
      <li className={scss.userInfoItem}>
        <BsAwardFill className={scss.userInfoBar} />
        Cтатус:{" "}
        <span style={{ color: "rgb(255, 130, 130)" }}> {awardsImage}</span>
      </li>

      {pathname === "/profile" && (
        <button onClick={handleLogut} className={scss.logoutMobile}>
          Вийти
        </button>
      )}
    </ul>
  );
};

export default UsersInfoBar;
