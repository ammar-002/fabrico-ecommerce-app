import React from "react";
import { ShoppingCart, Truck, Tag, ArrowRight, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PaymentSummary = () => {
  const { User } = useSelector((store) => store.user);
 
  const { cartItems } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  let totalPrice = 0;
  cartItems.forEach((element) => {
    totalPrice = totalPrice + element?.quantity * element?.productId?.price;
  });
  const subtotal = totalPrice;
  const delivery = 150;
  const total = subtotal + delivery;

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 shadow-xl rounded-3xl p-6 w-full max-w-sm h-fit sticky top-19 overflow-hidden">
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

      {/* Heading */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-slate-200">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
          <ShoppingCart className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Order Summary
        </h2>
      </div>

      {/* Price Details */}
      <div className="space-y-4 mb-5">
        {/* Subtotal */}
        <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
          <div className="flex items-center gap-2">
            <Tag className="text-slate-600" size={16} />
            <span className="font-medium text-slate-700">Subtotal</span>
          </div>
          <span className="font-bold text-slate-900">{subtotal} PKR</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
          <div className="flex items-center gap-2">
            <Truck className="text-slate-600" size={16} />
            <span className="font-medium text-slate-700">Delivery</span>
          </div>
          <span className="font-bold text-slate-900">{delivery} PKR</span>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-slate-300 my-3"></div>

        {/* Total */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
          <span className="text-lg font-bold text-slate-900">Total Amount</span>
          <span className="text-xl font-black text-blue-600">{total} PKR</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link to ={"/cart/products/check-out-now"}>
      <button 
        onClick={() => {
          navigate( "/cart/products/check-out-now" );
        }}
        className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer overflow-hidden">
        <span className="relative z-10 flex items-center justify-center gap-2">
          Proceed to Checkout
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </span>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
      </Link>

      {/* Additional Info */}
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-slate-500">
        <ShieldCheck size={14} className="text-blue-500" />
        <p className="text-center">
          Secure checkout • Terms & Conditions apply
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;