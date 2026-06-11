import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import userReducer from "./userSlice";
import serviceReducer from './serviceSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    service: serviceReducer,
    booking: bookingReducer,
  },
});

export default appStore;