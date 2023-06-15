import { atom, map } from "nanostores";

type TUNIT = "metric" | "imperial";
type TWEATHER = {
  temperature: number;
  weather: string;
  weatherIcon: string;
  feelsLike: string;
  wind: string;
  humidity: string;
  visibility: string;
  sunrise: number;
  sunset: number;
  city: string;
  country: string;
};

export const $currentUnit = atom<TUNIT>("metric");
export const $currentWeather = map<TWEATHER>({
  temperature: 0,
  weather: "",
  weatherIcon: "",
  feelsLike: "",
  wind: "",
  humidity: "",
  visibility: "",
  sunrise: 0,
  sunset: 0,
  city: "",
  country: "",
});
