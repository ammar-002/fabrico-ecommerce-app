import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
    name:"currFilter",
    initialState:{

        currFilter:null,
    },
    reducers:{
        setCurrFilter:(state,action)=>{
            state.currFilter = action.payload;
        }
    }
})

export const {setCurrFilter} = filterSlice.actions;
export default filterSlice.reducer