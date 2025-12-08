import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    allOrders: [],
    isOrderPlaced: false

  },
  reducers: {
    setAllOrders: (state, action) => {
      state.allOrders = action.payload
    },
    addAnOrder: (state, action) => {
        if (!state.allOrders) state.allOrders = [];
      state.allOrders.push(action.payload);
    },
    removeAnOrder: (state, action) => {
      state.allOrders = state.allOrders.filter(
        (item) => item._id !== action.payload
      );
    },
    setIsOrderPlaced: (state, action) => {
      state.isOrderPlaced = action.payload
    },
    setOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.allOrders.find(o => o._id === id);
      if (order) {
        order.status = status;
      }
    }


  }

})
export const { setAllOrders, addAnOrder, removeAnOrder, setIsOrderPlaced,setOrderStatus } = orderSlice.actions;
export default orderSlice.reducer