import React, { useEffect, useState } from "react";
import { Package, User, MapPin, CreditCard, Clock, Phone, Mail, CheckCircle, TrendingUp } from "lucide-react";
import SideBar from "../Dashboard/SideBar";

import { useParams } from "react-router-dom";
import axios from "axios";
import { ORDER_API_END_POINT } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { setOrderStatus } from "@/redux/orderSlice";

const OrderDetails = () => {
  const dispatch = useDispatch()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState("Pending")
  const readableDate = new Date(order?.createdAt).toLocaleString();
  const param = useParams()
  const id = param.id
  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${ORDER_API_END_POINT}/get-order/${id}`, { withCredentials: true })
      if (res.data.success) {
        setOrder(res.data.order)

      }
    } catch (error) {
      console.log(error)

    }
  }
  const changeStatus = async (e) => {
    const newStatus = e.target.value
    setStatus(newStatus)

    try {
      const res = await axios.post(`${ORDER_API_END_POINT}/update-status/${order?._id}`, { updateOrderdStatus: newStatus }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })

      if (res.data.success) {
        dispatch(setOrderStatus({ id: order._id, status: newStatus }));
        // update local state as well
        setOrder(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.log(error)

    }
  }
  // console.log(status)

  const statusColors = {
    Pending: "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-300",
    Processing: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-300",
    Delivered: "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-300",
    Cancelled: "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-300"
  };

  useEffect(() => {
    fetchOrder()
  }, [])

  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SideBar />

      {
        order ? <div className="flex-1">

          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Order Details</h1>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    <span className="text-gray-700">Order ID:</span> 
                    <span className="ml-2 px-3 py-1 bg-gray-100 rounded-lg text-xs font-mono">{order?._id}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex gap-4 flex-wrap">
                  <span className="flex font-semibold items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                    <Clock className="w-4 h-4 text-blue-500" />
                    {readableDate}
                  </span>
                  <span className={`border-2 px-5 py-2 rounded-xl font-bold text-sm shadow-sm ${statusColors[order?.status]}`}>
                    {order?.status}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    Change Order Status
                  </label>

                  <select
                    value={order?.status}
                    onChange={changeStatus}
                    className="w-52 px-4 py-3 rounded-xl border-2 border-gray-200 bg-white font-semibold text-gray-700 shadow-sm hover:border-purple-400 transition-all focus:ring-2 focus:ring-purple-300 focus:outline-none cursor-pointer"
                  >
                    <option value="Delivered" className="text-emerald-600 font-semibold">
                      ✔ Delivered
                    </option>
                    <option value="Cancelled" className="text-red-600 font-semibold">
                      ✘ Cancelled
                    </option>
                    <option value="Pending" className="text-amber-600 font-semibold">
                      ⏳ Pending
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Customer Info */}
              <div className="bg-white/90 backdrop-blur-sm p-7 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="font-bold text-lg text-gray-900">Customer</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm bg-gray-50 p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 font-medium">{order?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm bg-gray-50 p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 font-medium">{order?.phoneNumber}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white/90 backdrop-blur-sm p-7 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="font-bold text-lg text-gray-900">Payment</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                    <span className="text-sm text-gray-600 font-semibold">Method</span>
                    <span className="text-sm font-bold text-purple-700 px-3 py-1 bg-white rounded-lg">{order?.method}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-white/90 backdrop-blur-sm p-7 rounded-3xl shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="font-bold text-lg text-gray-900">Delivery</h2>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl font-medium">{order?.address}</p>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 overflow-hidden mb-8">
              <div className="p-7 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Package className="w-6 h-6 text-purple-600" />
                  Order Items
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-8 py-5 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-8 py-5 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {order?.products?.map((item) => (
                      <tr key={item._id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
                              <img src={item?.productId?.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-bold text-gray-900 text-base">
                              {item?.productId?.title || "Product"}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 text-sm font-bold rounded-xl shadow-sm">
                            ×{item.quantity}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right text-gray-900 font-bold text-lg">
                          Rs {item?.productId?.price || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Card */}
            <div className="flex justify-end mt-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 w-full md:w-96 p-8">

                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                  </div>
                  Payment Summary
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between text-base bg-gray-50 p-4 rounded-xl">
                    <span className="text-gray-600 font-semibold">Subtotal</span>
                    <span className="font-bold text-gray-900">Rs {order?.totalAmount}</span>
                  </div>

                  <div className="flex justify-between text-base bg-gray-50 p-4 rounded-xl">
                    <span className="text-gray-600 font-semibold">Tax</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Included
                    </span>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6 mt-6 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-2xl">
                    <span className="text-xl font-bold text-gray-900">Grand Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Rs {order?.totalAmount}
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div> :
          <div className="flex-1 p-10 animate-pulse">
            <div className="h-12 w-72 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl mb-8"></div>

            <div className="space-y-6">
              <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl"></div>
              <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl"></div>
              <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl"></div>
            </div>
          </div>

      }
    </div>
  );
};

export default OrderDetails;