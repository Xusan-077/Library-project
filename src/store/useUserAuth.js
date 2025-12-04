// --- Auth Store ---
import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuth: false,
  user: null,

  login: (userData) => {
    set({ isAuth: true });
    localStorage.setItem("access", userData.access);
    localStorage.setItem("refresh", userData.refresh);
  },

  setUser: (data) => {
    set({ user: data });
  },

  setIsAuth: () => {
    set({ isAuth: true });
  },
}));

export default useAuthStore;
