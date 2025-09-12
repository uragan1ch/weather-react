import { create } from "zustand";
import { getUser, putUser } from "../../utils/request";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getUser();
      const user = response.data.user;
      set({
        user,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        error: "Ошибка при загрузке данных пользователя: " + err.message,
        loading: false,
      });
    }
  },

  updateDisplayName: async (name) => {
    const { user } = get();

    if (!user) return; // защита на случай, если пользователь ещё не загружен

    // Создаем копию объекта пользователя, не теряя его favoriteCities и mainCity
    const newUser = {
      ...user,
      displayName: name,
    };

    // Обновляем Zustand
    set({ user: newUser });

    // ВАЖНО: передаём на сервер ВЕСЬ объект пользователя
    try {
      await putUser(newUser);
    } catch (err) {
      console.error("Ошибка при обновлении ника:", err);
      // Если сервер вернул ошибку — возвращаем старого пользователя
      set({ user });
    }
  },
}));
