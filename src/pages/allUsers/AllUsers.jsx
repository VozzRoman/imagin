import scss from "../../pages/allUsers/AllUsers.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../redux/post/operations";
import { VscChromeClose } from "react-icons/vsc";

import SideBar from "../../components/SideBar/SideBar";
import Container from "../../components/Container/Container";
import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import { selectorGetAllUsers } from "../../redux/users/selectors";
import SerachForm from "../../components/SerachForm/SerachForm";
import AuthorPostItem from "../../components/AuthorPostItem/AuthorPostItem";
import { Link, useLocation } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();
  const getAllUsers = useSelector(selectorGetAllUsers);
  const [filter, setFilter] = useState([]);
  const [message, setMessage] = useState("");
  const [hold, setHold] = useState(5);
  const locatioin = useLocation();

  const handleFilterUser = (name) => {
    if (!name.length) {
      return setFilter(getAllUsers);
    }
    const searchFilter = getAllUsers?.filter((item) => {
      setHold(5);

      if (item.name.toLowerCase() !== name) {
        return setMessage("Такого користувача не ісуне");
      }

      return item.name.toLowerCase().includes(name);
    });

    setFilter(searchFilter);
  };
  const flag = filter.length > 0 ? false : message;

  const openAllUser = () => {
    setFilter(getAllUsers);

    setHold(getAllUsers.length);
  };
  const closeAllUser = () => {
    setFilter(getAllUsers);

    setHold(5);
  };
  useEffect(() => {
    dispatch(getUserPosts());

    setFilter(getAllUsers);

    //  setMessage("");
  }, [dispatch, getAllUsers]);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div className={scss.sideBarBox}>
          <SideBar />
          <TotalInfoBar />
        </div>
        <div className={scss.allUsersContainer}>
          <div className={scss.allUsersSearchbody}>
            <SerachForm handleFilterUser={handleFilterUser} />
            <button className={scss.openAllUsers} onClick={openAllUser}>
              Всі
            </button>
          </div>
          {flag && <p className={scss.errorMessage}>{message}</p>}
          <ul>
            {filter?.map((item, index) => {
              if (index < hold) {
                return (
                  <li className={scss.allUserItem} key={item._id}>
                    <AuthorPostItem item={item} postId={item._id} />
                    <Link
                      state={{ from: locatioin.pathname }}
                      to={`/users/info/${item._id}`}
                      className={scss.allUsersBth}
                    >
                      Переглянути
                    </Link>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          {hold !== 5 && (
            <button className={scss.closeAllUsers} onClick={closeAllUser}>
              <VscChromeClose />
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AllUsers;
