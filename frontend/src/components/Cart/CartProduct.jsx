import React from "react";
import { CART_API_END_POINT } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { removeCartItemFromStore } from "@/redux/CartSlice";
import axios from "axios";
import { Trash2, Tag, Package } from "lucide-react";
import { toast } from "react-toastify";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  
  const removeHandle = async () => {
    try {
      const res = await axios.delete(`${CART_API_END_POINT}/remove-cart-item/${product._id}`, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(removeCartItemFromStore(product._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-md hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      {/* Remove Button - Top Right */}
      <button
        onClick={removeHandle}
        className="absolute top-3 right-3 z-10 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
        title="Remove from cart"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="w-full sm:w-32 h-32 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm">
            <img
              src={product?.productId?.image}
              alt={product?.productId?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Quantity Badge on Image */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
            {product?.quantity}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Title & Category */}
          <div className="space-y-2">
            <h2 className="font-bold text-lg sm:text-xl text-slate-900 leading-tight line-clamp-2">
              {product?.productId?.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Category Tag */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                <Tag size={12} />
                {product?.productId?.category}
              </div>
              
              {/* Size Tag */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium">
                <Package size={12} />
                Size {product?.selectedSize}
              </div>
            </div>
          </div>

          {/* Bottom Section: Quantity & Price */}
          <div className="flex items-end justify-between mt-4 pt-3 border-t border-slate-200">
            {/* Quantity Info */}
            <div className="space-y-0.5">
              <p className="text-xs text-slate-500 font-medium">Quantity</p>
              <p className="text-2xl font-bold text-slate-900">×{product?.quantity}</p>
            </div>

            {/* Price Info */}
            <div className="text-right space-y-0.5">
              <p className="text-xs text-slate-500 font-medium">
                {product?.productId?.price} PKR each
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {product?.productId?.price * product?.quantity} PKR
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
    </div>
  );
};

export default CartProduct;