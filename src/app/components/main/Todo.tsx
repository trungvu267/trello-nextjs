"use client";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-daisyui";
import { motion } from "framer-motion";
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
          </motion.div>
        </div>
      )}
    </Draggable>
  );
};

export default Todo;
