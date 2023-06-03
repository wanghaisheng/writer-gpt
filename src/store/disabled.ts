import { create } from "zustand";

type Disabled = {
  mainDisabled?: boolean;
  setMainDisabled: (state?: boolean) => void;

  secondaryDisabled?: boolean;
  setSecondaryDisabled: (state?: boolean) => void;

  outlineDisabled?: boolean;
  setOutlineDisabled: (state?: boolean) => void;

  formDisabled?: boolean;
  setFormDisabled: (state?: boolean) => void;
};

export const useDisabled = create<Disabled>()(set => ({
  setMainDisabled: mainDisabled => set({ mainDisabled }),

  setSecondaryDisabled: secondaryDisabled => set({ secondaryDisabled }),

  setOutlineDisabled: outlineDisabled => set({ outlineDisabled }),

  setFormDisabled: formDisabled => set({ formDisabled })
}));
