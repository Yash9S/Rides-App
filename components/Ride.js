import React from "react";

function Ride({ item, index }) {
  return (
    <div
      className="w-[1280px] h-[198px] bg-[#171717] pt-[22px] pl-[29px] pb-[28px] pr-[30px] rounded-[10px] flex justify-between items-center mb-[13px] font-medium text-[#D0CBCB]"
      key={index}
    >
      <img src={item.map_url} className="w-[296px] h-[148px] " />
      <div className="w-[600px] h-full flex flex-col justify-between items-start text-[18px] ">
        <p>Ride Id : {item.id}</p>
        <p>Origin Station : {item.origin_station_code}</p>
        <p>
          station_path : [
          {item.station_path.map((path, index) => {
            if (item.station_path.length == index + 1) {
              return `${path}`;
            } else {
              return `${path}, `;
            }
          })}
          ]
        </p>
        <p>Date : {item.date}</p>
        <p>Distance : {item?.distance}</p>
      </div>
      <div className="flex space-x-[24px] items-start justify-start h-full w-[250px] text-[12px]">
        <p className="px-[10px] py-[4px] bg-black rounded-2xl truncate w-[125px] flex items-center justify-center">
          {item.city}
        </p>
        <p className="px-[10px] py-[4px] bg-black rounded-2xl truncate w-[125px] flex items-center justify-center">
          {item.state}
        </p>
      </div>
    </div>
  );
}

export default Ride;
