import { isTokenExpired } from "@/lib/utils";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: true,

  initialize: () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      if (isTokenExpired(storedToken)) {
        // Auto logout
        set({ token: null, user: null, loading: false });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        set({
          token: storedToken,
          user: JSON.parse(storedUser),
          loading: false,
        });
      }
    } else {
      set({ loading: false });
    }
  },

  login: (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    set({ token: newToken, user: newUser });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
