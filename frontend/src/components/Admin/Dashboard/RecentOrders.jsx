import React from 'react'
import { MoreVertical, } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Recent = () => {
  const { allOrders } = useSelector(store => store.order)
  const safeOrders = allOrders || []
  const navigate = useNavigate()
 const recentOrders = [...safeOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);
  // console.log(recentOrders)
  return (

    <div className="  rounded-lg shadow-sm border border-gray-200 p-2">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600 border-b text-left ">
              <th className="py-3 px-2">S.No</th>
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Customer Email</th>
              <th className="py-3 px-2">Method</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length > 0 ? recentOrders.map((order, index) => (
              <tr key={order?._id} onClick={() => navigate(`/dashboard/order-detail/${order?._id}`)} className="cursor-pointer border-b hover:bg-gray-50 text-sm">
                {/* Serial Number */}
                <td className="py-3 px-2">{index + 1}</td>
                <td className="py-3 px-2">{order?._id}</td>
                <td className="py-3 px-2">
                  {new Date(
                    order?.createdAt
                  ).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">{order?.email}</td>

                {/* Customer */}
                <td className="py-3 px-2 flex items-center gap-2">
                  {order?.method}
                </td>
                <td className="px-2 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold
      ${order.status === "Delivered" ? "bg-green-600" : ""}
      ${order.status === "Pending" ? "bg-yellow-500 text-black" : ""}
      ${order.status === "Cancelled" ? "bg-red-600" : ""}
    `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-3 px-2 font-medium text-gray-700">{order?.totalAmount}</td>
              </tr>
            )) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center font-semibold text-gray-600 text-lg"
                >
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Recent
