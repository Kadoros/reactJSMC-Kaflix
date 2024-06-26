import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoListState } from "./atoms";

import Board from "./components/Board";

import TrashBin from "./components/TrashBin";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const WholeWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  const [toDos, setToDos] = useRecoilState(toDoListState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination.droppableId === "trash-bin") {
      setToDos((allBorads) => {
        const boradCopy = [...allBorads[source.droppableId]];
        boradCopy.splice(source.index, 1);
        return { ...allBorads, [source.droppableId]: boradCopy };
      });
    } else {
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
    }
  };

  return (
    <WholeWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} toDos={toDos[boardId]} boradId={boardId} />
            ))}
          </Boards>
        </Wrapper>
        <Wrapper>
          <TrashBin key="trash-bin" id="trash-bin" />
        </Wrapper>
      </DragDropContext>
    </WholeWrapper>
  );
}

export default App;
