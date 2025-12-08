import { PRODUCTS_API_END_POINT } from "@/lib/utils";
import { setAllProducts } from "@/redux/ProductSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrFilter } from "@/redux/filterSlice";
import useGetAllProducts from "../customHooks/useGetAllProducts";
import Product from "./Product";

const ProductsDisplay = () => {
  const { currFilter } = useSelector((store) => store.filter);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((store) => store.products);

  let filteredProducts = Array.isArray(allProducts) ? [...allProducts] : [];
  filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (currFilter === "high-to-low") filteredProducts.sort((a, b) => b.price - a.price);
  else if (currFilter === "low-to-high") filteredProducts.sort((a, b) => a.price - b.price);
  else if (currFilter === "in-stock") filteredProducts = filteredProducts.filter((p) => p.stock > 0);
  else if (currFilter === "sold-out") filteredProducts = filteredProducts.filter((p) => p.stock < 1);
  else if (currFilter) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === currFilter.toLowerCase()
    );
  }

  useGetAllProducts();

  return (
    <div className="w-full md:w-13/16 min-h-[100vh] mb-3">
      <h2 className="text-3xl font-bold text-center mt-2 mb-10 text-blue-900 relative after:content-[''] after:block after:w-16 after:h-[3px] after:bg-blue-500 after:mx-auto after:mt-2">
        Our Collection
      </h2>

      {currFilter && (
        <h2 className="text-lg font-bold text-black text-center -mt-8 mb-7">
          <span className="text-blue-800 text-xl">Sorted/Filtered</span> ({currFilter})
          <span
            title="remove filter"
            onClick={() => dispatch(setCurrFilter(null))}
            className="ml-1 cursor-pointer rounded-md bg-red-500 px-2 py-0.5 text-sm font-semibold text-white transition-all hover:bg-red-600 active:scale-95"
          >
            ✕
          </span>
        </h2>
      )}

      {filteredProducts.length > 0 ? (
        <div className="products flex flex-wrap gap-6 justify-center md:ml-6">
          {filteredProducts.map((product, index) => (
           <Product  key={index} product = {product}/>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-xl font-semibold mt-20">
          No Products Found
        </div>
      )}
    </div>
  );
};

export default ProductsDisplay;
