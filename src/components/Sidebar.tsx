import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const [active, setActive] = React.useState<String>("dashboard");
  const [openMenuPan, setOpenMenuPan] = React.useState<Boolean>(true);

  const dashboardMenu = [
    {
      name: "Dashboard",
      icon: <AiOutlineDashboard size={30} />,
      data: "",
    },
    {
      name: "Orders",
      icon: <FaClipboardList size={30} />,
      data: 5,
    },
    {
      name: "Transactions",
      icon: <AiOutlineTransaction size={30} />,
      data: 5,
    },
    {
      name: "Settings",
      icon: <FiSettings size={30} />,
      data: "",
    },
  ];

  return (
    <div>
      {/* Main container */}
      <div
        className={`h-screen ${
          openMenuPan ? "w-[250px]" : "w-[60px]"
        } bg-pinky py-8 flex flex-col justify-between ease-in-out transition-all duration-500`}
      >
        {/* Avatar and menu container */}
        <div
          className={`w-full flex justify-between items-center ${
            openMenuPan ? "px-8" : "px-4"
          } `}
        >
          {openMenuPan && <p className="text-white text-4xl">ME</p>}
          {openMenuPan ? (
            <AiOutlineMenuUnfold
              size={25}
              color="white"
              onClick={() => setOpenMenuPan(!openMenuPan)}
              className="cursor-pointer"
            />
          ) : (
            <AiOutlineMenuFold
              size={25}
              color="white"
              onClick={() => setOpenMenuPan(!openMenuPan)}
              className="cursor-pointer"
            />
          )}
        </div>
        {/* dashboard menu items */}
        <div className="w-full basis-2/3">
          <ul
            className={`flex flex-col text-white text-[14px] font-bold ${
              openMenuPan ? "pl-4" : ""
            } cursor-pointer`}
          >
            {dashboardMenu?.map((item) => (
              <li
                onClick={() => setActive(item?.name.toLowerCase())}
                className={`h-[60px] flex items-center space-x-2 justify-between  ${
                  openMenuPan ? " pl-4 pr-8" : "px-4"
                } ${
                  item?.name.toLowerCase() === active
                    ? "bg-[#F9F9F9] text-pinky rounded-l-full"
                    : ""
                } ease-in-out transition-all duration-500`}
              >
                <div className="flex justify-center items-center gap-3">
                  <p>{item.icon}</p>
                  {openMenuPan && <p>{item.name}</p>}
                </div>
                {openMenuPan && <p>{item?.data}</p>}
              </li>
            ))}
          </ul>
        </div>
        {/* logout */}
        <div
          className={`flex justify-between items-center text-white text-[14px] font-bold cursor-pointer ${
            openMenuPan ? "px-8" : "px-4"
          }`}
        >
          {openMenuPan && <p>Logout</p>}
          <BiLogOut size={30} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
