import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ORDER_API_END_POINT } from "@/lib/utils";
import { setAllOrders } from "@/redux/orderSlice";

const useGetAllOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${ORDER_API_END_POINT}/get-all-orders`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllOrders(res.data.allOrders));
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, [ ]);
};

export default useGetAllOrders;
