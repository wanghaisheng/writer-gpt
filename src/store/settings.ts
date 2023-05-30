import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Models } from "@interface/openai";

type SettingsType = {
  custom: {
    keywords?: string;
    outline?: string;
  };
  model: {
    keywords: Models;
    outline: Models;
  };
};

type Settings = {
  settings: SettingsType;
  setSettings: (settings?: SettingsType) => void;
};

export const useSettings = create<Settings>()(
  persist(
    set => ({
      settings: {
        custom: {},
        model: { keywords: "gpt-3.5-turbo", outline: "gpt-4" }
      },
      setSettings: settings => set({ settings })
    }),
    {
      name: "settings"
    }
  )
);
