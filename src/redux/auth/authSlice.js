import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, current, logout, updateAvatar } from "./operations";

const initialState = {
  user: null,
  token: "",
  isLoading: false,
  error: null,
  signInError: null,
  signUpError: null,
  isFetchingUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //post-signUp
      .addCase(signUp.pending, (state) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = true;
        state.signUpError = null;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = false;
        state.token = actions.payload.token;
        state.user = actions.payload;
        state.signUpError = null;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = false;
        state.signUpError = actions.payload;
        state.error = actions.payload;
        //   state.token = actions.payload.token;

        state.error = actions.payload;
      })
      //post-signIn
      .addCase(signIn.pending, (state) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = true;
        state.signInError = null;
      })
      .addCase(signIn.fulfilled, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = false;
        state.token = actions.payload.token;
        state.user = actions.payload;
        state.signInError = null;
      })
      .addCase(signIn.rejected, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = false;
        state.signInError = actions.payload;
      })
      //   get - current
      .addCase(current.pending, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isFetchingUser = true;

        //   state.isLoading = true;
        state.error = null;
      })
      .addCase(current.fulfilled, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = false;
        state.isFetchingUser = false;
        state.user = actions.payload;
        state.token = actions.payload.token;
        state.error = null;
      })
      .addCase(current.rejected, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        //   state.isLoading = false;
        state.isFetchingUser = false;
        state.error = actions.payload;
      })
      //pos -logout
      .addCase(logout.fulfilled, (state, actions) => {
        //   console.log("STATE-->", state, "action--->", actions);
        state.isLoading = false;
        state.user = null;
        state.error = null;
        state.token = "";
      })
      //Update Avatar----
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, actions) => {
        //   console.log("UPDATE-AVATAR", actions);
        state.isLoading = false;
        state.user = actions.payload;
        state.error = null;
      })
      .addCase(updateAvatar.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      });
  },
});

export default authSlice.reducer;
