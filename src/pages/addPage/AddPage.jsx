import { useEffect, useState } from "react";
import scss from "../addPage/AddPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/post/operations";
import { useNavigate } from "react-router-dom";
import {
  selectorGetErrorPost,
  selectorGetIsLoading,
} from "../../redux/post/selectors";

import SideBar from "../../components/SideBar/SideBar";
import Container from "../../components/Container/Container";
import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import Loadre from "../../components/Loader/Loader";
const AddPage = () => {
  const [messgae, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imgUrl, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const error = useSelector(selectorGetErrorPost);

  const isLoading = useSelector(selectorGetIsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (title !== "") {
      setMessage("");
    }
    setErrorMessage(error);
    if (
      imgUrl.type === "image/jpeg" ||
      imgUrl.type === "image/png" ||
      imgUrl.type === "image/jpg"
    ) {
      setErrorMessage(null);
    }
  }, [title, imgUrl, errorMessage, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      return setMessage("Введіть заглолвок поста");
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("imgUrl", imgUrl);

      dispatch(createPost(data)).then((res) => {
        if (res.error?.message !== "Rejected") {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancle = () => {
    setImage("");
    setText("");
    setTitle("");
    setErrorMessage(null);
  };

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div className={scss.sideBarBox}>
          <SideBar />
          <TotalInfoBar />
        </div>

        <div className={scss.formPageBody}>
          {isLoading ? (
            <Loadre />
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className={scss.formAddPage}
            >
              <p className={scss.textLabelimputImage}>Додати зображення</p>
              <label className={scss.labelForAddImge}>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  className={scss.inputAddPageImage}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                />
                <div className={scss.labelIMAGE}>IMAGE</div>
              </label>
              {errorMessage && (
                <h3 className={scss.errorMessage}>
                  {errorMessage === "Invalid image file" ||
                  errorMessage === "Unsupported ZIP file" ||
                  errorMessage === "Empty file"
                    ? "не правильний формат фото"
                    : errorMessage}
                </h3>
              )}

              <div className={scss.imageBody}>
                {imgUrl && <img src={URL.createObjectURL(imgUrl)} alt="pic" />}
              </div>

              <label className={scss.labelAddPage}>
                Заголовок поста
                <input
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  className={scss.inputAddPageTitle}
                  type="text"
                  name="title"
                  value={title}
                  placeholder="заголовок поста"
                />
              </label>
              <label className={scss.labelAddPage}>
                Опис поста
                <textarea
                  onChange={(e) => setText(e.currentTarget.value)}
                  className={scss.inputAddPageText}
                  type="text"
                  name="text"
                  value={text}
                  placeholder="опис поста"
                />
              </label>
              {messgae && <p className={scss.wornMessage}>{messgae}</p>}
              {error && (
                <p className={scss.wornMessage}>
                  {error === "Empty file" ? "завантаж ще раз" : error}
                </p>
              )}
              <div className={scss.sendControllers}>
                <button
                  onClick={handleSubmit}
                  className={scss.buttonsAddPage}
                  disabled={isLoading ? true : false}
                >
                  Додати пост
                </button>
                <button onClick={handleCancle} className={scss.buttonsAddPage}>
                  Відміна
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default AddPage;
