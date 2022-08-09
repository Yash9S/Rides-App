import React, { useEffect, useState } from "react";
import { data } from "../data/data";

function useRideData({ userData }) {
  const pages = [
    "Nearest rides",
    "Upcoming rides",
    "Past rides",
    "Filter rides",
  ];
  const [view, setView] = useState(pages[0]);
  const handleView = (view) => setView(view);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [rideData, setRideData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [nearestRides, setNearestRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [futureRides, setFutureRides] = useState([]);
  const [byCity, setByCity] = useState([]);
  const [byState, setByState] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const fetchRidesData = async (url) => {
    // const response = await fetch(url);
    // const jsonData = await response.json();
    setRideData(data);
  };

  const handleFilterDataState = (state) => setFilterData(byState[state]);
  const handleFilterDataCity = (city) => setFilterData(byCity[city]);
  const handleFilterReset = () => setFilterData(rideData);
  const fillRidesData = async () => {
    console.log("rides data: ", rideData);
    let past = [];
    let future = [];
    let nearest = [];
    let by_state = [];
    let by_city = [];
    let state_names = [];
    let city_names = [];
    const today = new Date();
    // console.log(userData.station_code);
    for (let i = 0; i < rideData?.length; i++) {
      rideData[i].distance = getDistance(
        rideData[i].station_path,
        userData?.station_code
      );
      nearest.push(rideData[i]);
      if (new Date(rideData[i].date) < today) {
        past.push(rideData[i]);
      } else {
        future.push(rideData[i]);
      }
      // by state
      if (by_state[rideData[i].state] === undefined) {
        by_state[rideData[i].state] = [];
      }
      by_state[rideData[i].state].push(rideData[i]);
      if (!state_names.includes(rideData[i].state))
        state_names.push(rideData[i].state);
      // by city
      if (by_city[rideData[i].city] === undefined) {
        by_city[rideData[i].city] = [];
      }
      by_city[rideData[i].city].push(rideData[i]);
      if (!city_names.includes(rideData[i].city))
        city_names.push(rideData[i].city);
    }
    // nearest
    sortByDistance(nearest);
    setNearestRides(nearest);
    // past
    sortByDate(past);
    setPastRides(past);
    // future
    sortByDate(future);
    setFutureRides(future);
    // by state
    setByState(by_state);
    // by city
    setByCity(by_city);

    setStates(state_names);
    setCities(city_names);

    setFilterData([...past, ...future]);
  };

  useEffect(() => {
    // console.log(userData)
    const getRidesData = async () => {
      await fetchRidesData("https://assessment.api.vweb.app/rides");
      await fillRidesData();
      setIsReady(true);
    };
    getRidesData();
  }, [isReady]);
  return {
    pages,
    view,
    handleView,
    isFilterOpen,
    setIsFilterOpen,
    isReady,
    pastRides,
    futureRides,
    rideData,
    byCity,
    byState,
    states,
    cities,
    handleFilterDataState,
    handleFilterDataCity,
    handleFilterReset,
    filterData,
    nearestRides,
    userData,
  };
}

export default useRideData;

// utility functions
const sortByDate = (rides) => {
  rides.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
};

const sortByDistance = (rides) => {
  rides.sort(function (a, b) {
    return a.distance - b.distance;
  });
};

const getDistance = (stationPath, stationCode) => {
  let distance = Math.abs(stationPath[0] - stationCode);
  let pathLength = stationPath.length;
  for (let i = 1; i < pathLength; i++) {
    let currentDistance = Math.abs(stationPath[i] - stationCode);
    if (currentDistance < distance) {
      distance = currentDistance;
    }
  }
  return distance;
};
