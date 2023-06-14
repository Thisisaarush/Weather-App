import { useMemo, type ChangeEvent, useState } from "react";
import searchIcon from "../../src/assets/search.svg";

export const SearchBar = () => {
  const API_KEY = import.meta.env.OPEN_WEATHER_KEY;

  // const weather_response = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=jaipur&units=metric&appid=${API_KEY}`
  // );

  // const weather_data = await weather_response.json();

  // console.log(weather_data);

  let cities: string[] = [];
  const filteredCities: string[] = [];
  const [autoCompleteCities, setAutoCompleteCities] = useState<string[]>([]);

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
    }
    if (e.target?.value?.length > 2) {
      cities?.filter((city: string) => {
        if (city.toLowerCase().includes(e.target.value)) {
          filteredCities.push(city);
        }
      });
      setAutoCompleteCities([...new Set(filteredCities)]);
    }
  };

  return (
    <div className="relative">
      <input
        type="search"
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
      <ul className="w-[200px] sm:w-[300px] h-[250px] text-black absolute -bottom-[260px] bg-white rounded-md overflow-scroll">
        {autoCompleteCities.slice(0, 5).map((city: string) => (
          <li
            key={city}
            className="text-sm capitalize py-3 px-6 last:border-b-0 only:border-b border-b border-gray-200 cursor-pointer hover:bg-black/5"
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};
