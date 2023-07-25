import React from "react";
import { useFetchOrder } from "../hooks/useFetchOrder";
export interface OrderProps {
  id: number;
  name: string;
  customer: string;
  quantity: number;
  date: string;
  status: string;
}

const Order = (orderId: any) => {
  const ordersApi = process.env.REACT_APP_ORDER_API as string;
  const { data } = useFetchOrder(`${ordersApi}${orderId?.orderId}`);
  console.log(data);

  return (
    <div className="w-[500px] h-[400px] bg-white flex items-center justify-center rounded-md shadow-lg">
      {data?.map((order: any) => {
        return (
          <div key={order?.id} className="flex flex-col gap-4">
            <div>
              <h1 className="text-2xl font-bold">ORDER DETAILS</h1>
            </div>
            <div className="flex flex-col items-start">
              <p>
                {" "}
                <span className="text-xl font-semibold">
                  Product Name:
                </span>{" "}
                {order?.productName}
              </p>
              <p>
                <span className="text-xl font-semibold">Customer Name:</span>{" "}
                {order?.customerName}
              </p>
              <p>
                <span className="text-xl font-semibold">Order Qty:</span>{" "}
                {order?.quantity}
              </p>
              <p>
                <span className="text-xl font-semibold">Order Date:</span>{" "}
                {order?.date}
              </p>
              <p>
                <span className="text-xl font-semibold">Order Status:</span>{" "}
                {order?.status.slice(0, 1).toUpperCase() +
                  order?.status.slice(1)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
