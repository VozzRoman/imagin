import scss from "../postsPage/PostsPage.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorGetUserPost } from "../../redux/post/selectors";
import { getUserPosts } from "../../redux/post/operations";
import PostItem from "../../components/PostItem/PostItem";
import SideBar from "../../components/SideBar/SideBar";
import Container from "../../components/Container/Container";
import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import { selectorGetAllUsers } from "../../redux/users/selectors";

const PostsPage = () => {
  const dispatch = useDispatch();
  const userPost = useSelector(selectorGetUserPost);
  const getAllUsersTow = useSelector(selectorGetAllUsers);

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  const filterAuthor = (data) => {
    const filter = getAllUsersTow.filter((item) => item._id === data);
    return filter;
  };

  return (
    <Container>
      <div style={{ display: "flex", paddingBottom: "40px" }}>
        <div className={scss.sideBarBox}>
          <SideBar />
          <TotalInfoBar />
        </div>

        {userPost?.length ? (
          <ul className={scss.postsPageContainer}>
            {userPost?.map((item) => {
              return (
                <PostItem
                  key={item?._id}
                  item={item}
                  userData={filterAuthor(item.author)}
                />
              );
            })}
          </ul>
        ) : (
          <div className={scss.noPostsMessage}>У Вас ще немае постів</div>
        )}
      </div>
    </Container>
  );
};

export default PostsPage;
