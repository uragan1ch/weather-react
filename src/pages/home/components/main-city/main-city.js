import { useEffect } from "react";
import { CityInput } from "../city-input/city-input";
import { CityWeather } from "../city-weather/weather";
import { useCityStore } from "../../../../components/global-cities/global-cities";
import("../../../../styles/styles-weather-card/main-city_wearther.css");

export const MainCity = () => {
  const { mainCity, addMainCity, removeMainCity } = useCityStore();

  return (
    <div className="main-city">
      <div className="main-city__input">
        <CityInput text="Сделать город как основной" onClick={addMainCity} />
      </div>
      <div className="main-city__weather_section">
        {mainCity && (
          <div className="main-city__weather_card">
            <CityWeather
              city={mainCity}
              onRemoveClick={removeMainCity}
              detailed
            />
          </div>
        )}
      </div>
    </div>
  );
};
