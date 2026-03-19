import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userData: null,
      authMessage: null,
      isAuthenticated: false,
      setSession: ({ token = null, userData = null, message = null }) =>
        set({
          token,
          userData,
          authMessage: message,
          isAuthenticated: Boolean(token || userData),
        }),
      setAuthMessage: (authMessage) => set({ authMessage }),
      signOut: () =>
        set({
          token: null,
          userData: null,
          authMessage: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "cinema-auth",
    }
  )
);

export default useAuthStore;
