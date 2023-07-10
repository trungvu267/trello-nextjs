import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { database } from "@/lib/appwrite";
export const checkSessionAndRedirectIfInvalid = async (pathName: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${pathName}`);
    // redirect("/login?callbackUrl=/test");
  }
};

export function capitalizeFirstLetters(name: string) {
  // Split the string into individual words
  var words = name.split(" ");

  // Capitalize the first letter of each word
  var capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a string
  var capitalizedString = capitalizedWords.join(" ");

  // Return the modified string
  return capitalizedString;
}

export const getTodosGroupByStatus = async () => {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TODOS_COLLECTION_ID!
  );
  const todoList = data.documents;
  const columns = todoList.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      // NOTE: get the image if it exists on the todo
      // ...(todo.image && {
      //   image: JSON.parse(todo.image),
      // }),
    });
    return acc;
  }, new Map<TypeColumn, Column>());
  //NOTE: if columns doesn't have inprogress, todo and done, add them with empty array
  const columnTypes: TypeColumn[] = ["todo", "inprogress", "done"];
  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }
  //NOTE: Sort coulumns by columnTypes
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  return sortedColumns;
};

export const getStatusLabel = (name: TypeColumn) => {
  switch (name) {
    case "todo":
      return "To Do 📃";
    case "inprogress":
      return "In Progress ✍️";
    case "done":
      return "Done 🎉";
    default:
      return "Unknown Status";
  }
};
