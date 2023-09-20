import { Link, useLocation } from "react-router-dom";
import scss from "../AuthorPostItem/AuthorPostItem.module.scss";
import { AiOutlineClose } from "react-icons/ai";

const AuthorPostItem = ({ item, postId, handleClose }) => {
  const location = useLocation();

  return (
    <>
      {item && (
        <div
          className={scss.closeHeader}
          style={{ padding: handleClose ? "30px" : "0px" }}
        >
          <Link
            state={{ from: location.pathname }}
            style={{ textDecoration: "none" }}
            to={`/users/${postId}/posts`}
          >
            <div className={scss.avaBody}>
              <div className={scss.imageBodyAvatar}>
                {item.avatar ? (
                  <img
                    className={scss.imageAvaPic}
                    src={item.avatar}
                    alt=""
                    width="60"
                    loading="lazy"
                  />
                ) : (
                  <p className={scss.avatarShortName}>
                    {item?.name.slice(0, 1).toUpperCase()}
                  </p>
                )}
              </div>

              <div>
                <p
                  className={scss.authorNameText}
                  style={{
                    color: handleClose ? "white" : "black",
                    fontSize: handleClose ? "19px" : "16px",
                  }}
                >
                  {item?.name}
                </p>
              </div>
            </div>
          </Link>
          {handleClose && (
            <button className={scss.closeButton} onClick={handleClose}>
              <AiOutlineClose />
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default AuthorPostItem;
