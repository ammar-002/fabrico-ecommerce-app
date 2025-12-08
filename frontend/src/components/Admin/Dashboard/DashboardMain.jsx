import React, { useEffect } from 'react';
import SideBar from './SideBar';
 
import Cards from './Cards';
import Recent from './RecentOrders';
import { ORDER_API_END_POINT } from '@/lib/utils';
import axios from 'axios';
import { setAllOrders } from '@/redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
 
import OrdersBarChart from './OrdersBarChart';
import ProductPieChart from './ProductPieChart';
import useGetAllOrders from '@/components/customHooks/useGetAllOrders';
import useGetAllProducts from '@/components/customHooks/useGetAllProducts';

const DashboardMain = () => {
    const dispatch = useDispatch()
    const { allOrders } = useSelector(store => store.order)
     useGetAllOrders();
     useGetAllProducts();
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <SideBar />

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                 
                {/* Dashboard Content */}
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>

                        </div>
                    </div>
                    <Cards />

                    {/*  Graphs */}
                    <div className='flex'>
                        <ProductPieChart />
                        <OrdersBarChart />
                    </div>



                    <Recent />

                </div>
            </div>
        </div>
    );
};

export default DashboardMain;