import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";

const appStore = configureStore({
    reducer: bookingReducer
})

export default appStore;