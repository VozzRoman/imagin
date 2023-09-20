import { createSlice } from "@reduxjs/toolkit";
import { createComments, getAllComments } from "./operations";

const initialState = {
  text: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //создаем коммент
      .addCase(createComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createComments.fulfilled, (state, actions) => {
        //   console.log(actions.payload.comment);
        state.isLoading = false;
        state.text.push(actions.payload.comment);
        state.error = null;
      })
      .addCase(createComments.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      })
      //получаем все коменти
      .addCase(getAllComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, actions) => {
        //   console.log("COMMENTS-SLICE", actions.payload.commentsList);
        state.isLoading = false;
        state.text = actions.payload.commentsList;
        state.error = null;
      })
      .addCase(getAllComments.rejected, (state, actions) => {
        state.isLoading = false;
        state.error = actions.payload;
      });
  },
});

export default commentsSlice.reducer;
