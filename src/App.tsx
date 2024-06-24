import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoListState } from "./atoms";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoListState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBorads) => {
        const boradCopy = [...allBorads[source.droppableId]];
        const [removed] = boradCopy.splice(source.index, 1);
        boradCopy.splice(destination?.index ?? 0, 0, removed);
        return { ...allBorads, [source.droppableId]: boradCopy };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBorads) => {
        const sourceBoard = [...allBorads[source.droppableId]];
        const destinationBoard = [...allBorads[destination.droppableId]];
        const [removed] = sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index ?? 0, 0, removed);
        return {
          ...allBorads,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }

    /*
     */
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boradId={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
