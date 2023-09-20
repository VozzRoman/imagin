import { useDispatch, useSelector } from "react-redux";
import scss from "../SideBar/SideBar.module.scss";
import { getUser } from "../../redux/auth/selectors";
import avaProfile from "../../images/profile.jpeg";
import avaBack from "../../images/backAva.jpg";
import { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { BsAwardFill } from "react-icons/bs";
import { GiRibbonShield } from "react-icons/gi";
import { selectorGetUserPost } from "../../redux/post/selectors";
import { getUserPosts } from "../../redux/post/operations";

const SideBar = () => {
  const [awards, setAwards] = useState(0);
  const [awardsImage, setAwardImage] = useState("");
  const dispatch = useDispatch();
  const authUser = useSelector(getUser);
  const currentUserPost = useSelector(selectorGetUserPost);

  const backgroundAvatarProfile = {
    backgroundImage: `url(${avaProfile})`,
    backgroundSize: "cover",
  };
  useEffect(() => {
    dispatch(getUserPosts());
    const awardsCount = currentUserPost.length;
    setAwards(awardsCount);
    if (awards >= 3) {
      setAwardImage(<FaAward />);
    }
    if (awards >= 6) {
      setAwardImage(<BsAwardFill />);
    }
    if (awards >= 9) {
      setAwardImage(<GiRibbonShield />);
    }
  }, [dispatch, awards, currentUserPost.length]);
  return (
    <aside className={scss.sideBar}>
      <img src={avaBack} alt="avaBack" />
      <div className={scss.avatarBody}>
        <div className={scss.avatarImageBox} style={backgroundAvatarProfile}>
          {authUser?.avatar && <img src={authUser.avatar} alt="avatar" />}
        </div>
        <p className={scss.avatarName}>{authUser?.name}</p>
        <a href={`mailto:${authUser?.email}`} className={scss.avatarEmail}>
          {authUser?.email}
        </a>
      </div>
      {awards >= 3 && <div className={scss.awardsLable}>{awardsImage}</div>}
    </aside>
  );
};
export default SideBar;
