import React, { useState } from "react";
import { IoClose, IoFilter } from "react-icons/io5";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setCurrFilter } from "@/redux/filterSlice";
import { Button } from "../ui/button";

const MobileFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currFilter = useSelector((store) => store.filter.currFilter);

  const handleChange = (value) => {
    dispatch(setCurrFilter(value));
  };

  // console.log("Current Filter:", currFilter);

  return (
    <>
      {isOpen ? (
        <div className="rounded-xl sm:hidden flex flex-col gap-1 absolute left-0 bg-blue-800 text-white p-2  w-full opacity-[0.9]">
          {/* Header */}
          <div className="flex gap-5 justify-center items-center">
            <div className="text-center font-bold border-b-2 text-2xl text-gray-300">
              Filter & Sort
            </div>
            <div
              onClick={() => setIsOpen(false)}
              className="p-2 text-md bg-gray-300 hover:bg-blue-900 hover:text-gray-300 text-blue-900 rounded-md cursor-pointer"
            >
              <IoClose className="font-bold text-lg" />
            </div>
          </div>

          {/* RadioGroup Section */}
          <div>
            <RadioGroup
              onValueChange={handleChange}
              value={currFilter}
              className="mt-1"
            >
              {/* Sort By Pricing */}
              <div className="mt-1 flex flex-col gap-2">
                <div className="font-semibold border-b border-blue-500 pb-1 text-blue-300"> By Pricing</div>

                <div className="flex items-center space-x-2 mt-1">
                  <RadioGroupItem value="high-to-low" id="high-to-low" className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"/>
                  <Label className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition" htmlFor="high-to-low">High to Low</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low-to-high" id="low-to-high" className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2" />
                  <Label htmlFor="low-to-high" className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition">Low to High</Label>
                </div>
              </div>

              {/* Sort By Stock */}
              <div className="mt-1 flex flex-col gap-2">
                <div className="font-semibold border-b border-blue-500 pb-1 text-blue-300">By Stock</div>

                <div className="flex items-center space-x-2 mt-1">
                  <RadioGroupItem value="in-stock" id="in-stock" className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2"/>
                  <Label htmlFor="in-stock" className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition">In Stock</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sold-out" id="sold-out" className="data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700 data-[state=checked]:text-blue-700 data-[state=unchecked]:border-blue-500 data-[state=unchecked]:border-2" />
                  <Label htmlFor="sold-out" className="text-blue-300 text-sm md:text-md cursor-pointer hover:text-white transition">Sold Out</Label>
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="font-semibold border-b border-blue-500 pb-1 text-blue-300">
                  By Category
                </div>

                {["T-Shirt", "Trouser", "Jeans", "Shirt", "Jacket"].map(
                  (cat) => {
                    const value = cat.toLowerCase().replace(" ", "-"); // t-shirts -> t-shirts, trousers -> trousers
                    return (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          onClick={() => dispatch(setCurrFilter(value))}
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
            {/* <Button onClick={()=>dispatch(setCurrFilter(null))} className={"bg-red-400 text-black z-10 mt-2 ml-1 cursor-pointer"}>Clear Filter</Button> */}
          </div>
        </div>
      ) : null}

      {/* ✅ Filter Icon Button (Visible when closed) */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="p-2 absolute right-2 mt-1 bg-blue-800 rounded-sm flex gap-2 items-center cursor-pointer sm:hidden"
        >
          <IoFilter className="text-white" />
        </div>
      )}
    </>
  );
};

export default MobileFilter;
