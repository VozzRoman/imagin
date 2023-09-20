import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3030/api/";
axios.defaults.baseURL = "https://social-post-backend.onrender.com/api/";

export const createComments = createAsyncThunk(
  "comments/createComments",
  async (data, thunkAPI) => {
    //  console.log("createComments", data);
    try {
      const response = await axios.post(`/comment/${data.id}`, data);
      // console.log("responseComments", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllComments = createAsyncThunk(
  "comments/getAllComments",
  async (id, thunkAPI) => {
    //  console.log("getAllComments", id);
    try {
      const response = await axios.get(`/comment/post/${id}`);
      // console.log("getAllComments", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
