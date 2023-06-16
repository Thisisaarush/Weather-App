import { atom, map } from "nanostores";

type TWEATHER = {
  temperature: number;
  weather: string;
  weatherIcon: string;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  city: string;
  country: string;
  date: string;
};

export const $currentUnit = atom<string>("metric");
export const $currentWeather = map<TWEATHER>({
  temperature: 0,
  weather: "",
  weatherIcon: "",
  feelsLike: 0,
  windSpeed: 0,
  humidity: 0,
  visibility: 0,
  sunrise: 0,
  sunset: 0,
  city: "",
  country: "",
  date: "",
});
