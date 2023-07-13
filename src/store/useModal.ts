import { create } from "zustand";
interface State {
  createTodoVisible: boolean;
}
interface Actions {
  setCreateTodoVisible: () => void;
}

export const useCreateTodoModal = create<State & Actions>((set) => ({
  createTodoVisible: false,
  setCreateTodoVisible: () =>
    set((state) => ({ createTodoVisible: !state.createTodoVisible })),
}));

interface StatusState {
  defaultValue: TypeColumn;
}
interface StatusActions {
  setDefaultStatusValue: (value: TypeColumn) => void;
}
export const useSetDefaultStatusValue = create<StatusState & StatusActions>(
  (set) => ({
    defaultValue: "todo",
    setDefaultStatusValue: (value) => set({ defaultValue: value }),
  })
);
