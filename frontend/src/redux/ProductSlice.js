import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
  },
  reducers: {
    // --- Set All Products ---
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },

    // --- Add Single Product ---
    addProduct: (state, action) => {
      state.allProducts.push(action.payload);
    },

    // --- Remove Product by ID ---
    removeProduct: (state, action) => {
      state.allProducts = state.allProducts.filter(
        (product) => product._id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;

      state.allProducts = state.allProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },
  },
});

export const { setAllProducts, addProduct, removeProduct,updateProduct } = productSlice.actions;
export default productSlice.reducer;
