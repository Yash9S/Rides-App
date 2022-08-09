import React, { useContext } from "react";
import { Data } from "../pages";
import Dropdown from "./Dropdown";

function Filter() {
  const { isFilterOpen, setIsFilterOpen } = useContext(Data);
  return (
    <div className="cursor-pointer relative ">
      <div
        className="flex space-x-[8px] items-center"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <img src="filter.svg" className="w-[18px] h-[12px]" />
        <p className="text-[16px] font-medium text-white">Filter</p>
      </div>
      {isFilterOpen && <Dropdown />}
    </div>
  );
}

export default Filter;
