import { createSlice } from "@reduxjs/toolkit";
const tempSlice = createSlice({
    name: "tempOrder",
    initialState: {
        tempOrder: null,
    },
    reducers: {
        setTempOrder: ((state, action) => {
            state.tempOrder = action.payload;
        })
    }
})
export const { setTempOrder } = tempSlice.actions;
export default tempSlice.reducer;