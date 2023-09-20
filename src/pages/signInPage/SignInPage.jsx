import { Link, useNavigate } from "react-router-dom";
import scss from "./signInPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/auth/operations";
import { getErrorIn, getIsLoading } from "../../redux/auth/selectors";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const SignInPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(getErrorIn);
  const [typeInput, setTypeInput] = useState("password");
  const [icon, setIcon] = useState(<AiOutlineEyeInvisible />);
  const isLoading = useSelector(getIsLoading);
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

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.elements.email.value,
      password: form.elements.password.value,
    };

    dispatch(signIn(data)).then((res) => {
      if (res.payload.token) {
        navigate("/");
        form.reset();
      }
    });
  };

  return (
    <div className={scss.formBody}>
      <h1 className={scss.formTitle}>Реєстрація</h1>
      <form onSubmit={handleSubmit} autoComplete="off" className={scss.form}>
        <label className={scss.fromLabel}>
          Пошта
          <input
            className={scss.formInput}
            type="text"
          
            name="email"
            placeholder="email"
          />
        </label>
        <label className={scss.fromLabel} style={{ marginBottom: "0px" }}>
          Пароль
          <input
            className={scss.formInput}
            type={typeInput}
           
            name="password"
            placeholder="password"
          />
          <span className={scss.showHideIcon} onClick={handleShowHidePaswword}>
            {icon}
          </span>
        </label>

        {error && <p className={scss.errorMessage}>{error}</p>}
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
      <Link className={scss.formSignUpLink} to="/signup">
        В мене ще немае акаунта
      </Link>
    </div>
  );
};

export default SignInPage;
