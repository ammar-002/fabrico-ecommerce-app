import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { setCurrFilter } from "@/redux/filterSlice";
import { Button } from "../ui/button";

const ProductsFilter = () => {
  const { currFilter } = useSelector((store) => store.filter);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(setCurrFilter(value));
  };
  // console.log(currFilter)
  return (
    <div className="w-1/3 mt-0.5   rounded-r-2xl shadow-md shadow-blue-500   hidden sm:block md:w-3/16 bg-blue-900 overflow-auto ">
      <div className=" w-fit filters flex flex-col ml-2 mt-2 gap-2  text-sm md:text-lg text-white">
        <div className="text-center mt-3 ml-2 font-bold text-white text-2xl">
          Filter & Sort
        </div>
        <div>
          <RadioGroup
          value={currFilter}
            onValueChange={handleChange}
            className="mt-3"
          >
            {/* Pricing Options */}
            <div className="mt-1 flex flex-col gap-1">
              <div className="font-semibold border-b border-blue-500 pb-1 text-blue-300">
                Sort By Pricing
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <RadioGroupItem
                  value="high-to-low"
                  id="high-to-low"
                  className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"
                />
                <Label
                  className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition"
                  htmlFor="high-to-low"
                >
                  High to Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="low-to-high"
                  id="low-to-high"
                  className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"
                />
                <Label
                  className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition"
                  htmlFor="low-to-high"
                >
                  Low to High
                </Label>
              </div>
            </div>

            {/* Stock Options */}
            <div className="mt-1 flex flex-col gap-1">
              <div className="font-semibold border-b border-blue-500 pb-1 text-blue-300">
                Sort By Stock
              </div>

              <div className="flex items-center space-x-2 mt-1">
                <RadioGroupItem
                  value="in-stock"
                  id="in-stock"
                  className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"
                />
                <Label className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition" htmlFor="in-stock">
                  In Stock
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="sold-out"
                  id="sold-out"
                  className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"
                />
                <Label className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition" htmlFor="sold-out">
                  Sold Out
                </Label>
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="font-semibold border-b border-blue-500 pb-1 text-blue-300">
                Category
              </div>

              {["T-Shirt","Trouser","Jeans", "Shirt", "Jacket"].map(
                (cat) => {
                  const value = cat.toLowerCase().replace(" ", "-"); // t-shirts -> t-shirts, trousers -> trousers
                  return (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem
                        onClick ={()=>dispatch(setCurrFilter(value))}
                        value={value}
                        id={value}
                        className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"
                      />
                      <Label
                        htmlFor={value}
                        className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition"
                      >
                        {cat}
                      </Label>
                    </div>
                  );
                }
              )}
            </div>
          </RadioGroup>
          <Button
            onClick={() => dispatch(setCurrFilter(null))}
            className="bg-white text-blue-900 font-semibold cursor-pointer hover:bg-blue-800 hover:text-white transition-all duration-300 shadow-md rounded-full mt-4"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
