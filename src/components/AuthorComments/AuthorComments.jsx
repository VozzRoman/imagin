import scss from "../AuthorComments/AuthorComments.module.scss";

const AuthorComments = ({ item }) => {
  const data = item[0];
  return (
    <div className={scss.avaMessegeBody}>
      {data?.avatar ? (
        <img src={data?.avatar} alt="ava" />
      ) : (
        <p>{data?.name.slice(0, 1).toUpperCase()}</p>
      )}
    </div>
  );
};

export default AuthorComments;
