import scss from "../mainPage/MainPage.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/post/operations";
import PostItem from "../../components/PostItem/PostItem";
import { selectorGetAllposts } from "../../redux/post/selectors";
import SliderPopular from "../../components/SliderPopular/SliderPopular";
import Container from "../../components/Container/Container";
import SideBar from "../../components/SideBar/SideBar";

import TotalInfoBar from "../../components/TotalInfoBar/TotalInfoBar";
import { selectorGetAllUsers } from "../../redux/users/selectors";

const MainPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectorGetAllposts);

  const getAllUsersTow = useSelector(selectorGetAllUsers);

  const filterAuthor = (data) => {
    const filter = getAllUsersTow.filter((item) => item._id === data);
    return filter;
  };

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div style={{ background: "rgb(227, 227, 227)" }}>
      <Container>
        {allPosts && (
          <div>
            <div className={scss.mainPageBody}>
              <div className={scss.sideBarBox}>
                <SideBar />
                <TotalInfoBar />
              </div>

              <div className={scss.mainContent}>
                <div className={scss.sliderContainer}>
                  <SliderPopular />
                </div>
                <div className={scss.postsContainer}>
                  <ul>
                    {allPosts?.map((item) => (
                      <PostItem
                        key={item._id}
                        item={item}
                        userData={filterAuthor(item.author)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MainPage;
