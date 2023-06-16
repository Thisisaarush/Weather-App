import type { MouseEvent } from "react";
import { Card } from "./Card";
import { useStore } from "@nanostores/react";
import { $currentUnit, $currentWeather } from "../nanoStore";

// icons
import WeatherIcon from "../../src/assets/weather.svg";
import FeelsLikeIcon from "../../src/assets/feels-like.svg";
import LocationIcon from "../../src/assets/location.svg";
import WindIcon from "../../src/assets/wind.svg";
import HumidityIcon from "../../src/assets/humidity.svg";
import VisibilityIcon from "../../src/assets/visibility.svg";
import SunriseIcon from "../../src/assets/sunrise.svg";
import UvIcon from "../../src/assets/uv.svg";
import SoundIcon from "../../src/assets/sound.svg";
import PlayIcon from "../../src/assets/play.svg";
import PauseIcon from "../../src/assets/pause.svg";
import NextIcon from "../../src/assets/next.svg";
import PreviousIcon from "../../src/assets/previous.svg";

export const CardWrapper = () => {
  const {
    temperature,
    weather,
    weatherIcon,
    feelsLike,
    windSpeed,
    humidity,
    visibility,
    sunrise,
    sunset,
    city,
    country,
    date,
  } = useStore($currentWeather);

  const handleUnitChange = (e: MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLElement;
    $currentUnit.set(input?.id);
  };

  return (
    <div className="mb-10 gap-4 flex flex-col lg:flex-row">
      {/* First Column */}
      <div className="gap-4 flex flex-col justify-center items-center">
        <Card color="bg-card-blue" height="h-[320px]">
          <div>
            <p className="font-bold text-xl capitalize">Weather</p>
            <p className="text-sm text-black/40 capitalize">
              {date.toString()}
            </p>
          </div>
          <div className="flex justify-end">
            <p className="font-bold text-[64px] w-fit mr-4">
              {Math.floor(temperature)}&deg;
            </p>
          </div>
          <div className="capitalize text-sm font-semibold">
            <span className="flex items-center justify-items-center gap-2">
              <img src={WeatherIcon} alt="weather" />
              <p>{weather}</p>
            </span>
            <span className="flex items-center justify-items-center gap-2">
              <img src={FeelsLikeIcon} alt="feels like" />
              <p>feels like {Math.floor(feelsLike)}&deg;</p>
            </span>
            <span className="flex items-center justify-items-center gap-2">
              <img src={LocationIcon} alt="location" />
              <p>
                {city}, {country}
              </p>
            </span>
          </div>
          <fieldset className="bg-black/10 rounded-lg mt-4 flex items-center justify-evenly p-1 capitalize text-center">
            <input
              type="radio"
              id="metric"
              name="unit"
              onClick={handleUnitChange}
              className="hidden peer/metric"
              defaultChecked
            />
            <label
              htmlFor="metric"
              className="rounded-md p-2 w-1/2 cursor-pointer peer-checked/metric:bg-white"
            >
              celcius
            </label>
            <input
              type="radio"
              id="imperial"
              name="unit"
              onClick={handleUnitChange}
              className="hidden peer/imperial"
            />
            <label
              htmlFor="imperial"
              className="rounded-md p-2 w-1/2 cursor-pointer peer-checked/imperial:bg-white"
            >
              fahrenheit
            </label>
          </fieldset>
        </Card>
        <Card color="bg-card-green" height="h-[320px]">
          <div className="flex gap-4 flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-xl capitalize">Wind</p>
                <span className="flex items-baseline gap-2">
                  <p className="font-bold text-3xl">7.29</p>
                  <p className="text-sm text-black/40">km/h</p>
                </span>
              </div>
              <img src={WindIcon} alt="wind" />
            </div>
            <hr className="border-t-black/40" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-xl capitalize">Humidity</p>
                <span className="flex items-baseline gap-2">
                  <p className="font-bold text-3xl">84</p>
                  <p className="text-sm text-black/40">%</p>
                </span>
              </div>
              <img src={HumidityIcon} alt="wind" />
            </div>
            <hr className="border-t-black/40" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-xl capitalize">Visibility</p>
                <span className="flex items-baseline gap-2">
                  <p className="font-bold text-3xl">04</p>
                  <p className="text-sm text-black/40">km</p>
                </span>
              </div>
              <img src={VisibilityIcon} alt="wind" />
            </div>
          </div>
        </Card>
      </div>

      {/* Second Column */}
      <div className="gap-4 flex flex-col justify-center items-center">
        <Card color="bg-card-pink" height="h-[420px]">
          <p className="font-bold text-xl capitalize">Forecast</p>
        </Card>
        <Card color="bg-card-yellow" height="h-[220px]">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl capitalize">Sunrise & Sunset</p>
            <span className="flex justify-center">
              <img src={SunriseIcon} alt="sunrise & sunset" />
            </span>
            <div className="flex justify-between">
              <span className="flex items-baseline gap-1">
                <p className="font-bold text-2xl">5:50</p>
                <p className="text-sm text-black/40">am</p>
              </span>
              <span className="flex items-baseline gap-1">
                <p className="font-bold text-2xl">7:00</p>
                <p className="text-sm text-black/40">pm</p>
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Third Column */}
      <div className="gap-4 flex flex-col justify-center items-center">
        <Card color="bg-white" height="h-[208px]">
          <div className="flex gap-8 flex-col">
            <span className="flex gap-2 justify-center items-center">
              <img src={SoundIcon} alt="sound" />
              <p className="font-medium text-xl capitalize">Jungle Sound</p>
            </span>
            <span className="flex gap-6 justify-center items-center">
              <img src={PreviousIcon} alt="previous song" />
              <img src={PlayIcon} alt="play song" />
              <img src={NextIcon} alt="next song" />
            </span>
          </div>
        </Card>
        <Card color="bg-card-purple" height="h-[208px]">
          <span className="flex flex-col justify-center items-center">
            <img src={UvIcon} alt="uv" width="120px" />
            <p className="font-bold text-4xl">5.50</p>
          </span>
        </Card>
        <Card color="bg-card-black text-white" height="h-[208px]">
          <p className="font-bold text-xl capitalize mb-10">
            Air Quality Index
          </p>
          <span className="flex flex-col justify-center items-center capitalize">
            <p className="font-bold text-5xl">120</p>
            <p>Above Normal</p>
          </span>
        </Card>
      </div>
    </div>
  );
};
