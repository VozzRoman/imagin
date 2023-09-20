import scss from "../BackGroundContainer/BackGroundContainer.module.scss";
const BackGroundContainer = ({ children }) => {
  return <div className={scss.backContainer}>{children}</div>;
};

export default BackGroundContainer;
