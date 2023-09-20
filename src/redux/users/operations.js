import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3030/api/";
axios.defaults.baseURL = "https://social-post-backend.onrender.com/api/";

function set(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thnkAPI) => {
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.get("/users");
      // console.log("ALLUSERS--->", response.data);
      return response.data;
    } catch (error) {
      return thnkAPI.rejectWithValue(error);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "user/getUsersPosts",
  async (id, thunkAPI) => {
    //  console.log("ID-USER-->", id);
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.get(`users/${id}/posts`);
      // console.log("getUsersPost-->", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.createAsyncThunk(error);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, thunkAPI) => {
    //  console.log("ID-USER-->", id);
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.get(`users/${id}`);
      // console.log("getUserById-->", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.createAsyncThunk(error);
    }
  }
);
