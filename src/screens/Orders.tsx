import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PaginatedData from "../components/Pagination";
import { useFetch } from "../hooks/useFetch";

export interface OrderProps {
  id: number;
  productName: string;
  customerName: string;
  quantity: number;
  date: string;
  status: string;
}

const Orders = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const orders = useSelector((state: any) => state?.orders?.Orders);

  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>([]);
  const [filterMethod, setFilterMethod] = useState<string>("date");
  const [filterValue, setFilterValue] = useState<string>("");
  const ordersApi = process.env.REACT_APP_ORDERS_API as string;
  useFetch(ordersApi);

  const columns = [
    {
      header: "ID",
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

  return (
    <div className="w-full p-5">
      <div className="h-[80px] border-b-4 flex justify-between items-center">
        {/* Search box */}
        <div className="relative w-[400px]">
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
        <div className="flex justify-between items-center w-full max-w-[600px] p-4">
          {/* Filter method */}
          <div className="flex flex-col text-[12px]">
            <label>Filter By: </label>
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
            <label>
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
              className="w-[300px] p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 outline-none"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-200px)] overflow-auto">
        <table className="w-full text-center table-fixed">
          <thead>
            <tr className="rounded-md shadow-md h-[40px]">
              {columns?.map((column) => {
                return <th key={column?.header}>{column?.header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {/* {formattedData?.map((order) => {
              return (
                <tr
                  key={order?.id}
                  className="text-[12px] font-semibold rounded-md shadow-md h-[60px] hover:scale-[1.02] even:bg-[#dedede] cursor-pointer"
                >
                  <td>{order?.id}</td>
                  <td>{order?.date}</td>
                  <td>{order?.productName}</td>
                  <td>{order?.customerName}</td>
                  <td className="h-[60px] flex justify-center items-center">
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
              );
            })} */}
            <PaginatedData<OrderProps>
              itemsPerPage={10}
              items={formattedData}
              renderItem={(order: OrderProps) => {
                return (
                  <tr
                    key={order?.id}
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
                );
              }}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
