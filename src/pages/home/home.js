import { Header } from "../../components/header/header";
import { FavCities } from "./components/fav-cities/fav-cities";
import { MainCity } from "./components/main-city/main-city";
import { Profile } from "./components/profile/profile";
import("../../styles/styles-home/home.css");
import("../../styles/styles-home/styles-cities/cities.css");

export function Home() {
  return (
    <div className="home_page">
      <div className="header_home">
        <Header />
        <Profile />
      </div>

      <h1>Welcome to the main page!</h1>
      <p>Here you can see the weather in your city</p>
      <p>Select a city to get the weather forecast</p>
      <div className="cities_section">
        <MainCity />
        <FavCities />
      </div>
    </div>
  );
}
