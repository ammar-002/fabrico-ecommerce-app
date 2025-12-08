
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CreditCard, Package, Truck, Mail, Phone, ShoppingBag, CheckCircle } from "lucide-react";
import Navbar from "../Shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CART_API_END_POINT, ORDER_API_END_POINT, PRODUCTS_API_END_POINT } from "@/lib/utils";
import { addAnOrder, setIsOrderPlaced } from "@/redux/orderSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { setCartItem } from "@/redux/CartSlice";
import { setTempOrder } from "@/redux/tempSlice";
import { toast } from "react-toastify";

const PlaceOrderMain = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((store) => store.cart);
  const { User } = useSelector((store) => store.user);


  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.productId.price,
    0
  );

  let products = cartItems.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  }));
  const delCharges = 150;
  const [input, setInput] = useState({
    products: products,
    address: "",
    method: "COD",
    email: User?.email || "",
    phoneNumber: User?.phoneNumber || "",
    totalAmount: totalAmount + delCharges,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  console.log(input.products);
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      if (input?.method === "COD") {
        const res = await axios.post(
          `${ORDER_API_END_POINT}/place-order`,
          input,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(addAnOrder(res.data.order));
          toast.success(res.data.message);
          dispatch(setCartItem([]));
          dispatch(setIsOrderPlaced(true));
          navigate("/check-out-now/success");
          try {
            for (let item of cartItems) {
              const newStock = item.productId.stock - item.quantity;

              await axios.post(
                `${PRODUCTS_API_END_POINT}/update-product-stock/${item.productId._id
}`,
                { newStock },
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              );
            };


          } catch (error) {
            console.log("Stock update error:", error);
          }
          try {
            await axios.delete(
              `${CART_API_END_POINT}/clear-cart`,
              { withCredentials: true }
            );
            if (res.data.success) {
              dispatch(setCartItem([]));
              console.log("Cart cleared after order placement");
            }
          } catch (error) {
            console.log("Cart clearing error:", error);
          }

        }
      }
      if (input?.method === "Online") {
        dispatch(setTempOrder(input));
        const products = cartItems;
        const res = await axios.post(
          `${ORDER_API_END_POINT}/create-checkout-session`,
          { products },
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true,
          }

        );

        if (res.data.success) {
          window.location.href = res.data.url;

        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2 pt-10">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <h1 className="text-4xl  font-bold text-slate-900">Complete Your Order</h1>
            </div>
            <p className="text-slate-600 ml-13">Just a few steps away from your purchase</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT: Details (3 columns) */}
            <div className="lg:col-span-3 space-y-5">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="text-blue-600" size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Contact Details</h2>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={input?.email}
                      onChange={changeHandler}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-slate-50"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={input?.phoneNumber}
                      onChange={changeHandler}
                      placeholder="+92 300 1234567"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all bg-slate-50"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-blue-600" size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Delivery Address</h2>
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea
                    name="address"
                    value={input?.address}
                    onChange={changeHandler}
                    rows={4}
                    placeholder="House #, Street, Area, City, Province"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all resize-none bg-slate-50"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-purple-600" size={18} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Payment Method</h2>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-purple-300 hover:bg-purple-50/50 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <input
                      type="radio"
                      name="method"
                      value="COD"
                      checked={input?.method === "COD"}
                      onChange={changeHandler}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Cash on Delivery</div>
                      <div className="text-sm text-slate-500">Pay when you receive</div>
                    </div>
                    <Package className="text-slate-400" size={20} />
                  </label>
                  <label className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-purple-300 hover:bg-purple-50/50 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <input
                      type="radio"
                      name="method"
                      value="Online"
                      checked={input?.method === "Online"}
                      onChange={changeHandler}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">Online Payment</div>
                      <div className="text-sm text-slate-500">Secure checkout</div>
                    </div>
                    <CreditCard className="text-slate-400" size={20} />
                  </label>
                </div>
              </div>
            </div>


            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-700">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Truck className="text-white" size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </div>

                {/* Cart Items */}
                <div className="max-h-56 overflow-y-auto mb-6 space-y-3 pr-2">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700"
                    >
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                        <img src={item.productId.image} alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white truncate text-sm">
                          {item.productId.title}
                        </div>
                        <div className="text-xs text-slate-400">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-blue-400">
                        {item.quantity * item.productId.price} PKR
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span className="font-medium">{totalAmount} PKR</span>
                  </div>
                  <div className="flex justify-between text-blue-400">
                    <span>Delivery Fee</span>
                    <span className="font-medium">150 PKR</span>
                  </div>
                  <div className="border-t border-slate-700 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-white">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {totalAmount + delCharges} PKR
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handlePlaceOrder}
                  disabled={
                    !input?.address ||
                    !input?.email ||
                    !input?.phoneNumber ||
                    cartItems.length === 0
                  }
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  {input?.method === "COD" ? "Place Order" : "Proceed to Pay"}
                </Button>
                <p className="text-xs text-slate-500 text-center mt-3">
                  By placing this order, you agree to our terms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderMain;