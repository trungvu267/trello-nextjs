import { dummyData } from "@/utils/dummyData";
import { getTodosGroupByStatus } from "@/utils/helper";
import { create } from "zustand";
import { database } from "@/lib/appwrite";
interface State {
  todoList: TodoListMap;
}
interface Actions {
  setTodoList: (todoList: TodoListMap) => void;
  fetchTodoList: () => void;
}
export const useTodoList = create<State & Actions>((set) => ({
  todoList: new Map(),
  setTodoList: (todoList) => {
    set({ todoList });
  },
  fetchTodoList: async () => {
    const todoList = await getTodosGroupByStatus();
    set({ todoList });
  },
}));
