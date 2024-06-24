import React from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="1">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable draggableId="one" index={0}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  > <span>😂</span>
                    Hello
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="two" index={1}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    
                  > <span {...provided.dragHandleProps}>😂</span>
                    asda
                  </li>
                )}
              </Draggable>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
