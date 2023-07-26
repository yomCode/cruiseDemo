import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DashboardMenu } from "../constants";

interface Props {
  page: string;
}

const DashboardNav = ({ page }: Props) => {
  const [dropMenu, setDropMenu] = React.useState<boolean>(false);

  const path = useLocation()?.pathname.replaceAll("/", "");
  const formattedPathName =
    path === "home" || "" || "/"
      ? "Dashboard"
      : path.slice(0, 1).toUpperCase() + path.slice(1);
  return (
    <div className="w-full h-[50px] flex items-center justify-between font-bold text-2xl bg-[#e2e2e2] py-3 px-5 ">
      {page.toUpperCase()}
      <div className="block md:hidden">
        <button
          className="text-white  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-pinky"
          type="button"
          onClick={() => setDropMenu(!dropMenu)}
        >
          {formattedPathName}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          className={`${
            dropMenu ? "block" : "hidden"
          } z-10 bg-white divide-y divide-gray-100 rounded-b-lg shadow absolute p-2 top-[6%]`}
        >
          <ul className="py-2 text-sm text-gray-700 flex flex-col gap-2">
            {DashboardMenu()?.map((item) => {
              return (
                <Link to={item?.path}>
                  <li
                    key={item?.name.toLowerCase()}
                    onClick={() => setDropMenu(!dropMenu)}
                  >
                    {item?.name}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
