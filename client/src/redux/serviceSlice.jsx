import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    service: [],
    searchText: "",
  },
  reducers: {
    addService: (state, action) => {
      state.service.push(action.payload);
    },

    getAllService: (state, action) => {
      state.service = action.payload;
    },

    updateService: (state, action) => {
      state.service = state.service.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    removeService: (state, action) => {
      state.service = state.service.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
});

export const {
  addService,
  getAllService,
  updateService,
  removeService,
  setSearchText,
} = serviceSlice.actions;
export default serviceSlice.reducer;
