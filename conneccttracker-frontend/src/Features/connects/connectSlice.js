import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import {
  addConnectsFn,
  fetchAllPublicConnects,
  fetchMyConnects,
} from "../../services/connectService";

export const fetchPublicConnects = createAsyncThunk(
  "/connects/public",
  async (_, thunkAPI) => {
    try {
      return await fetchAllPublicConnects();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching public connects"
      );
    }
  }
);

export const fetchConnects = createAsyncThunk(
  "/connects/my",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    try {
      const res = await fetchMyConnects(token);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch your connects"
      );
    }
  }
);
export const addConnects = createAsyncThunk(
  "/connects",
  async (connectData, thunkAPI) => {
    const state = thunkAPI.getState();

    const token = state.auth.token;

    try {
      const res = await addConnectsFn(token, connectData);

      console.log("RES------>",res)
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error adding connect"
      );
    }
  }
);

const connectSlice = createSlice({
  name: "connects",
  initialState: {
    publicConnects: [],
    myConnects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicConnects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicConnects.fulfilled, (state, action) => {
        state.loading = false;
        state.publicConnects = action.payload;
      })
      .addCase(fetchPublicConnects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchConnects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnects.fulfilled, (state, action) => {
        state.loading = false;
        state.myConnects = action.payload;
      })
      .addCase(fetchConnects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addConnects.fulfilled, (state, action) => {
        state.myConnects?.connects.unshift(action.payload);
      });
  },
});

export default connectSlice.reducer;
