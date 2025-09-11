import { useEffect, useState } from "react";
import { getCurrentWeather } from "../../../../utils/request";
import { Button } from "../../../../components/button/button";
import("../../../../styles/styles-weather-card/weather_card.css");

export const CityWeather = ({ city, onRemoveClick, detailed = false }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const addWeather = async (city) => {
    try {
      setIsLoading(true);
      console.log({ city });
      if (city === "") {
      } else {
        const data = await getCurrentWeather(city);
        setWeather(data.data);
      }
    } catch (error) {
      console.log("Errorr download data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    addWeather(city);
  }, [city]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  console.log(weather);
  return (
    <div className="weather_card">
      <div className="weather_card__delete_button">
        {" "}
        <Button variant="delete" onClick={onRemoveClick} />
      </div>

      <h1>
        Погода в городе <br></br> {weather.location.name},
        {weather.location.country}
      </h1>
      <p>Температура: {weather.current.temp_c}°C</p>
      <p>Состояние: {weather.current.condition.text}</p>
      {detailed && (
        <>
          <p>Ощущается как: {weather.current.feelslike_c}°C</p>
          <p>Влажность: {weather.current.humidity}%</p>
          <p>Ветер: {weather.current.wind_kph} км/ч</p>
          <p>Давление: {weather.current.pressure_mb} мбар</p>
        </>
      )}
      <img src={weather.current.condition.icon} alt="icon" />
      <br></br>
    </div>
  );
};
