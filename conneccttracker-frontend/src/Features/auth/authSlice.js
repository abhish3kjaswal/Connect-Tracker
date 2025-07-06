import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../services/authService";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Register

export const register = createAsyncThunk(
  "/register",
  async (FormData, thunkAPI) => {
    try {
      return await registerUser(FormData);
    } catch (error) {
      return (
        thunkAPI.rejectWithValue(error.response.data.message) ||
        "Register failed"
      );
    }
  }
);

export const login = createAsyncThunk("/login", async (formData, thunkAPI) => {
  try {
    const res = await loginUser(formData);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  } catch (error) {
    return (
      thunkAPI.rejectWithValue(error.response.data.message) || "Login failed"
    );
  }
});

// slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.user;
        state.token = action?.payload?.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
