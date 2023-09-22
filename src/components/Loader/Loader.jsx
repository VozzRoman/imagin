import { Puff } from "react-loader-spinner";
import scss from "../Loader/Loader.module.scss";
const Loadre = () => {
  return (
    <div className={scss.spiner}>
      <Puff
        height="90"
        width="90"
        radius={1}
        color="rgb(110, 116, 161)"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass={scss.loader}
        visible={true}
      />
    </div>
  );
};
export default Loadre;
