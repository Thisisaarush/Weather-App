import { useEffect, type MouseEvent, useRef } from "react";
import { Card } from "./Card";
import { useStore } from "@nanostores/react";
import { $currentUnit, $currentWeather } from "../nanoStore";

// icons
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
  const currentUnit = useStore($currentUnit);
  const inputRef = useRef<HTMLInputElement>(null);
  const air_quality: { [key: number]: string } = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor",
  };

  useEffect(() => {
    const currentUnit = localStorage.getItem("currentUnit");
    if (inputRef.current && inputRef.current.id === currentUnit) {
      inputRef.current?.setAttribute("checked", "true");
    }
  }, []);

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
    uv,
    air,
    forecast,
  } = useStore($currentWeather);

  const handleUnitChange = (e: MouseEvent<HTMLInputElement>) => {
    const input = e.target as HTMLElement;
    $currentUnit.set(input?.id);
    localStorage.setItem("currentUnit", input?.id);
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
              <img src={weatherIcon} alt="weather" width="20px" height="20px" />
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
              ref={inputRef}
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
              ref={inputRef}
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
                  <p className="font-bold text-3xl">
                    {currentUnit === "metric"
                      ? Math.floor(windSpeed * 3.6)
                      : Math.floor(windSpeed)}
                  </p>
                  <p className="text-sm text-black/40">
                    {currentUnit === "metric" ? "km/h" : "miles/h"}
                  </p>
                </span>
              </div>
              <img src={WindIcon} alt="wind" />
            </div>
            <hr className="border-t-black/40" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-xl capitalize">Humidity</p>
                <span className="flex items-baseline gap-2">
                  <p className="font-bold text-3xl">{humidity}</p>
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
                  <p className="font-bold text-3xl">
                    {currentUnit === "metric"
                      ? visibility / 1000
                      : Math.floor(visibility / 1000 / 1.609)}
                  </p>
                  <p className="text-sm text-black/40">
                    {currentUnit === "metric" ? "km" : "miles"}
                  </p>
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
          <p className="font-bold text-xl capitalize mb-2">Forecast</p>
          <ul className="flex flex-col">
            {forecast?.map((day) => (
              <li
                className="flex gap-3 items-center first:bg-white p-1 rounded-md first:py-3 first:shadow-sm"
                key={day.date}
              >
                <img src={day.icon} alt="weather" width="40px" height="40px" />
                <span className="flex font-medium items-baseline">
                  <p className="text-xl">{Math.floor(day.maxTemp)}&deg;/</p>
                  <p className="text-black/70">
                    {Math.floor(day.minTemp)}&deg;
                  </p>
                </span>
                <p className="text-sm text-black/70 w-1/2 text-end">
                  {day.date}
                </p>
              </li>
            ))}
          </ul>
        </Card>
        <Card color="bg-card-yellow" height="h-[220px]">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-xl capitalize">Sunrise & Sunset</p>
            <span className="flex justify-center">
              <img src={SunriseIcon} alt="sunrise & sunset" />
            </span>
            <div className="flex justify-between">
              <p className="font-bold text-2xl">{sunrise}</p>
              <p className="font-bold text-2xl">{sunset}</p>
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
            <p className="font-bold text-4xl">{uv}</p>
          </span>
        </Card>
        <Card color="bg-card-black text-white" height="h-[208px]">
          <p className="font-bold text-xl capitalize mb-6">Air Quality Index</p>
          <span className="flex flex-col justify-center items-center gap-2">
            <p className="font-bold text-5xl">{air}</p>
            <p>{air_quality[air]}</p>
            <input
              type="range"
              min="1"
              max="5"
              value={air}
              step="1"
              list="values"
              readOnly
              className="bg-gradient-to-r from-green-500 to-red-500 appearance-none h-1 rounded-full accent-white flex justify-center items-center"
            />
            <datalist id="values" className="flex text-sm text-white/50 gap-4">
              <option value="1" label="1"></option>
              <option value="2" label="2"></option>
              <option value="3" label="3"></option>
              <option value="4" label="4"></option>
              <option value="5" label="5"></option>
            </datalist>
          </span>
        </Card>
      </div>
    </div>
  );
};
