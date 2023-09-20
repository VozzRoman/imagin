import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import scss from "../Modal/Modal.module.scss";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostView } from "../../redux/post/operations";
import { getUser } from "../../redux/auth/selectors";

const modalRoot = document.querySelector("#modal-root");

const Module = ({ item, children }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const view = useRef(item.views + 1);

  useEffect(() => {
    if (user._id === item.author) return;
    const addViews = {
      views: view.current,
      id: item._id,
    };

    dispatch(updatePostView(addViews));
  }, [dispatch, item._id, item.author, user._id]);

  return createPortal(
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={scss.backDrop}
    >
      <div className={scss.imageBody}>{children}</div>
    </motion.div>,
    modalRoot
  );
};
export default Module;
