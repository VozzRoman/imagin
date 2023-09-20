import Slider from "react-slick";
import "../GallerySlider/SlickStyle.scss";
import scss from "../GallerySlider/GallerySlider.module.scss";
import { useSelector } from "react-redux";
import { selectorGetPopularPost } from "../../redux/post/selectors";
import { selectorGetAllUsers } from "../../redux/users/selectors";

import AuthorPostItem from "../AuthorPostItem/AuthorPostItem";
import ImageHolder from "../ImageHolder/ImageHolder";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const GallerySlider = ({ imageId, handleClose }) => {
  const popularPosts = useSelector(selectorGetPopularPost);
  const imageArray = popularPosts.map((item) => {
    return {
      image: item.imgUrl,
      userAuthor: item.author,
    };
  });

  const getAllUsersTow = useSelector(selectorGetAllUsers);

  const filterAuthor = (data) => {
    const filter = getAllUsersTow.filter((item) => item._id === data);
    return filter;
  };
  //   console.log(imageArray);
  const oreder = (array) => {
    for (const el of array) {
      if (el.image === imageId) {
        const index = array.findIndex((item) => item.image === imageId);
        imageArray.splice(index, 1);
        return imageArray.unshift(el);
      }
    }
  };
  const result = oreder(imageArray);
  console.log(result);

  return (
    <div>
      <Slider {...settings}>
        {imageArray.map((item, index) => {
          const data = filterAuthor(item.userAuthor);

          return (
            <div key={index}>
              <div className={scss.imageBox}>
                {item.image ? (
                  <img src={item.image} alt="pic" />
                ) : (
                  <ImageHolder handleClose={handleClose} />
                )}
                <AuthorPostItem
                  item={data[0]}
                  postId={item.userAuthor}
                  handleClose={handleClose}
                />
                {/* <div className={scss.avaBody}>
                  <ModalAuthor data={data} item={item} />
                </div> */}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default GallerySlider;
