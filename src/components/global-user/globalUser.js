import { create } from "zustand";
import { getUser, putUser } from "../../utils/request";

export const useUserStore = create((set, get) => ({
  user: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getUser();
      const user = response.data.user;
      set({
        user: user,
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
    const newUser = { ...user, displayName: name };
    set({ user: newUser });
    await putUser({ newUser });
  },
}));
