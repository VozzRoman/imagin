import { useDispatch, useSelector } from "react-redux";
import scss from "../TotalInfoBar/TotalInfoBar.module.scss";

import { selectorGetUserPost } from "../../redux/post/selectors";
import { selectorGetAllUsers } from "../../redux/users/selectors";
import { AiFillLike } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { BsFilePost, BsAwardFill } from "react-icons/bs";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { getUserPosts } from "../../redux/post/operations";
import { getAllUsers } from "../../redux/users/operations";

const activeStyles = {
  color: "gray",
  borderBottom: "1px solid gray",
};

const TotalInfoBar = ({ toggle }) => {
  const [awards, setAwards] = useState(0);
  const [awardsImage, setAwardImage] = useState("");

  const allUsers = useSelector(selectorGetAllUsers);
  const dispatch = useDispatch();
  const currentUserPost = useSelector(selectorGetUserPost);

  const totalLike = currentUserPost
    .map((item) => item.like)
    .reduce((prev, next) => prev + next, 0);

  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const awardsCount = currentUserPost?.length;
    setAwards(awardsCount);
    if (awards < 3) {
      setAwardImage("ще не отримав");
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
  }, [awards, currentUserPost?.length]);

  return (
    <ul className={scss.totalUsers}>
      <li className={scss.totalPosts}>
        <BsFilePost className={scss.totalInfoIcons} />
        <NavLink
          onClick={toggle}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className={scss.totalLink}
          to="/posts"
        >
          Всього постів:
        </NavLink>
        <span>{currentUserPost ? currentUserPost.length : 0}</span>
      </li>
      <li className={scss.totalPosts}>
        <FaUserAlt className={scss.totalInfoIcons} />
        <NavLink
          onClick={toggle}
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
          className={scss.totalLink}
          to="/users"
        >
          Всього користувачів:
        </NavLink>
        <span>{allUsers ? allUsers?.length : 0}</span>
      </li>
      <li className={scss.totalPosts}>
        <AiFillLike className={scss.totalInfoIcons} />
        <p className={scss.totalLink} style={{ borderBottom: "none" }}>
          Кількість лайків:
        </p>
        <span>{totalLike ? totalLike : 0}</span>
      </li>
      <li className={scss.totalPosts}>
        <BsAwardFill className={scss.totalInfoIcons} />
        <p className={scss.totalLink} style={{ borderBottom: "none" }}>
          {" "}
          Статус:{" "}
          <span style={{ color: "rgb(255, 130, 130)" }}> {awardsImage}</span>
        </p>
      </li>
    </ul>
  );
};

export default TotalInfoBar;
