import { Link } from "react-router-dom";
import scss from "../ModalAuthor/ModalAuthor.module.scss";
const ModalAuthor = ({ data, item }) => {
  console.log(data);
  return (
    <div className={scss.avaBody}>
      <Link
        className={scss.galleryAuthor}
        to={`/users/${item.userAuthor}/posts`}
      >
        <div className={scss.avaBox}>
          {data[0]?.avatar ? (
            <img src={data[0]?.avatar} alt="ava" />
          ) : (
            <p className={scss.avatarShortName}>{data[0]?.name}</p>
          )}
        </div>

        <p className={scss.avaName}>{data[0]?.name}</p>
      </Link>
    </div>
  );
};

export default ModalAuthor;
