import scss from "../Profile/Profile.module.scss";
import Container from "../../components/Container/Container";

import { useDispatch, useSelector } from "react-redux";
import { getError, getUser } from "../../redux/auth/selectors";

import { useState } from "react";
import { useEffect } from "react";
import avaProfile from "../../images/profile.jpeg";
import { updateAvatar } from "../../redux/auth/operations";
import avaBck from "../../images/backAva.jpg";
import UsersInfoBar from "../../components/UsersInfoBar/UsersInfoBar";

import { selectorGetCurrentPostUser } from "../../redux/users/selectors";
import { getUserById } from "../../redux/users/operations";

const backgroundAvatarProfile = {
  backgroundImage: `url(${avaProfile})`,
  backgroundSize: "cover",
};
const Profile = () => {
  const [oldAva, setOldAva] = useState("");
  const [newAva, setNewAva] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authUser = useSelector(getUser);
  const user = useSelector(selectorGetCurrentPostUser);

  const dispatch = useDispatch();
  const error = useSelector(getError);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
    if (authUser) {
      setOldAva(authUser?.avatar);
    }
    if (authUser) {
      dispatch(getUserById(authUser?._id));
    }
  }, [dispatch, authUser, authUser?.avatar, error, errorMessage]);

  const handleChangeAvatar = (e) => {
    setNewAva(e.target.files[0]);
    setOldAva("");
    setErrorMessage("");
  };

  useEffect(() => {
    const handleSubmit = () => {
      const avatar = new FormData();
      avatar.append("avatar", newAva);
      dispatch(updateAvatar(avatar));
    };
    if (newAva) {
      handleSubmit();
    }
  }, [dispatch, newAva]);

  return (
    <form>
      <div className={scss.profileHeader}>
        <img src={avaBck} alt="" />
        <label className={scss.formAvaLabel}>
          <input
            className={scss.formAvaInput}
            type="file"
            onChange={handleChangeAvatar}
            accept="image/png, image/jpeg, image/jpg"
          />
          <div
            className={scss.formAvaImageBody}
            style={backgroundAvatarProfile}
          >
            {oldAva && <img src={oldAva} alt="avatar" />}
            {newAva && <img src={URL.createObjectURL(newAva)} alt="avatar" />}
            {errorMessage && (
              <h3 className={scss.textError}>
                {error === "Invalid image file" ||
                error === "Unsupported ZIP file"
                  ? "не правильний формат файлу"
                  : "спробуй ще раз!"}
              </h3>
            )}
          </div>
        </label>
      </div>

      {authUser && (
        <Container>
          <UsersInfoBar userData={user} />
        </Container>
      )}
    </form>
  );
};

export default Profile;
