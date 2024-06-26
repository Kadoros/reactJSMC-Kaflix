import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDraggingOverTrashBin } from "../atoms";

const Card = styled.div<{ isDragging: boolean; isDraggingOverTrashBin: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDraggingOverTrashBin
      ? "pink"
      : props.isDragging
      ? "#74b9ff"
      : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.5)" : "none"};
`;

interface IDraggableCard {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCard) {
  const isOverTrashBin = useRecoilValue(isDraggingOverTrashBin);

  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          isDraggingOverTrashBin={isOverTrashBin}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
