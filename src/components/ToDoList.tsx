import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
    setValue("toDo", "");
  };

  console.log(toDos);

  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo")} placeholder="write a to do" />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo, index) => (
          <li key={index}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
