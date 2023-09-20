import { useState } from "react";
import scss from "../../components/PostItem/PostItem.module.scss";
import { useDispatch } from "react-redux";
import { createComments } from "../../redux/comments/operations";
import { useParams } from "react-router-dom";
import { MdSend } from "react-icons/md";
const MessgaeForm = () => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();

  const handelOnChange = (e) => {
    //  console.log(e.target.value);
    setBody(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(body);
    const data = {
      body,
      id,
    };
    dispatch(createComments(data));
    setBody("");
  };

  return (
    <div className={scss.postPageCommentsBox}>
      <form onSubmit={handleSubmit}>
        <div className={scss.fromPostPageBox}>
          <label className={scss.labelComment}>
            <span>Ваш відгук</span>
            <textarea
              onChange={handelOnChange}
              className={scss.inputPostPage}
              type="text"
              name="body"
              value={body}
              placeholder="ваш відгук"
            />
          </label>
        </div>
        <button className={scss.commentSendBth}>
          <MdSend />
        </button>
      </form>

      <ul>
        <li></li>
      </ul>
    </div>
  );
};
export default MessgaeForm;
