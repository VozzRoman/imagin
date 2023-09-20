import scss from "../PostItem/PostItem.module.scss";
import Moment from "react-moment";
import { AiFillEye } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import AuthorPostItem from "../AuthorPostItem/AuthorPostItem";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removePost, updatePostLikes } from "../../redux/post/operations";
import { getUser } from "../../redux/auth/selectors";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import Modal from "../Modal/Modal";

import ImageHolder from "../ImageHolder/ImageHolder";

const PostItem = ({ item, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleDelete = (idx) => {
    dispatch(removePost(idx));
  };

  const handleLike = () => {
    setIsLike(!isLike);
    const addLike = {
      like: item.like + (isLike ? -1 : 1),
      id: item._id,
    };

    dispatch(updatePostLikes(addLike));
  };

  return (
    <>
      {item && (
        <li className={scss.postBody}>
          <div className={scss.editDeleteControls}>
            <AuthorPostItem item={userData[0]} postId={item.author} />
            <Link className={scss.addPostBth} to="/new">
              <BiPlus />
            </Link>
            {user?._id === item.author && (
              <div style={{ marginLeft: "10px" }}>
                <button
                  className={scss.buttonDelete}
                  onClick={() => handleDelete(item?._id)}
                >
                  <RiDeleteBin6Fill />
                </button>
                <Link to={`${item._id}/edit`} className={scss.buttonDelete}>
                  <PiPencilSimpleLineBold />
                </Link>
              </div>
            )}
          </div>

          <p className={scss.postText}>{item.text}</p>
          {item.imgUrl ? (
            <div
              className={scss.postImageBody}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img src={item.imgUrl} alt="pic" loading="lazy" />
            </div>
          ) : (
            <ImageHolder />
          )}

          <div>
            <div className={scss.postInfoBody}>
              <h3 className={scss.postText}>{item.title}</h3>
              <p className={scss.postText}>
                <Moment date={item.createdAt} format="D MMM YYYY" />
              </p>
            </div>
            <div className={scss.socialControlsBody}>
              <div>
                <button className={scss.iconView} onClick={handleLike}>
                  <FcLike />
                  <span>{item?.like}</span>
                </button>
                <Link
                  to={
                    location.pathname === "/"
                      ? `post/${item._id}`
                      : `${item._id}`
                  }
                  className={scss.iconView}
                >
                  <FaRegComment style={{ marginLeft: "10px" }} />
                  <span>
                    Коментарі{" "}
                    {item.comments?.length ? item.comments?.length : 0}
                  </span>
                </Link>
              </div>
              <div>
                <button className={scss.iconEye}>
                  <AiFillEye />
                  <span>{item.views ? item.views : 0}</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      )}
      {isOpen && (
        <Modal item={item}>
          <img src={item.imgUrl} alt={item.title} />
          <AuthorPostItem
            item={userData[0]}
            postId={item.author}
            handleClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default PostItem;
