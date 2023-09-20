import { useEffect } from "react";
import scss from "../MessegeWindow/MessegeWindow.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../redux/comments/operations";
import { useParams } from "react-router-dom";

import { selectorsComments } from "../../redux/comments/selectors";
import Moment from "react-moment";
import AuthorComments from "../AuthorComments/AuthorComments";
import { selectorGetAllUsers } from "../../redux/users/selectors";

const MessageWindow = () => {
  const comments = useSelector(selectorsComments);

  const dispatch = useDispatch();
  const allUsers = useSelector(selectorGetAllUsers);

  const { id } = useParams();
  //   console.log(id);
  const filterAuthor = (data) => {
    const filter = allUsers.filter((item) => item.name === data);
    return filter;
  };

  useEffect(() => {
    dispatch(getAllComments(id));
  }, [dispatch, id]);
  return (
    <div>
      {comments.text.length && (
        <div className={scss.windowBody}>
          <ul>
            {comments?.text?.map((item) => {
              return (
                <li key={item?._id} className={scss.messageItem}>
                  <AuthorComments item={filterAuthor(item?.username)} />

                  <div className={scss.messageBox}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 className={scss.titleMessage}>{item?.username}</h3>
                      <p className={scss.messegeDate}>
                        <Moment date={item?.createdAt} fromNow />
                      </p>
                    </div>

                    <p className={scss.textMessage}>{item?.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MessageWindow;
