import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "./CartProduct";
import PaymentSummary from "./PaymentSummary";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../Shared/Footer";
import axios from "axios";
import { CART_API_END_POINT } from "@/lib/utils";
import { setCartItem } from "@/redux/CartSlice";
import Navbar from "../Shared/Navbar";
import { Button } from "../ui/button";
import useGetAllCartItems from "../customHooks/useGetAllCartItems";

const CartsMain = () => {
  const dispatch = useDispatch();
  useGetAllCartItems()
  const { cartItems } = useSelector((store) => store.cart);
  
  return (
    <>
      <Navbar />
      <div>
        <div className="md:w-[80vw] pt-20 text-center mx-auto mb-3  ">
          {/* <Link
            to={"/"}
            className="  hover:bg-blue-400  cursor-pointer text-xl ml-3 text-white bg-blue-800 p-2 rounded-full inline-block"
          >
            <FaHome />
          </Link> */}
          <h1 className="font-bold justify-center mx-auto bg text-3xl mt-2  ml-5 mb-5 text-blue-900 flex items-center gap-2">
            Your Basket <FaCartShopping className="" />
          </h1>

          <div className="main flex flex-wrap gap-3 justify-between  ">
            {cartItems?.length < 1 ? (
              <div className="flex flex-col items-center justify-center text-center mx-auto my-20 space-y-6 p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.9-.55L21 13M7 13l-4-8m0 0L3 3m18 0l-1.5 3"
                    />
                  </svg>
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-extrabold text-gray-700">
                  Your Cart is Empty
                </h2>

                {/* Subtext */}
                <p className="text-gray-500 text-lg">
                  Looks like you haven’t added anything yet. Start shopping to
                  fill your cart!
                </p>

                {/* Button */}
                <Link
                  to={"/products"}
                  className="mt-4 inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="basket-items w-[60%] flex flex-col gap-3 mx-auto">
                {cartItems?.map((item, index) => (
                  <CartProduct key={index} product={item} />
                ))}
              </div>
            )}
            {cartItems?.length > 0 && (
              <div className="checkout mx-auto">
                <PaymentSummary />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartsMain;
