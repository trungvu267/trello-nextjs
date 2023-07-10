type TypeColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypeColumn;
  todos: Todo[];
}

interface Todo extends Models.Document {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypeColumn;
  image?: Image;
}

interface Image {
  bucketId: string;
  fileId: string;
}
type TodoListMap = Map<TypeColumn, Column> | Map<>;
