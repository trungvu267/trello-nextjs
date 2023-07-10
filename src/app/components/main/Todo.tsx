"use client";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-daisyui";

interface TodoProps {
  index: number;
  todo: Todo;
}
const Todo = ({ index, todo }: TodoProps) => {
  return (
    <Draggable draggableId={todo.$id} index={index} key={todo.$id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="w-[95%] mx-auto bg-base-300">
            {/* {data.image && (
              <Card.Image
                src="https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg"
                alt="Shoes"
              />
            )} */}
            <Card.Body className="p-2 px-4">
              <Card.Title tag="h4" className="text-base">
                {todo.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
