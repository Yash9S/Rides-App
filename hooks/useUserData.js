import React, { useEffect, useState } from "react";
import { userDataUrl } from "../constansts";

function useUserData() {
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    const response = await fetch(userDataUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return {
    userData,
  };
}

export default useUserData;
