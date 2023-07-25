import React from "react";

interface Props {
  page: string;
}

const DashboardNav = ({ page }: Props) => {
  return (
    <div className="w-full h-[80px] font-bold text-2xl bg-[#e2e2e2] py-3 px-5 flex items-center">
      {page.toUpperCase()}
    </div>
  );
};

export default DashboardNav;
