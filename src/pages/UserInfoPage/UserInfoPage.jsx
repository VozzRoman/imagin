import scss from "../UserInfoPage/UserInfoPage.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SideBar from "../../components/SideBar/SideBar";
import Container from "../../components/Container/Container";
import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import Users from "../../components/Users/Users";
import { getUserById } from "../../redux/users/operations";
import { selectorGetCurrentPostUser } from "../../redux/users/selectors";
import UsersInfoBar from "../../components/UsersInfoBar/UsersInfoBar";

const UserInfoPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectorGetCurrentPostUser);

  const { id } = useParams();

  const location = useLocation();
  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch, id]);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div className={scss.sideBarBox}>
          <SideBar />
          <TotalInfoBar />
        </div>
        <div
          style={{
            marginLeft: "30px",
            width: "100%",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          <Users userData={user} />
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <UsersInfoBar userData={user} />
            <Link className={scss.listBackButton} to={location.state.from}>
              <MdOutlineKeyboardBackspace />{" "}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserInfoPage;
