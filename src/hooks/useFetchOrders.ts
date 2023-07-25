import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOrders } from "../store/OrderSlice";

export const useFetchOrders = (url: string) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        dispatch(setOrders(res.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch, url]);
};
