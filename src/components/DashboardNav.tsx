import React from "react";

interface Props {
  page: string;
}

const DashboardNav = ({ page }: Props) => {
  return (
    <div className="w-full h-[80px] bg-[#e2e2e2] py-3 px-5">
      {page.toUpperCase()}
    </div>
  );
};

export default DashboardNav;
