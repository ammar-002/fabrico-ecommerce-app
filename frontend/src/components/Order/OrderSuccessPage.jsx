import React, { use, useEffect } from "react";
import { CheckCircle, Mail, Home, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setIsOrderPlaced } from "@/redux/orderSlice";
import axios from "axios";
import { setCartItem } from "@/redux/CartSlice";
import { CART_API_END_POINT } from "@/lib/utils";

const OrderSuccessPage = () => {
  const { isOrderPlaced } = useSelector((state) => state.order);
  const dispatch = useDispatch();
   
  useEffect(() => {
    return () => {
      dispatch(setIsOrderPlaced(false));
    };
  }, []); 

  

  
  return (
    <>
      {isOrderPlaced ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-700">
            {/* Success Icon Section */}
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-8 text-center">
              <div className="inline-block transition-all duration-500">
                <CheckCircle
                  className="w-24 h-24 text-white mx-auto mb-4"
                  strokeWidth={2}
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-blue-50 text-lg">Thank you for your purchase</p>
            </div>


            {/* Footer */}
            <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex flex-col items-center gap-4">
              <p className="text-center text-gray-600 text-sm">
                Need help? Contact our support team at{" "}
                <span className="text-blue-600 font-semibold">
                  support@fabrico.com
                </span>
              </p>

              {/* Centered button */}
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Go to Products
              </Link>
            </div>

          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Home className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No Recent Order Found
            </h2>
            <p className="text-gray-500 mb-6">
              It seems you haven't placed an order yet.
            </p>
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Go to Products
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSuccessPage;