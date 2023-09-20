import Moment from "react-moment";
import { AiFillEye } from "react-icons/ai";
import { FcLike } from "react-icons/fc";

import AuthorPostItem from "../../components/AuthorPostItem/AuthorPostItem";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import scss from "../../components/PostItem/PostItem.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPostById, updatePostLikes } from "../../redux/post/operations";
import { selectorGetCurrentPost } from "../../redux/post/selectors";

import MessgaeForm from "../../components/MessageForm/MessageFrom";

import MessageWindow from "../../components/MessegeWindow/MessageWindow";
import Container from "../../components/Container/Container";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import SideBar from "../../components/SideBar/SideBar";
import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import { getUserById } from "../../redux/users/operations";
import { selectorGetCurrentPostUser } from "../../redux/users/selectors";

const PostPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const item = useSelector(selectorGetCurrentPost);
  const userAuthor = useSelector(selectorGetCurrentPostUser);

  const { id } = useParams();

  const handleLike = () => {
    setIsLike(!isLike);
    const addLike = {
      like: item.like + (isLike ? -1 : 1),
      id: item._id,
    };
    dispatch(updatePostLikes(addLike));
  };

  useEffect(() => {
    if (item) {
      dispatch(getUserById(item?.author));
    }
  }, [dispatch, item?.author, item]);
  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  return (
    <>
      {item && (
        <Container>
          <div className={scss.postPageBody}>
            <div className={scss.sideBarBox}>
              <SideBar />
              <TotalInfoBar />
            </div>
            <ul className={scss.postPagePost}>
              <li className={scss.postBody}>
                <div className={scss.postHeader}>
                  <AuthorPostItem item={userAuthor} postId={item?.author} />

                  <Link className={scss.backToMain} to="/">
                    <span>на головну</span>
                  </Link>
                </div>

                <p className={scss.postText}>{item?.text}</p>
                {item.imgUrl && (
                  <div
                    className={scss.postImageBody}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <img src={item?.imgUrl} alt="pic" />
                  </div>
                )}
                <div>
                  <div className={scss.postInfoBody}>
                    <h3 className={scss.postText}>{item?.title}</h3>
                    <p className={scss.postText}>
                      <Moment date={item.createdAt} format="D MMM YYYY" />
                    </p>
                  </div>
                  <div className={scss.socialControlsBody}>
                    <div>
                      <button className={scss.iconView}>
                        <FcLike onClick={handleLike} />
                        <span>{item?.like}</span>
                      </button>
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
              <div style={{ width: "100%" }}>
                <MessageWindow data={item} />
                <MessgaeForm />
              </div>
            </ul>
          </div>
        </Container>
      )}
      {isOpen && (
        <Modal item={item}>
          <img src={item.imgUrl} alt={item.title} />
          <AuthorPostItem
            postId={item.author}
            item={userAuthor}
            handleClose={() => setIsOpen((prev) => !prev)}
          />
        </Modal>
      )}
    </>
  );
};

export default PostPage;
