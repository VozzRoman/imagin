import { Link, useLocation, useParams } from "react-router-dom";
import Container from "../../components/Container/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../redux/users/operations";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Users from "../../components/Users/Users";
import {
  selectorGetAllUsers,
  selectorPosts,
} from "../../redux/users/selectors";
import scss from "../../components/PostItem/PostItem.module.scss";
import Modal from "../../components/Modal/Modal";
import Moment from "react-moment";
import { AiFillEye } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";

import { updatePostLikes } from "../../redux/post/operations";
import AuthorPostItem from "../../components/AuthorPostItem/AuthorPostItem";

const OtherUserPost = () => {
  const [isOpenAndImageId, setIsOpenAndImageId] = useState("");
  const [postId, setPostId] = useState("");
  const [isLike, setIsLike] = useState("");
  const posts = useSelector(selectorPosts);
  const allUsers = useSelector(selectorGetAllUsers);
  const location = useLocation();

  const filterAuthor = (data) => {
    const filter = allUsers.filter((item) => item._id === data);
    return filter[0];
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserPosts(id));
  }, [dispatch, id]);
  const handlerIsOpne = (item) => {
    setIsOpenAndImageId(item.imgUrl);
    setPostId(item);
  };
  const handleLike = (item) => {
    setIsLike(!isLike);
    const addLike = {
      like: item.like + (isLike ? -1 : 1),

      id: item._id,
    };
    dispatch(updatePostLikes(addLike));
  };

  return (
    <Container>
      <Link className={scss.listBackButton} to={location?.state?.from}>
        <MdOutlineKeyboardBackspace />
      </Link>
      {posts.length > 0 && <Users userData={filterAuthor(posts[0]?.author)} />}
      {posts.length > 0 ? (
        <div style={{ marginTop: "100px", paddingBottom: "40px" }}>
          {posts?.map((item) => {
            return (
              <li key={item._id} className={scss.postBody}>
                <p className={scss.postText}>{item.text}</p>
                {item.imgUrl && (
                  <div
                    className={scss.postImageBody}
                    onClick={() => handlerIsOpne(item)}
                  >
                    <img src={item.imgUrl} alt="pic" />
                  </div>
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
                      <button className={scss.iconView}>
                        <FcLike onClick={() => handleLike(item)} />
                        <span>{item?.like}</span>
                      </button>
                      <Link to={`${item._id}`} className={scss.iconView}>
                        <FaRegComment style={{ marginLeft: "10px" }} />
                        <span>
                          Коментарі{" "}
                          {item.comments?.length ? item.comments?.length : 0}
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button className={scss.iconView}>
                        <AiFillEye />
                        <span>{item.views ? item.views : 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </div>
      ) : (
        <p className={scss.messageOtherUser}>Ще немае постів</p>
      )}
      {isOpenAndImageId && (
        <Modal item={postId} handleClose={() => setIsOpenAndImageId("")}>
          <img src={postId.imgUrl} alt={postId.title} />{" "}
          <AuthorPostItem
            item={filterAuthor(posts[0]?.author)}
            handleClose={() => setIsOpenAndImageId("")}
          />
        </Modal>
      )}
    </Container>
  );
};
export default OtherUserPost;
