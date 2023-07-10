import { dummyData } from "@/utils/dummyData";
import { getTodosGroupByStatus } from "@/utils/helper";
import { create } from "zustand";
interface State {
  todoList: TodoListMap;
}
interface Actions {
  setTodoList: (todoList: TodoListMap) => void;
}
export const useTodoList = create<State & Actions>((set) => ({
  todoList: getTodosGroupByStatus(dummyData),
  setTodoList: (todoList) => {
    set({ todoList });
  },
}));
