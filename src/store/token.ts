import { create } from "zustand";
import { persist } from "zustand/middleware";

type Token = {
  token?: string;
  setToken: (token?: string) => void;

  isPro?: boolean;
  setIsPro: (isPro?: boolean) => void;
};

export const useToken = create<Token>()(
  persist(
    set => ({
      setToken: token => set({ token }),
      setIsPro: isPro => set({ isPro })
    }),
    {
      name: "token"
    }
  )
);
