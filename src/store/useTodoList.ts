import { getTodosGroupByStatus } from "@/utils/helper";
import { create } from "zustand";
import { ID, database } from "@/lib/appwrite";
interface State {
  todoList: TodoListMap;
}
interface Actions {
  fetchTodoList: () => void;
  updateTodoInDb: (todo: Todo, status: TypeColumn) => void;
  createTodoInDb: (todo: Pick<Todo, "title" | "status">) => void;
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
  createTodoInDb: async (todo) => {
    await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!,
      ID.unique(),
      todo
    );
    const todoList = await getTodosGroupByStatus();
    set({ todoList });
  },
}));
