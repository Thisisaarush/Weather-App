import { atom, map } from "nanostores";

type TWEATHER = {
  temperature: number;
  weather: string;
  weatherIcon: string;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  visibility: number;
  sunrise: string;
  sunset: string;
  city: string | null;
  country: string;
  date: string;
  uv: string;
  air: number;
  forecast: { minTemp: number; maxTemp: number; icon: string; date: string }[];
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
  sunrise: "",
  sunset: "",
  city: "",
  country: "",
  date: "",
  uv: "",
  air: 0,
  forecast: [],
});
