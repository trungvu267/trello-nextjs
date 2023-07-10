"use client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTodoList } from "@/store/useTodoList";
import Column from "./Column";
const Board = () => {
  const [todoList, setTodoList] = useTodoList((state) => [
    state.todoList,
    state.setTodoList,
  ]);
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    //NOTE: Check if the draggable item was dropped outside a droppable area
    if (!destination) {
      return;
    }
    //NOTE: Check if the draggable item was dropped back to its original position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceTodos = todoList.get(source.droppableId as TypeColumn)
      ?.todos as Todo[];
    const todo = sourceTodos[source.index];

    //NOTE: Drag and drop within the same column
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index
    ) {
      sourceTodos.splice(source.index, 1);
      sourceTodos.splice(destination.index, 0, todo);
    }
    // NOTE: Drag and drop between different columns
    if (source.droppableId !== destination.droppableId) {
      const destinationTodos = todoList.get(
        destination.droppableId as TypeColumn
      )?.todos as Todo[];
      sourceTodos.splice(source.index, 1);
      todo.status = destination.droppableId as TypeColumn;
      destinationTodos.splice(destination.index, 0, todo);
    }
  };
  const todoListArray = Array.from(todoList.values());

  return (
    <div className="flex flex-row space-x-24 mt-0">
      <DragDropContext onDragEnd={handleDragEnd}>
        {todoListArray.map((todo) => (
          <Column key={todo.id} column={todo} droppableId={todo.id} />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;
