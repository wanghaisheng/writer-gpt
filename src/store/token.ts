import { create } from "zustand";
import { persist } from "zustand/middleware";

type Token = {
  token?: string;
  setToken: (token?: string) => void;
};

export const useToken = create<Token>()(
  persist(
    set => ({
      setToken: token => set({ token })
    }),
    {
      name: "token"
    }
  )
);
