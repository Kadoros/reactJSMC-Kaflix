import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IToDoState, toDoListState } from "../atoms";
import { text } from "stream/consumers";
import { useSetRecoilState } from "recoil";
import React from "react";

const Title = styled.h2`
  text-align: center;
  font-weight: 1000;
  margin-bottom: 10px;
  margin-top: -20px;
  font-size: 18px;
`;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boradColor};
  padding: 20px 0px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : props.theme.boradColor};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

interface IBoard {
  toDos: IToDoState[];
  boradId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boradId }: IBoard) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoListState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allborads) => {
      return {
        ...allborads,
        [boradId]: [...allborads[boradId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boradId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add Task on ${boradId} `}
        />
      </Form>
      <Droppable droppableId={boradId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Board);
