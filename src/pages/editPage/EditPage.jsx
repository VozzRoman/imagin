import { useEffect, useState } from "react";
import scss from "../addPage/AddPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePost } from "../../redux/post/operations";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectorGetErrorPost,
  selectorGetIsLoading,
} from "../../redux/post/selectors";
import SideBar from "../../components/SideBar/SideBar";
import Container from "../../components/Container/Container";
import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import Loadre from "../../components/Loader/Loader";

const EditPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [oldImgUrl, setOldImgUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messgae, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const error = useSelector(selectorGetErrorPost);
  const isLoading = useSelector(selectorGetIsLoading);

  useEffect(() => {
    dispatch(getPostById(id))
      .then(({ payload }) => {
        setTitle(payload.title);
        setText(payload.text);
        setOldImgUrl(payload.imgUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (title !== "") {
      setMessage("");
    }
    setErrorMessage(error);
    if (
      newImgUrl.type === "image/jpeg" ||
      newImgUrl.type === "image/png" ||
      newImgUrl.type === "image/jpg"
    ) {
      setErrorMessage(null);
    }
  }, [title, error, newImgUrl.type]);

  const handleSubmit = () => {
    if (title === "") {
      return setMessage("Введіть заглолвок поста");
    }
    try {
      if (!newImgUrl) {
        const updateData = new FormData();
        updateData.append("title", title);
        updateData.append("text", text);
        updateData.append("imgUrl", oldImgUrl);
        updateData.append("_id", id);
        console.log(updateData.get("imgUrl"));
        return dispatch(updatePost(updateData)).then((res) => {
          if (res.error?.message !== "Rejected") {
            navigate("/");
          }
        });
      }
      const updateData = new FormData();
      updateData.append("title", title);
      updateData.append("text", text);
      updateData.append("imgUrl", newImgUrl);
      updateData.append("_id", id);
      console.log(updateData.get("imgUrl"));
      return dispatch(updatePost(updateData)).then((res) => {
        if (res.error?.message !== "Rejected") {
          navigate("/");
        }
        return setOldImgUrl("");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancle = () => {
    setText("");
    setTitle("");
    setErrorMessage(null);
  };
  const handleUpdateImage = (e) => {
    setNewImgUrl(e.target.files[0]);
    setOldImgUrl("");
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
                  onChange={handleUpdateImage}
                  className={scss.inputAddPageImage}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                />
                <div className={scss.labelIMAGE}>IMAGE</div>
              </label>
              {errorMessage && (
                <h3 className={scss.errorMessage}>
                  {error === "Invalid image file" ||
                  error === "Unsupported ZIP file"
                    ? "не правильний формат фото"
                    : error}
                </h3>
              )}
              <div className={scss.imageBody}>
                {oldImgUrl && <img src={oldImgUrl} alt="pic" />}
              </div>
              <div className={scss.imageBody}>
                {newImgUrl && (
                  <img src={URL.createObjectURL(newImgUrl)} alt="pic" />
                )}
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
              <div className={scss.sendControllers}>
                <button
                  disabled={isLoading ? true : false}
                  onClick={handleSubmit}
                  className={scss.buttonsAddPage}
                >
                  Оновити
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

export default EditPage;
