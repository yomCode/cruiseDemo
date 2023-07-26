import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaginatedData from "../components/Pagination";
import { useFetchOrders } from "../hooks/useFetchOrders";

import Order from "../components/Order";

export interface OrderProps {
  id: number;
  productName: string;
  customerName: string;
  quantity: number;
  date: string;
  status: string;
}

const Orders = () => {
  const orders = useSelector((state: any) => state?.orders?.Orders);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>([]);
  const [filterMethod, setFilterMethod] = useState<string>("date");
  const [filterValue, setFilterValue] = useState<string>("");
  const [clickedOrderId, setClickedOrderId] = useState<number>(0);
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);

  const ordersApi = process.env.REACT_APP_ORDERS_API as string;
  useFetchOrders(ordersApi);

  const columns = [
    {
      header: "Order ID",
    },
    {
      header: "Date",
    },
    {
      header: "Product",
    },
    {
      header: "Customer",
    },
    {
      header: "Status",
    },
  ];

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const formattedData =
    searchValue === ""
      ? filteredOrders
      : filteredOrders?.filter((order) => {
          return (
            order?.id?.toString().includes(searchValue) ||
            order?.productName?.toLowerCase().includes(searchValue) ||
            order?.customerName?.toLowerCase().includes(searchValue) ||
            order?.status?.toLowerCase().includes(searchValue)
          );
        });

  useEffect(() => {
    const filtered: OrderProps[] = orders?.filter((order: any) => {
      if (filterMethod === "date") {
        return order?.date?.includes(filterValue);
      } else if (filterMethod === "customer") {
        return order?.customerName
          ?.toLowerCase()
          ?.includes(filterValue?.toLowerCase());
      } else if (filterMethod === "status") {
        return order?.status
          ?.toLowerCase()
          ?.includes(filterValue?.toLowerCase());
      }
      return true;
    });
    setFilteredOrders(filtered);
  }, [orders, filterMethod, filterValue]);

  const handleClickOrder = (orderId: number) => {
    setClickedOrderId(orderId);
    setShowOrderDetails(!showOrderDetails);
  };

  return (
    <div className="w-full p-5">
      <div className="border-b-4 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center p-4 gap-2">
        {/* Search box */}
        <div className="relative max-w-[400px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="searchInput"
            onChange={onSearchInputChange}
            className="w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 outline-none"
            placeholder="Search Customer, Product, Status..."
            required
          />
        </div>
        <div className="flex justify-start items-center max-w-[600px] gap-8">
          {/* Filter method */}
          <div className="flex flex-col text-[12px]">
            <label className="font-bold">Filter By: </label>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 outline-none"
            >
              <option value="date">Date</option>
              <option value="customer">Customer</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="flex flex-col text-[12px]">
            <label className="font-bold">
              {filterMethod === "customer"
                ? "Customer"
                : filterMethod === "status"
                ? "Status"
                : "Date"}
              :
            </label>
            <input
              type="search"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="max-w-[300px] p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 outline-none"
            />
          </div>
        </div>
      </div>
      <div
        className={`hidden md:block w-full h-[calc(100vh-200px)] overflow-auto`}
      >
        <table className="w-full text-center table-fixed">
          <thead>
            <tr className="rounded-md shadow-md h-[40px]">
              {columns?.map((column) => {
                return <th key={column?.header}>{column?.header}</th>;
              })}
            </tr>
          </thead>
          <tbody className="relative">
            <PaginatedData<OrderProps>
              itemsPerPage={10}
              items={formattedData}
              renderItem={(order: OrderProps) => {
                return (
                  <>
                    <tr
                      key={order?.id}
                      onClick={() => handleClickOrder(order?.id)}
                      className="w-full text-[12px] font-semibold rounded-md shadow-md hover:scale-[1.02] even:bg-[#dedede] cursor-pointer"
                    >
                      <td>{order?.id}</td>
                      <td>{order?.date}</td>
                      <td>{order?.productName}</td>
                      <td>{order?.customerName}</td>
                      <td className="h-[50px] flex justify-center items-center">
                        <p
                          className={`${
                            order?.status === "pending"
                              ? "text-[red]"
                              : order?.status === "shipped"
                              ? "text-[purple]"
                              : order?.status === "delivered"
                              ? "text-[green]"
                              : ""
                          }`}
                        >
                          {order?.status}
                        </p>
                      </td>
                    </tr>
                    {showOrderDetails && (
                      <div className="w-full h-[calc(100vh-320px)] flex flex-col justify-center items-center bg-[#dbdbdb] absolute top-0 left-0 opacity-25">
                        <Order orderId={clickedOrderId} />
                        <button
                          onClick={() => setShowOrderDetails(!showOrderDetails)}
                          className="bg-pinky py-2 px-4 rounded-md text-white font-bold mt-4 hover:bg-[#f79cae]"
                        >
                          Close X
                        </button>
                      </div>
                    )}
                  </>
                );
              }}
            />
          </tbody>
        </table>
      </div>
      <div className="flex md:hidden flex-col gap-2 py-4">
        <PaginatedData<OrderProps>
          itemsPerPage={10}
          items={formattedData}
          renderItem={(order: OrderProps) => {
            return (
              <>
                <div className="w-full h-[80px] flex flex-col justify-between text-[12px] font-bold bg-gray-200 rounded-md p-2 shadow-md even:bg-white divide-y-2 divide-pinky">
                  <div className="flex justify-between">
                    <p>
                      <span className="text-gray-600">Order ID:</span>{" "}
                      {order?.id}
                    </p>
                    <p>
                      <span className="text-gray-600">Date:</span> {order?.date}
                    </p>
                    <p
                      className={`${
                        order?.status === "pending"
                          ? "text-[red]"
                          : order?.status === "shipped"
                          ? "text-[purple]"
                          : order?.status === "delivered"
                          ? "text-[green]"
                          : ""
                      }`}
                    >
                      <span className="text-gray-600">Status:</span>{" "}
                      {order?.status?.slice(0, 1).toUpperCase() +
                        order?.status?.slice(1).toLowerCase()}
                    </p>
                  </div>
                  <div className="basis-2 flex flex-col justify-between">
                    <p>
                      <span className="text-gray-600">Product: </span>
                      {order?.productName}
                    </p>
                    <p>
                      <span className="text-gray-600">Customer: </span>
                      {order?.customerName}
                    </p>
                  </div>
                </div>
                {showOrderDetails && (
                  <div className="w-full h-[calc(100vh-320px)] flex flex-col justify-center items-center bg-[#dbdbdb] absolute top-0 left-0 opacity-25">
                    <Order orderId={clickedOrderId} />
                    <button
                      onClick={() => setShowOrderDetails(!showOrderDetails)}
                      className="bg-pinky py-2 px-4 rounded-md text-white font-bold mt-4 hover:bg-[#f79cae]"
                    >
                      Close X
                    </button>
                  </div>
                )}
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Orders;
