import { CityInput } from "../city-input/city-input";
import { useEffect, useState } from "react";
import { CityWeather } from "../city-weather/weather";
import { useCityStore } from "../../../../components/global-cities/global-cities";
import { useUserStore } from "../../../../components/global-user/globalUser";
import("../../../../styles/styles-weather-card/weather_card.css");
import("../../../../styles/styles-home/styles-cities/cities.css");

export const FavCities = () => {
  const { favoriteCities, addCityToFavorites, removeCityFromFavorites } =
    useCityStore();

  console.log(favoriteCities);
  return (
    <div className="fav-cities">
      <CityInput
        text="Добавить город в избранные"
        onClick={addCityToFavorites}
      />
      <div className="cards-container">
        {favoriteCities.map((city) => (
          <CityWeather
            key={city}
            city={city}
            onRemoveClick={() => removeCityFromFavorites(city)}
          />
        ))}
      </div>
    </div>
  );
};
