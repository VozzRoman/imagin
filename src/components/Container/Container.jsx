import scss from "../Container/Container.module.scss";
const Container = ({ children }) => {
  return <div className={scss.container}>{children}</div>;
};

export default Container;
