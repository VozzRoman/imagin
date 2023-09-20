import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "http://localhost:3030/api/";
axios.defaults.baseURL = "https://social-post-backend.onrender.com/api/";

function set(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    //  console.log("CreatePOst-->", data);
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.post("/post", data);
      // console.log("DATA CREATE", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.get("/post");
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (id, thunkAPI) => {
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.get(`/post/${id}`);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "post/getUserPosts",
  async (_, thunkAPI) => {
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.get(`/post/user/my`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async (id, thunkAPI) => {
    //  console.log("removePost", id);
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.delete(`/post/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data, thunkAPI) => {
    const id = data.get("_id"); //достал id із FormData //data.id - не работает
    console.log(id);
    try {
      const localToken = localStorage.getItem("token");
      set(localToken);
      const response = await axios.put(`/post/${id}`, data);
      // console.log(response.data.post);
      return response.data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

//like
export const updatePostLikes = createAsyncThunk(
  "post/UpdatePostLikes",
  async (data, thunkAPI) => {
    //  console.log("UpdatePostLikes", data);

    try {
      // const localToken = localStorage.getItem("token");
      // set(localToken);
      const response = await axios.patch(`/post/${data.id}/like`, data);
      // console.log("UpdatePostLikes", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
//disLike
export const updatePostView = createAsyncThunk(
  "post/updatePostView",
  async (data, thunkAPI) => {
    //  console.log("updatePostDislike", data);

    try {
      // const localToken = localStorage.getItem("token");
      // set(localToken);
      const response = await axios.patch(`/post/${data.id}/view`, data);
      // console.log("updatePostDislike", response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
