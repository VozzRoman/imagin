import Slider from "react-slick";
import "../SliderPopular/SlickStyle.scss";

import { useSelector } from "react-redux";
import scss from "../SliderPopular/SliderPopular.module.scss";
import { selectorGetPopularPost } from "../../redux/post/selectors";
import GallerySlider from "../GallerySlider/GallerySlider";
import { memo, useState } from "react";
import Modal from "../Modal/Modal";
import { selectorGetAllUsers } from "../../redux/users/selectors";
import AuthorSlider from "../AuthorSlider/AuthorSlider";

const SliderPopular = () => {
  const [isOpenAndImageId, setIsOpenAndImageId] = useState("");
  const [postId, setPostId] = useState("");

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    swipeToSlide: true,
  };

  const handlerIsOpen = (item) => {
    setIsOpenAndImageId(item.imgUrl);
    setPostId(item);
  };

  const popularPosts = useSelector(selectorGetPopularPost);
  const getAllUsersTow = useSelector(selectorGetAllUsers);

  const filterAuthor = (data) => {
    const filter = getAllUsersTow.filter((item) => item._id === data);
    return filter;
  };

  return (
    <>
      {popularPosts.length === 6 ? (
        <Slider {...settings}>
          {popularPosts?.map((item) => {
            return (
              <li
                key={item._id}
                className={scss.slideItem}
                onClick={() => handlerIsOpen(item)}
              >
                <AuthorSlider
                  item={item}
                  dataUser={filterAuthor(item.author)}
                />
              </li>
            );
          })}
        </Slider>
      ) : (
        <div className={scss.sliderHolder}>
          <h3>Треба більше постів</h3>
        </div>
      )}
      {isOpenAndImageId && (
        <Modal item={postId} handleClose={() => setIsOpenAndImageId("")}>
          <GallerySlider
            imageId={isOpenAndImageId}
            handleClose={() => setIsOpenAndImageId("")}
          />
        </Modal>
      )}
    </>
  );
};
export default memo(SliderPopular);
