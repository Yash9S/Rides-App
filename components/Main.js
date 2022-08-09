import React, { useContext } from "react";
import { Data } from "../pages";
import Filter from "./Filter";
import Ride from "./Ride";

function Main() {
  const {
    pages,
    view,
    handleView,
    isFilterOpen,
    setIsFilterOpen,
    isReady,
    pastRides,
    futureRides,
    filterData,
    nearestRides,
  } = useContext(Data);
  return (
    <main className="bg-[#292929] min-h-screen pt-[30px] pl-[43px] pr-[47px] w-full">
      {isReady && (
        <>
          <div className="flex justify-between w-full sticky top-[120px]">
            {/* page selection */}
            <div
              className="flex space-x-[44px] text-[18px]"
              onClick={() => (isFilterOpen ? setIsFilterOpen(false) : {})}
            >
              {pages.map((page, index) => (
                <button
                  className={
                    view == page
                      ? "text-white font-bold underline"
                      : " text-[#D0CBCB] font-normal "
                  }
                  onClick={() => handleView(page)}
                  key={index}
                >
                  {page}
                </button>
              ))}
            </div>
            {/* filter */}
            <Filter />
          </div>
          {/* data presentation */}
          <div
            className="mt-[120px] w-full flex flex-col items-center"
            onClick={() => (isFilterOpen ? setIsFilterOpen(false) : {})}
          >
            {view === pages[0] &&
              nearestRides.map((item, index) => (
                <Ride item={item} key={index} />
              ))}
            {view === pages[1] &&
              futureRides.map((item, index) => (
                <Ride item={item} key={index} />
              ))}
            {view === pages[2] &&
              pastRides.map((item, index) => <Ride item={item} key={index} />)}
            {view === pages[3] &&
              filterData.map((item, index) => <Ride item={item} key={index} />)}
          </div>
        </>
      )}
    </main>
  );
}

export default Main;
