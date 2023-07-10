type TypeColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypeColumn;
  todos: Todo[];
}

interface Todo {
  id: string;
  title: string;
  status: TypeColumn;
  image?: string | null;
}

type TodoListMap = Map<TypeColumn, Column>;
