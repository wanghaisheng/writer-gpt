import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserData } from "@interface/auth";

type Auth = {
  user?: UserData;
  setUser: (user?: UserData) => void;
};

export const useAuth = create<Auth>()(
  persist(
    set => ({
      setUser: user => set({ user })
    }),
    {
      name: "auth"
    }
  )
);
