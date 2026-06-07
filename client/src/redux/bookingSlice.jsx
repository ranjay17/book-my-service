import {createSlice} from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        booking: []
    },
    reducers:{
        addBooking: (state, action) =>{
            state.booking.push(action.payload)
        },
        cancelBooking: (state, action) =>{
            state.booking = state.booking.filter((b)=>b.id != action.payload)
        }
    }
})

export const{addBooking, cancelBooking} = bookingSlice.actions;
export default bookingSlice.reducer;