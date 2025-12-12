import { CART_API_END_POINT } from '@/lib/utils';
import { setCartItem } from '@/redux/CartSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllCartItems = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await axios.get(`${CART_API_END_POINT}/get-cart-items`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCartItem(res.data.cartItems));
                   
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCartItems();
    }, []);
    
}

export default useGetAllCartItems;