import { create } from "zustand";
import { putUser } from "../../utils/request";
import { useUserStore } from "../global-user/globalUser";

export const useCityStore = create((set, get) => ({
  favoriteCities: [],
  mainCity: "",
  error: null,

  setCities: (favoriteCities, mainCity) => {
    set({ favoriteCities, mainCity });
  },

  initFromUser: () => {
    const { user } = useUserStore.getState();
    if (user) {
      set({
        favoriteCities: user.favoriteCities || [],
        mainCity: user.mainCity || "",
      });
    }
  },

  addMainCity: async (city) => {
    try {
      await putUser({ mainCity: city });
      set({ mainCity: city });
    } catch (err) {
      set({ error: "Ошибка при добавлении города: " + err.message });
    }
  },

  removeMainCity: async () => {
    try {
      await putUser({ mainCity: "" });
      set({ mainCity: "" });
    } catch (err) {
      set({ error: "Ошибка при удалении города: " + err.message });
    }
  },

  updateCitiesInDB: async (cities) => {
    try {
      await putUser({ favoriteCities: cities });
    } catch (err) {
      console.log("Ошибка при обновлении городов: " + err.message);
    }
  },

  addCityToFavorites: async (city) => {
    const { favoriteCities } = get();
    const newCities = [...favoriteCities, city];
    set({ favoriteCities: newCities });
    get().updateCitiesInDB(newCities);
    console.log("Добавлен город:", newCities);
  },

  removeCityFromFavorites: async (cityToRemove) => {
    const { favoriteCities } = get();
    const newCities = favoriteCities.filter((city) => city !== cityToRemove);
    set({ favoriteCities: newCities });
    get().updateCitiesInDB(newCities);
  },
}));
