import { create } from "zustand";
// TODO: for test
interface State {
  count: number;
}
interface Actions {
  setCount: () => void;
}
export const useStore = create<State & Actions>((set) => ({
  count: 0,
  setCount: () =>
    set((state) => ({
      count: state.count + 1,
    })),
}));
