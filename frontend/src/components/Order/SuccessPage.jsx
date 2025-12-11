import React, { use, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { CART_API_END_POINT, ORDER_API_END_POINT } from '@/lib/utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setTempOrder } from '@/redux/tempSlice';
import { setCartItem } from '@/redux/CartSlice';
import { toast } from 'react-toastify';

const SuccessPage = () => {
    const { tempOrder } = useSelector((state) => state.tempOrder);
    const params = useParams();
    const sessionId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getSessionId = async () => {
        try {
            const res = await axios.get(`${ORDER_API_END_POINT}/get-session/${sessionId}`, { withCredentials: true });
            if (res.data.session.payment_status === "paid" && tempOrder) {
                const res = await axios.post(`${ORDER_API_END_POINT}/place-order`, {
                    products: tempOrder.products,
                    address: tempOrder.address,
                    method: tempOrder.method,
                    totalAmount: tempOrder.totalAmount,
                    email: tempOrder.email,
                    phoneNumber: tempOrder.phoneNumber
                }, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setTempOrder(null));
                    // Clear the cart after successful order placement
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
                    toast.success(res.data.message);
                }
            }
            else {
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getSessionId();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-blue-100 rounded-full p-4">
                        <CheckCircle className="w-16 h-16 text-blue-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Payment Successful!
                </h1>

                <p className="text-gray-600 mb-8">
                    Your Order Has Been Successfully Placed.
                </p>
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
    )
}

export default SuccessPage;
