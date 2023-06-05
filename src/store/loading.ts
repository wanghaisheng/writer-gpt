import { create } from "zustand";

type Loading = {
  mainLoading?: boolean;
  setMainLoading: (state?: boolean) => void;

  secondaryLoading?: boolean;
  setSecondaryLoading: (state?: boolean) => void;

  outlineLoading?: boolean;
  setOutlineLoading: (state?: boolean) => void;

  formLoading?: boolean;
  setFormLoading: (state?: boolean) => void;
};

export const useLoading = create<Loading>()(set => ({
  setMainLoading: mainLoading => set({ mainLoading }),

  setSecondaryLoading: secondaryLoading => set({ secondaryLoading }),

  setOutlineLoading: outlineLoading => set({ outlineLoading }),

  setFormLoading: formLoading => set({ formLoading })
}));
