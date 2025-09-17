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
        Weather in <br></br> {weather.location.name}
      </h1>
      <p>Temperature : {weather.current.temp_c}°C</p>
      <p>Сondition: {weather.current.condition.text}</p>
      {detailed && (
        <>
          <p>Feels like: {weather.current.feelslike_c}°C</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind: {weather.current.wind_kph} kph</p>
          <p>Pressure: {weather.current.pressure_mb} mb</p>
        </>
      )}
      <img src={weather.current.condition.icon} alt="icon" />
      <br></br>
    </div>
  );
};
