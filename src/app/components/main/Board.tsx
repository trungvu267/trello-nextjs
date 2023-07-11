"use client";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useTodoList } from "@/store/useTodoList";
import { useEffect, useState } from "react";
import Column from "./Column";
import { BoardSkeleton } from "./Skeleton";
import CustomConfetti from "./CustomConfetti";
import { useConfetti } from "@/store/useConfetti";
const Board = () => {
  const [todoList, fetchTodoList, updateTodoInDb] = useTodoList((state) => [
    state.todoList,
    state.fetchTodoList,
    state.updateTodoInDb,
  ]);
  const setIsConFetti = useConfetti((state) => state.setIsConFetti);
  useEffect(() => {
    fetchTodoList();
  }, []);
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
      updateTodoInDb(todo, destination.droppableId as TypeColumn);
      if (destination.droppableId === "done") {
        setIsConFetti();
      }
    }
  };
  const todoListGroupByStatusArray = Array.from(todoList.values());
  if (todoListGroupByStatusArray.length === 0) return <BoardSkeleton />;

  return (
    <div className="flex flex-row space-x-24 mt-0">
      <DragDropContext onDragEnd={handleDragEnd}>
        {todoListGroupByStatusArray.map((column: any) => (
          <Column key={column.id} column={column} droppableId={column.id} />
        ))}
      </DragDropContext>
      <CustomConfetti />
    </div>
  );
};

export default Board;
