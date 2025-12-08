import React, { useEffect, useState } from "react";
import SideBar from "../Dashboard/SideBar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllOrders from "@/components/customHooks/useGetAllOrders";



const OrderListMain = () => {


    // SAFE DEFAULT VALUE
    const { allOrders = [] } = useSelector((store) => store.order);
    const navigate = useNavigate();
    const [filter, setFilter] = useState("Recent");
    const safeOrders = allOrders || [];
    const filteredOrders = safeOrders
        .filter((order) => {
            if (filter === "Recent") return true;
            return order.status === filter;
        })
        .sort((a, b) => {
            if (filter === "Recent") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            return 0;
        });
        useGetAllOrders();
    return (
        <div className="flex h-screen bg-gray-50">
            <SideBar />
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        {/* Header + Filters */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                            <h3 className="text-lg font-semibold text-gray-900">Orders</h3>

                            <div className="flex gap-2 flex-wrap">
                                {["Recent", "Delivered", "Pending", "Cancelled"].map(
                                    (status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilter(status)}
                                            className={`px-4 py-1 rounded-full text-sm font-medium transition
                                                 ${filter === status
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }
                                            `}
                                        >
                                            {status}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="overflow-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-sm text-gray-600 border-b">
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
                                    {filteredOrders.map((order, index) => (
                                        <tr
                                            key={order?._id}
                                            onClick={() =>
                                                navigate(`/dashboard/order-detail/${order?._id}`
                                                )
                                            }
                                            className="cursor-pointer border-b hover:bg-gray-50 text-sm"
                                        >
                                            <td className="py-3 px-2">{index + 1}</td>
                                            <td className="py-3 px-2">{order?._id}</td>
                                            <td className="py-3 px-2">
                                                {new Date(
                                                    order?.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-3 px-2">{order?.email}</td>
                                            <td className="py-3 px-2">{order?.method}</td>

                                            <td className="py-3 px-2">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-xs font-semibold
                                                         ${order.status === "Delivered"
                                                            ? "bg-green-600"
                                                            : ""
                                                        }
                                                         ${order.status === "Pending"
                                                            ? "bg-yellow-500 text-black"
                                                            : ""
                                                        }
                                                         ${order.status === "Cancelled"
                                                            ? "bg-red-600"
                                                            : ""
                                                        }
                                                    `}
                                                >
                                                    {order?.status}
                                                </span>
                                            </td>

                                            <td className="py-3 px-2 font-medium text-gray-700">
                                                {order?.totalAmount}
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredOrders.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center py-4 text-gray-500"
                                            >
                                                No orders found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderListMain;
