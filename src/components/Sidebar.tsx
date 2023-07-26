import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { DashboardMenu } from "../constants";

import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

type Tabs = "dashboard" | "orders" | "transactions" | "settings";

const Sidebar = () => {
  const [active, setActive] = React.useState<Tabs>("dashboard");
  const [openMenuPan, setOpenMenuPan] = React.useState<Boolean>(false);
  const path = useLocation()?.pathname.replaceAll("/", "");
  const formattedPathName = path === "home" ? "dashboard" : path?.toLowerCase();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setActive(formattedPathName as Tabs);
    // eslint-disable-next-line
  }, [path]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    // eslint-disable-next-line
  }, [windowWidth]);

  const handleDashboardMenuClick = () => {
    setOpenMenuPan(false);
    setActive(formattedPathName as Tabs);
  };

  return (
    <>
      <div className="hidden md:block">
        {/* Main container on Large screen*/}
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
            {openMenuPan && <p className="text-white text-4xl font-mono">C.</p>}
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
              {DashboardMenu()?.map((item) => (
                <Link key={item?.name.toLowerCase()} to={item?.path}>
                  <li
                    onClick={handleDashboardMenuClick}
                    className={`h-[60px] flex items-center space-x-2 justify-between  ${
                      openMenuPan ? " pl-4 pr-8" : "px-4"
                    } ${
                      item?.name.toLowerCase() === active
                        ? "bg-white text-pinky rounded-l-full"
                        : ""
                    } ease-in-out transition-all duration-500`}
                  >
                    <div className="flex justify-center items-center gap-3">
                      <p>{item.icon}</p>
                      {openMenuPan && <p>{item.name}</p>}
                    </div>
                    {openMenuPan && <p>{item?.data}</p>}
                  </li>
                </Link>
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
    </>
  );
};

export default Sidebar;
