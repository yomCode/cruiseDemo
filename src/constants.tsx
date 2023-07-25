import { useSelector } from "react-redux";

import { AiOutlineDashboard } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

export const DashboardMenu = () => {
  const orders = useSelector((state: any) => state?.orders?.Orders);

  return [
    {
      name: "Dashboard",
      icon: <AiOutlineDashboard size={30} />,
      data: "",
      path: "/home",
    },
    {
      name: "Orders",
      icon: <FaClipboardList size={30} />,
      data: orders?.length,
      path: "/orders",
    },
    {
      name: "Transactions",
      icon: <AiOutlineTransaction size={30} />,
      data: 5,
      path: "/transactions",
    },
    {
      name: "Settings",
      icon: <FiSettings size={30} />,
      data: "",
      path: "/settings",
    },
  ];
};
