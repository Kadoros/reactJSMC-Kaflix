import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Droppable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { isDraggingOverTrashBin } from "../atoms";

interface ITrashBinDivProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const TrashBinDiv = styled.div<ITrashBinDivProps>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? "#d3d3d3" : "#e9e9e9")};
  border-radius: 50%;
  margin-top: 20px;

`;

interface ITrashBinProps {
  id: string;
}

function TrashBin({ id }: ITrashBinProps) {
  const setIsDraggingOverTrashBin = useSetRecoilState(isDraggingOverTrashBin);

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => {
        console.log(snapshot.isDraggingOver);
        setIsDraggingOverTrashBin(snapshot.isDraggingOver);
        return (
          <TrashBinDiv
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {snapshot.isDraggingOver? <FontAwesomeIcon icon={faTrashArrowUp} size="4x" />:<FontAwesomeIcon icon={faTrash} size="4x" />}
          </TrashBinDiv>
        );
      }}
    </Droppable>
  );
}

export default TrashBin;
