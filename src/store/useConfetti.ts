import { create } from "zustand";
interface State {
  isConFetti: boolean;
}
interface Actions {
  setIsConFetti: () => void;
}

export const useConfetti = create<State & Actions>((set) => ({
  isConFetti: false,
  setIsConFetti: () => set((state) => ({ isConFetti: !state.isConFetti })),
}));
