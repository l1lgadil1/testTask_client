import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/login", params);

  return { data };
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/register", params);
    return data;
  }
);

export const fetchGetMe = createAsyncThunk("auth/fetchGetMe", async () => {
  const { data } = await axios.get("/me");

  return { data };
});

const initialState = {
  data: null,
  status: "loading",
  admin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.data = null;
      state.status = "loading";
      state.admin = false;
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.status = "loaded";
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;

      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchGetMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchGetMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchGetMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut } = authSlice.actions;

export default authSlice.reducer;
