import React, { useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";

interface OrderProps {
  id: number;
  name: string;
  customer: string;
  quantity: number;
  date: string;
  status: string;
}

const Orders = () => {
  const [orders, setOrders] = React.useState<OrderProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      axios.get("http://localhost:3500/orders").then((res) => {
        console.log(res.data);
        setOrders(res.data);
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      {orders.map((order) => {
        return (
          <div key={order?.id} className="flex ">
            <p>{order?.name}</p>
            <p>{order?.customer}</p>
            <p>{order?.quantity}</p>
            <p>{order?.date}</p>
            <p>{order?.status}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
