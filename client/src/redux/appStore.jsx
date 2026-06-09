import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});

export default appStore;