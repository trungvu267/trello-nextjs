"use client";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-daisyui";

interface TodoProps {
  index: number;
  data: Todo;
}
const Todo = ({ index, data }: TodoProps) => {
  return (
    <Draggable draggableId={data.id} index={index} key={data.id}>
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
                {data.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
