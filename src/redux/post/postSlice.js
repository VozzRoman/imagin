import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  getPostById,
  getUserPosts,
  removePost,
  updatePost,
  updatePostView,
  updatePostLikes,
} from "./operations";

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  error: null,
  currentPost: null,
  userPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //создаем пост
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        //   console.log("CREATE POST", action.payload);
        state.isLoading = false;
        state.posts.push(action.payload.data);
        //   state.popularPosts.push(action.payload);
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //получаем все пости
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, actions) => {
        //   console.log("Back PSTS-->", actions);
        state.isLoading = false;
        state.posts = actions.payload.posts;
        state.popularPosts = actions.payload.popularPosts;
        state.error = null;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //по Id
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, actions) => {
        //   console.log(actions.payload._id);
        state.isLoading = false;
        state.currentPost = actions.payload;
        state.error = null;
      })
      .addCase(getPostById.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //поcти юзера
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.userPosts = actions.payload.list;
        state.error = null;
      })
      .addCase(getUserPosts.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //удаленіе поста
      .addCase(removePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state, actions) => {
        //   console.log("removeSlice", actions);
        state.isLoading = false;
        const index = state.posts.findIndex(
          (item) => item._id === actions.payload.id
        );
        state.posts.splice(index, 1);

        const indexUserPosts = state.userPosts.findIndex(
          (item) => item._id === actions.payload.id
        );
        //   console.log("Imdex", index);
        state.userPosts.splice(indexUserPosts, 1);

        state.error = null;
      })
      .addCase(removePost.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //оновлення посту
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, actions) => {
        //   console.log("updatePost", actions.payload._id);
        state.isLoading = false;
        //-----для всех постов posts
        const index = state.posts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.posts.splice(index, 1, actions.payload);
        //----для постов юзера userPosts
        const indexUser = state.userPosts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.userPosts.splice(indexUser, 1, actions.payload);

        state.error = null;
      })
      .addCase(updatePost.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //  лайкі
      .addCase(updatePostLikes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePostLikes.fulfilled, (state, actions) => {
        //   console.log("updateLike", actions.payload._id);
        state.isLoading = false;
        //------------для всех постов
        const index = state.posts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.posts.splice(index, 1, actions.payload);
        //--------------для постов пользователя
        const indexUser = state.userPosts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.userPosts.splice(indexUser, 1, actions.payload);
        //-------------для текущего пользователя

        state.currentPost = actions.payload;

        state.error = null;
      })
      .addCase(updatePostLikes.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //Просмотры
      .addCase(updatePostView.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePostView.fulfilled, (state, actions) => {
        //   console.log("updateDisLike", actions.payload._id);
        //--------для постов пользователя
        state.isLoading = false;
        const index = state.posts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.posts.splice(index, 1, actions.payload);
        //--------------для постов пользователя
        const indexUser = state.userPosts.findIndex(
          (item) => item._id === actions.payload._id
        );
        state.userPosts.splice(indexUser, 1, actions.payload);
        //-------------для текущего пользователя

        state.currentPost = actions.payload;

        state.error = null;
      })
      .addCase(updatePostView.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      });
  },
});

export default postSlice.reducer;
