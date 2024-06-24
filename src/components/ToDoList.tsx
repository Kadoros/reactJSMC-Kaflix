import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDos from "./CreateToDos";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    console.log(event.currentTarget.value);
  };
  return (
    <div>
      <h1>To Do List</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>ToDo</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDos />
      {toDos?.map(atoDo => <ToDo key={atoDo.id} {...atoDo}/>)}
    </div>
  );
}

export default ToDoList;
