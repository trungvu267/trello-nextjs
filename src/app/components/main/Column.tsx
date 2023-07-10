"use client";
import { Droppable } from "react-beautiful-dnd";
import { typeDnd } from "@/utils/constants";
import { getStatusLabel } from "@/utils/helper";
import Todo from "./Todo";
import { Button } from "react-daisyui";
import { AiFillPlusCircle } from "react-icons/ai";

interface ColumnProps {
  column: Column;
  droppableId: TypeColumn;
}
const Column = ({ column, droppableId }: ColumnProps) => {
  return (
    <>
      <Droppable droppableId={droppableId} type={typeDnd.BOARD}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            className="p-4 space-y-2 h-fit w-96 back rounded-md"
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "blue" : "grey",
            }}
          >
            <div className="text-center text-xl font-bold">
              {getStatusLabel(droppableId)}
            </div>
            {column.todos.map((todo, index) => (
              <Todo index={index} todo={todo} key={todo.$id} />
            ))}
            {provided.placeholder}
            <AddNewTodo />
          </div>
        )}
      </Droppable>
    </>
  );
};
export default Column;

const AddNewTodo = () => {
  return (
    <div className="mx-2">
      <Button fullWidth>
        <div className="flex space-x-4 items-center flex-row justify-between">
          <div>Add New Todo</div>
          <AiFillPlusCircle size={24} />
        </div>
      </Button>
    </div>
  );
};
