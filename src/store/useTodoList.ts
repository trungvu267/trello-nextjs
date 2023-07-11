import { getTodosGroupByStatus } from "@/utils/helper";
import { create } from "zustand";
import { database } from "@/lib/appwrite";
interface State {
  todoList: TodoListMap;
}
interface Actions {
  fetchTodoList: () => void;
  updateTodoInDb: (todo: Todo, status: TypeColumn) => void;
}
export const useTodoList = create<State & Actions>((set) => ({
  todoList: new Map(),

  fetchTodoList: async () => {
    const todoList = await getTodosGroupByStatus();
    set({ todoList });
  },
  updateTodoInDb: async (todo, status) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        ...todo,
        status,
      }
    );
  },
}));
