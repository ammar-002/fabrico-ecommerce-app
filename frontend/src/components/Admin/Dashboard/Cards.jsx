import React from "react";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { AiOutlineProduct } from "react-icons/ai";

const Cards = () => {
  const {allOrders} = useSelector(store=>store.order)
  const {allProducts}= useSelector(store=>store.products)
  // total Sales
  const safeOrders = allOrders || [];
  let totalSales = 0;
  safeOrders?.forEach((item) => {
    if (item?.status==="Delivered") {
      totalSales += item?.totalAmount || 0;
    }
});
  // Pending Orders
  let pending= 0;
  let cancelled= 0;
  let delievered= 0;
  safeOrders.forEach((item)=>{
    if (item?.status==="Pending") pending++;
    if (item?.status==="Cancelled") cancelled++;
    if (item?.status==="Delivered") delievered++;
    
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            {/* Total Sales */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-blue-500 p-3 rounded-xl shadow-md">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-blue-700 mb-1 uppercase tracking-wider">
                Total Sales
              </p>
              <p className="text-4xl font-bold text-gray-900">{totalSales} PKR</p>
            </div>

            {/* Total Products */}
            <div   className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-purple-500 p-3 rounded-xl shadow-md">
                  <AiOutlineProduct  className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-purple-700 mb-1 uppercase tracking-wider">
                Total Products
              </p>
              <p className="text-4xl font-bold text-purple-900">{allProducts.length}</p>
            </div>

            {/* Pending Orders */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-lg p-6 border border-yellow-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-yellow-500 p-3 rounded-xl shadow-md">
                  <Clock className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-yellow-700 mb-1 uppercase tracking-wider">
                Pending Orders
              </p>
              <p className="text-4xl font-bold text-gray-900">{pending}</p>
            </div>

            {/* Delivered Orders */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-green-500 p-3 rounded-xl shadow-md">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-green-700 mb-1 uppercase tracking-wider">
                Delivered Orders
              </p>
              <p className="text-4xl font-bold text-gray-900">{delievered}</p>
            </div>

            {/* Cancelled Orders */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg p-6 border border-red-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-red-500 p-3 rounded-xl shadow-md">
                  <XCircle className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-sm font-medium text-red-700 mb-1 uppercase tracking-wider">
                Cancelled Orders
              </p>
              <p className="text-4xl font-bold text-gray-900">{cancelled}</p>
            </div>
          </div>
  );
};

export default Cards;
