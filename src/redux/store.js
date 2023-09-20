import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import postSlice from "./post/postSlice";
import commentSlice from "./comments/commentsSlice";
import usersSlice from "./users/usersSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  comment: commentSlice,
  users: usersSlice,
});

export const store = configureStore({ reducer: rootReducer });
