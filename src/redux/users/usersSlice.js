import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getUserById, getUserPosts } from "./operations";
import { updatePostView, updatePostLikes } from "../post/operations";

const initialState = {
  users: [],
  userPosts: [],
  currentPostUser: null,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getAllusers------------
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        //   console.log("GETALLUSERS", action.payload);
        state.isLoading = false;
        state.users = action.payload.users;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //getUser's POSTS
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        //   console.log("action USERS POSS-->", action.payload.listPost);
        //   console.log("action USERS BY ID-->", action.payload.data);
        state.isLoading = false;
        state.userPosts = action.payload.listPost;
        state.error = null;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //  --------для постов другіх юзеров
      .addCase(updatePostLikes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePostLikes.fulfilled, (state, actions) => {
        state.isLoading = false;
        const index = state.userPosts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.userPosts.splice(index, 1, actions.payload);
        state.error = null;
      })
      .addCase(updatePostLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePostView.pending, (state, action) => {
        state.isLoading = true;
        state.error = action.payload;
      })
      .addCase(updatePostView.fulfilled, (state, actions) => {
        state.isLoading = false;
        const index = state.userPosts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.userPosts.splice(index, 1, actions.payload);
        state.error = null;
      })
      .addCase(updatePostView.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //-----getUserById
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.currentPostUser = actions.payload.user;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      });
  },
});

export default usersSlice.reducer;
