import scss from "../AuthorSlider/AuthorSlider.module.scss";

const AuthorSlider = ({ item, dataUser }) => {
  const data = dataUser[0];
  //   console.log("---->", data);
  return (
    <div className={scss.sliderImageBox}>
      <div className={scss.avaBody}>
        <div className={scss.avaBox}>
          {item.avatar ? (
            <img src={data?.avatar} alt="ava" />
          ) : (
            <p className={scss.avatarShortName}>{data?.name.slice(0, 1)}</p>
          )}
        </div>
        <p className={scss.avaName}>{data?.name}</p>
      </div>
      {item.imgUrl ? (
        <img src={item?.imgUrl} alt="pic" />
      ) : (
        <div className={scss.imageHolder}>
          <p>Фото відсутнє</p>
        </div>
      )}
    </div>
  );
};
export default AuthorSlider;
