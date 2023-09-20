import scss from "../ImageHolder/ImagrHolder.module.scss";
const imageHolderStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
const ImageHolder = ({ handleClose }) => {
  return (
    <div
      className={scss.imageHolder}
      style={handleClose ? imageHolderStyle : null}
    >
      <p>Цей пост не містить фото</p>
    </div>
  );
};
export default ImageHolder;
