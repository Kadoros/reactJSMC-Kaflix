import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDos from "./CreateToDos";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <CreateToDos />
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
