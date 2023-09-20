import scss from "../../components/Users/Users.module.scss";

import avaProfile from "../../images/profile.jpeg";
import avaBack from "../../images/backAva.jpg";
import { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { BsAwardFill } from "react-icons/bs";
import { GiRibbonShield } from "react-icons/gi";

const Users = ({ userData }) => {
  const [awards, setAwards] = useState(0);
  const [awardsImage, setAwardImage] = useState("");
  const backgroundAvatarProfile = {
    backgroundImage: `url(${avaProfile})`,
    backgroundSize: "cover",
  };
  useEffect(() => {
    const awardsCount = userData?.posts?.length;
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
  }, [awards, userData]);
  return (
    <>
      <aside className={scss.sideBar}>
        <img src={avaBack} alt="avaBack" />
        <div className={scss.avatarBody}>
          <div className={scss.avatarImageBox} style={backgroundAvatarProfile}>
            {userData && (
              <img
                src={userData[0] ? userData[0]?.avatar : userData?.avatar}
                alt={userData.avatar ? "avatar" : ""}
              />
            )}
          </div>
          {userData && (
            <p className={scss.avatarName}>
              {userData[0] ? userData[0]?.name : userData?.name}
            </p>
          )}
        </div>
        {awards >= 3 && <div className={scss.awardsLable}>{awardsImage}</div>}
      </aside>
    </>
  );
};
export default Users;
