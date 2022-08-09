import React, { useContext, useState } from "react";
import { Data } from "../pages";

function Dropdown() {
  const { states, cities } = useContext(Data);
  return (
    <div className="absolute w-[228px] p-[30px] bg-[#131313] flex flex-col top-[30px] -left-40 rounded-2xl space-y-[8px]">
      <p className="font-light text-[20px] text-[#A5A5A5]">Filter</p>
      <hr className="border-b-[1px] border-b-[#CBCBCB]" />
      <DropdownList title="Reset All" dynamic={false} />
      <DropdownList title="State" list={states} />
      <DropdownList title="City" list={cities} />
    </div>
  );
}

export default Dropdown;

function DropdownList({ title, dynamic = true, list }) {
  const {
    pages,
    handleView,
    handleFilterDataState,
    handleFilterDataCity,
    setIsFilterOpen,
    handleFilterReset,
  } = useContext(Data);
  const [isOpen, setIsOpen] = useState(false);
  const handleStateFilterClick = (state) => {
    handleView(pages[3]);
    handleFilterDataState(state);
    setIsFilterOpen(false);
  };
  const handleCityFilterClick = (city) => {
    handleView(pages[3]);
    handleFilterDataCity(city);
    setIsFilterOpen(false);
  };
  const handleResetAll = () => {
    handleFilterReset();
    setIsFilterOpen(false);
  };
  return (
    <>
      <div
        className="bg-[#232323] text-white text-[17px] px-[12px] py-[8px] rounded-[4.69px] flex justify-between items-center"
        onClick={() =>
          dynamic ? setIsOpen((prev) => !prev) : handleResetAll()
        }
      >
        <p>{title}</p>
        {dynamic && (
          <img src="triangle_down.svg" className="w-[12.18px] h-[12.18px]" />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col space-y-2 text-[12px] h-[400px] overflow-y-auto text-white scrollbar-thin scrollbar-track-black scrollbar-thumb-gray-600">
          {list.length != 0 &&
            list.map((place, index) => (
              <p
                key={index}
                onClick={() =>
                  title == "State"
                    ? handleStateFilterClick(place)
                    : title == "City"
                    ? handleCityFilterClick(place)
                    : {}
                }
              >
                {place}
              </p>
            ))}
        </div>
      )}
    </>
  );
}
