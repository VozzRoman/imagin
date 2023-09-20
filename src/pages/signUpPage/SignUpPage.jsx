import { useNavigate } from "react-router-dom";
import scss from "./signUpPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../redux/auth/operations";
import { getErrorUp, getIsLoading } from "../../redux/auth/selectors";
import { useEffect, useState } from "react";
import avaProfile from "../../images/profile.jpeg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import Container from "../../components/Container/Container";

const backgroundAvatarProfile = {
  backgroundImage: `url(${avaProfile})`,
  backgroundSize: "cover",
};

const SignUpPage = () => {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [icon, setIcon] = useState(<AiOutlineEyeInvisible />);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  let errors = useSelector(getErrorUp);

  const handleShowHidePaswword = () => {
    if (typeInput === "password") {
      setTypeInput("text");
      setIcon(<AiOutlineEye />);
    }
    if (typeInput === "text") {
      setTypeInput("password");
      setIcon(<AiOutlineEyeInvisible />);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("avatar", avatar);
    data.append("name", username);
    data.append("email", email);
    data.append("password", password);

    dispatch(signUp(data)).then((res) => {
      if (res.error?.message !== "Rejected") {
        navigate("/signin");
        setAvatar("");
        setUsername("");
        setPassword("");
      }
    });
  };
  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
    setErrorMessage("");
  };

  useEffect(() => {
    if (errors) {
      setErrorMessage(errors);
    }
  }, [errors]);

  return (
    <Container>
      <div className={scss.formBody}>
        <h1 className={scss.formTitle}>Авторизація</h1>
        <form onSubmit={handleSubmit} autoComplete="off" className={scss.form}>
          <label className={scss.formAvaLabel}>
            <input
              className={scss.formAvaInput}
              type="file"
              onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg"
            />
            <div
              className={scss.formAvaImageBody}
              style={backgroundAvatarProfile}
            >
              {avatar && <img src={URL.createObjectURL(avatar)} alt="avatar" />}
            </div>
          </label>

          <label className={scss.formLabel}>
            Ім'я користувача
            <input
              className={scss.formInput}
              type="text"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </label>
          <label className={scss.formLabel}>
            Пошта
            <input
              className={scss.formInput}
              type="text"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </label>
          <label className={scss.formLabel} style={{ marginBottom: "0px" }}>
            Пароль
            <input
              className={scss.formInput}
              type={typeInput}
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <span
              className={scss.showHideIcon}
              onClick={handleShowHidePaswword}
            >
              {icon}
            </span>
          </label>
          {errorMessage && (
            <p className={scss.errorMessage}>
              {errors === "Invalid image file" ||
              errors === "Unsupported ZIP file" ||
              errors === "Empty file" ||
              errors === "спробуй ще раз"
                ? "перезавантаж фото!"
                : errors}
            </p>
          )}
          {!isLoading ? (
            <button type="submit" className={scss.formButton}>
              зареєструватися
            </button>
          ) : (
            <ThreeDots
              height="40"
              width="40"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ marginTop: "15px", justifyContent: "center" }}
              wrapperClassName=""
              visible={true}
            />
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUpPage;
