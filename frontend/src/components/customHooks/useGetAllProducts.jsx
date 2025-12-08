import React, { use, useEffect } from 'react'
import { PRODUCTS_API_END_POINT } from '@/lib/utils';
import axios from 'axios';
import { setAllProducts } from '@/redux/ProductSlice';
import { useDispatch } from 'react-redux';


const useGetAllProducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    `${PRODUCTS_API_END_POINT}/get-all-products`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    dispatch(setAllProducts(res.data.products));
                } else {
                    dispatch(setAllProducts([])); // empty array if no products
                }
            } catch (error) {
                console.log(error);
                dispatch(setAllProducts([]));
            }
        };
        fetchProducts();
    }, []);
}

export default useGetAllProducts