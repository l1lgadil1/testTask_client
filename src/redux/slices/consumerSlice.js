import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  data: null,
  status: "",
  purchases: [],
  consumerInfo: {
    name: "",
    adress: "",
    city: "",
    email: "",
    phone: "",
  },
};

export const createConsumer = createAsyncThunk(
  "consumer/createConsumer",
  async (params) => {
    const { data } = await axios.post("/consumer", params);
    return data;
  }
);
export const getConsumer = createAsyncThunk(
  "consumer/getConsumer",
  async (params) => {
    const { data } = await axios.get("/consumer/get", params);
    return data;
  }
);

export const updateConsumer = createAsyncThunk(
  "consumer/updateConsumer",
  async (params) => {
    const { data } = await axios.patch(`/admin/${params.id}`, params.data);
    return data;
  }
);

export const deleteConsumer = createAsyncThunk(
  "consumer/deleteConsumer",
  async (id) => {
    const { data } = await axios.delete(`/admin/${id}`);
    return data;
  }
);

export const getAllPurchases = createAsyncThunk(
  "consumer/getAllPurchases",
  async () => {
    const { data } = await axios.get("/consumer/getAll");
    return data;
  }
);

export const consumerSlice = createSlice({
  name: "consumer",
  initialState,
  reducers: {
    setConsumerInfo(state, action) {
      state.consumerInfo = action.payload;
    },
  },
  extraReducers: {
    [createConsumer.pending]: (state) => {
      state.data = null;
      state.status = "";
    },
    [createConsumer.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "В обработке";
    },
    [createConsumer.rejected]: (state) => {
      state.data = null;
      state.status = "";
    },
    // get all purchases
    [getAllPurchases.pending]: (state) => {
      state.purchases = null;
    },
    [getAllPurchases.pending]: (state, action) => {
      state.purchases = action.payload;
    },
    [getAllPurchases.rejected]: (state) => {
      state.purchases = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConsumerInfo } = consumerSlice.actions;

export default consumerSlice.reducer;
