import React, { useContext } from "react";
import { Data } from "../pages";

function Header() {
  const { userData } = useContext(Data);

  return (
    <header className="flex justify-between items-center px-[43px] py-[20px] bg-[#101010] fixed w-full z-20">
      <h1 className="text-[36px] font-bold text-white">Edvora</h1>
      <div className="flex space-x-[25px] text-white items-center">
        <p className="text-[20px] font-bold">
          {userData?.name} {userData?.station_code}
        </p>
        <img
          src={userData?.url}
          className="w-[44px] h-[44px] rounded-full cursor-pointer"
        />
      </div>
    </header>
  );
}

export default Header;
