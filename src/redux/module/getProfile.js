import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getProfile = createAsyncThunk(
  "getProfile",
  async (profileMembername, thunkAPI) => {
    return await axios
      .get(`api/member/?membername=${profileMembername}`)
      .then((response) => thunkAPI.fulfillWithValue(response?.data?.data))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const getProfile = createSlice({
  name: "getProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(__getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getProfile;