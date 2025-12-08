import { createSlice } from "@reduxjs/toolkit";
const UserSlice = createSlice({
    name:"user",
    initialState:{
        User:null
    },
    reducers:{
        setCurrUser:(state,action)=>{
            state.User = action.payload;
        }
    }
})

export const {setCurrUser} = UserSlice.actions;
export default UserSlice.reducer