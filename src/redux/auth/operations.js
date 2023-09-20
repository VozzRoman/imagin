import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3030/api/";
axios.defaults.baseURL = "https://social-post-backend.onrender.com/api/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credential, thunkAPI) => {
    //  console.log("userData--->", credential);
    const ava = credential.get("avatar");
    console.log(ava);
    try {
      const response = await axios.post("auth/signup", credential);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      //ошибка из бека
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credential, thunkAPI) => {
    //  console.log("userData--->", credential);
    try {
      const response = await axios.post("auth/signin", credential);
      // console.log(response.data.data.token);
      token.set(response.data.data.token);
      if (response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
      }
      return response.data.data;
    } catch (error) {
      // console.log(error);
      // console.log(error.response.data.message);
      //ошибка из бека
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const current = createAsyncThunk("auth/current", async (_, thunkAPI) => {
  try {
    const storageToken = localStorage.getItem("token");
    console.log(storageToken);
    if (!storageToken) {
      console.log("нету токена");
      return thunkAPI.rejectWithValue("no valid token");
    }
    token.set(storageToken);
    const response = await axios.get("auth/current");

    return response.data;
  } catch (error) {
    //ошибка из бека
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("token");
    const response = await axios.post("auth/logout");
    //  console.log(response.data);
    //  token.set(response.data.data.token);
    return response.data;
  } catch (error) {
    //ошибка из бека
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const updateAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (data, thunkAPI) => {
    //  const ava = data.get("avatar");
    //  console.log(ava);
    try {
      const response = await axios.patch(`auth/user/avatar`, data);
      // console.log("UPDATE_AVA_RESPONSE-->", response.data.userUpdate);
      return response.data.userUpdate;
    } catch (error) {
      // console.log("Ошібка", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
