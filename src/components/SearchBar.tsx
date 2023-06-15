import { useMemo, type ChangeEvent, useState, useRef } from "react";
import searchIcon from "../../src/assets/search.svg";

import { useStore } from "@nanostores/react";
import { $currentUnit, $currentWeather } from "../nanoStore";

export const SearchBar = () => {
  const API_KEY = import.meta.env.PUBLIC_OPEN_WEATHER_KEY;

  const dropdownRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [autoCompleteCities, setAutoCompleteCities] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("Jaipur");
  const currentUnit = useStore($currentUnit);

  let cities: string[] = [];
  const filteredCities: string[] = [];

  useMemo(async () => {
    const weather_response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=${currentUnit}&appid=${API_KEY}`
    );
    const weather_data = await weather_response.json();
    $currentWeather.set({
      temperature: weather_data.main.temp,
      weather: weather_data.weather[0].main,
      weatherIcon: "",
      feelsLike: weather_data.main.feels_like,
      wind: weather_data.wind.speed,
      humidity: weather_data.main.humidity,
      visibility: weather_data.visibility,
      sunrise: weather_data.sys.sunrise,
      sunset: weather_data.sys.sunset,
      city: currentCity,
      country: weather_data.sys.country,
    });
  }, [currentCity, currentUnit]);

  useMemo(async () => {
    try {
      const cities_response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      const cities_data = await cities_response.json();
      cities = cities_data?.data
        ?.map((zone: { [key: string]: string }) => zone?.cities)
        ?.flat(1);
    } catch (error) {
      console.log("Unable to get cities data", error);
    }
  }, [cities]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      filteredCities.length = 0;
      setAutoCompleteCities([...new Set(filteredCities)]);
      if (dropdownRef?.current && overlayRef?.current) {
        dropdownRef.current.style.display = "none";
        overlayRef.current.style.display = "none";
      }
    }
    if (e.target?.value?.length > 2) {
      cities?.filter((city: string) => {
        if (city.toLowerCase().startsWith(e.target?.value.toLowerCase())) {
          filteredCities.push(city);
        }
      });
      setAutoCompleteCities([...new Set(filteredCities)]);
      if (
        dropdownRef?.current &&
        overlayRef?.current &&
        filteredCities.length
      ) {
        dropdownRef.current.style.display = "block";
        overlayRef.current.style.display = "block";
      }
    }
  };

  const handleOverlayClick = () => {
    if (dropdownRef?.current && overlayRef?.current) {
      dropdownRef.current.style.display = "none";
      overlayRef.current.style.display = "none";
    }
  };

  const handleCityClick = (e: any) => {
    setCurrentCity(e.target?.innerText);
    if (searchRef.current) {
      searchRef.current.value = e.target?.innerText;
    }
    if (dropdownRef?.current && overlayRef?.current) {
      dropdownRef.current.style.display = "none";
      overlayRef.current.style.display = "none";
    }
  };

  return (
    <div className="relative z-10">
      <input
        type="search"
        ref={searchRef}
        placeholder="Search Your City/Place"
        className="w-[200px] sm:w-[300px] text-sm py-2 pl-10 pr-4 rounded-md bg-white/70 hover:bg-white/90 focus:bg-white/90 placeholder:text-black/50"
        onChange={handleSearchChange}
        required
      />
      <img
        src={searchIcon}
        alt="search icon"
        className="absolute top-1/2 left-2 -translate-y-1/2"
      />
      <ul
        ref={dropdownRef}
        className="hidden w-[200px] sm:w-[300px] h-[200px] text-black absolute -bottom-[210px] bg-white rounded-md overflow-scroll shadow-sm shadow-gray-400"
      >
        {autoCompleteCities.slice(0, 5).map((city: string) => (
          <li
            key={city}
            onClick={handleCityClick}
            className="text-sm capitalize py-3 px-6 last:border-b-0 only:border-b border-b border-gray-200 cursor-pointer hover:bg-black/5"
          >
            {city}
          </li>
        ))}
      </ul>
      <div
        ref={overlayRef}
        className="hidden w-screen h-screen bg-black/20 fixed inset-0 -z-10"
        onClick={handleOverlayClick}
      ></div>
    </div>
  );
};
